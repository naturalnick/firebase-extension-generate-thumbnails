const { removeFileExtension } = require("../index.js");

describe("removeFileExtension", () => {
   it("returns the filename without the extension", () => {
      expect(removeFileExtension("video-1.mov")).toEqual("video-1");
      expect(removeFileExtension("video_2.mp4")).toEqual("video_2");
      expect(removeFileExtension("video3.avi")).toEqual("video3");
   });
});
