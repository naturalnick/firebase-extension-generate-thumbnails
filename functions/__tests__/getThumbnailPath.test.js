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
