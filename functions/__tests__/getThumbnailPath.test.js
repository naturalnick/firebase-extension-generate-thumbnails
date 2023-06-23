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

const { getThumbnailPath } = require("../index.js");

describe("getThumbnailPath", () => {
   it('returns an empty string if pathString is empty or "/"', () => {
      expect(getThumbnailPath("", ".")).toEqual("");
      expect(getThumbnailPath("/", ".")).toEqual("");
   });

   it('returns altDir + "/" if pathString is "~"', () => {
      expect(getThumbnailPath("~", "thumbnails")).toEqual("thumbnails/");
      expect(getThumbnailPath("~", "videos/thumbnails")).toEqual("videos/thumbnails/");
   });

   it('returns the pathString unchanged if it is neither empty nor "~"', () => {
      expect(getThumbnailPath("photos/", ".")).toEqual("photos/");
      expect(getThumbnailPath("photos/thumbnails/", ".")).toEqual("photos/thumbnails/");
   });
});
