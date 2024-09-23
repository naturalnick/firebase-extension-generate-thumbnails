/*
 * Copyright 2023 Nick Schaefer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { initializeApp } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const { storage } = require("firebase-functions/v1");
const path = require("path");
const os = require("os");
const fs = require("fs");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const { v4: uuidv4 } = require("uuid");
ffmpeg.setFfmpegPath(ffmpegPath);

initializeApp();

exports.generateThumbnail = storage.object().onFinalize(async (object, context) => {
   const fileBucket = object.bucket;
   const filePath = object.name;
   const contentType = object.contentType || "";
   const dir = path.dirname(filePath);
   const fileName = path.basename(filePath);

   if (!checkVideoDirectory(dir, process.env.VIDEO_PATH) || !contentType.includes("video/")) return;

   try {
      const bucket = getStorage().bucket(fileBucket);
      const tempFilePath = path.join(os.tmpdir(), fileName);

      await bucket.file(filePath).download({ destination: tempFilePath });

      if (!fs.existsSync(tempFilePath)) throw "Could not locate downloaded file";

      const prefix = process.env?.THUMBNAIL_PREFIX ? process.env.THUMBNAIL_PREFIX : "";
      const suffix = process.env?.THUMBNAIL_SUFFIX ? process.env.THUMBNAIL_SUFFIX : "";
      const thumbfileName =
         prefix + removeFileExtension(fileName) + suffix + "." + process.env.IMAGE_TYPE;

      const localThumbFilePath = path.join(os.tmpdir(), thumbfileName);

      const cloudThumbFilePath = path.join(
         getThumbnailPath(process.env.THUMBNAIL_PATH, dir),
         thumbfileName
      );

      await takeScreenshot(tempFilePath, thumbfileName);

      if (!fs.existsSync(localThumbFilePath)) throw "Failed to locate generated file";

      await bucket.upload(localThumbFilePath, {
         destination: cloudThumbFilePath,
         metadata: {
            contentType: `image/${process.env.IMAGE_TYPE}`,
            metadata: {
               firebaseStorageDownloadTokens: uuidv4()
            }
         },
         public: false
      });

      fs.unlinkSync(localThumbFilePath);
      fs.unlinkSync(tempFilePath);
   } catch (error) {
      console.error("Error generating thumbnail:", error);
   }

   return null;
});

async function takeScreenshot(videoFilePath, newFileName) {
   return new Promise((resolve, reject) => {
      ffmpeg({ source: videoFilePath })
         .on("filenames", (filenames) => {})
         .on("end", () => {
            resolve(null);
         })
         .on("error", (error) => {
            console.error(error);
            reject(error);
         })
         .takeScreenshots(
            {
               count: 1,
               timestamps: [Number(process.env.TIMESTAMP)], //in seconds
               filename: newFileName
            },
            os.tmpdir()
         )
         .withAspectRatio(process.env.ASPECT_RATIO);
   });
}

function checkVideoDirectory(dir, videoPath) {
   const trimmedPath = videoPath?.replace(/^\/|\/$/g, "");
   const trimmedDir = dir?.replace(/^\/|\/$/g, "");

   if (
      videoPath === "~" ||
      (["", ".", "/"].includes(videoPath) && dir === ".") ||
      trimmedPath == trimmedDir
   ) {
      return true;
   } else return false;
}

function removeFileExtension(filename) {
   const lastDotIndex = filename.lastIndexOf(".");
   const extensionNotFound = lastDotIndex === -1;
   return extensionNotFound ? filename : filename.substring(0, lastDotIndex);
}

function getThumbnailPath(pathString, videoPath) {
   if (!pathString || pathString === "/") return "";
   if (pathString === "~") return videoPath + "/";
   return pathString;
}
