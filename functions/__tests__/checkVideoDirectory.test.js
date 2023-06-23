const { checkVideoDirectory } = require("../index.js");

describe("checkVideoDirectory", () => {
   it('returns true if videoPath is "~"', () => {
      expect(checkVideoDirectory("/videos", "~")).toEqual(true);
   });

   it('returns true if videoPath is empty and dir is "."', () => {
      expect(checkVideoDirectory(".", "")).toEqual(true);
   });

   it('returns true if videoPath is "." and dir is "."', () => {
      expect(checkVideoDirectory(".", ".")).toEqual(true);
   });

   it('returns true if videoPath is "/" and dir is "/"', () => {
      expect(checkVideoDirectory("/", "/")).toEqual(true);
   });

   it("returns true if trimmed videoPath is equal to trimmed dir", () => {
      expect(checkVideoDirectory("/videos/", "/videos")).toEqual(true);
   });

   it("returns false in other cases", () => {
      expect(checkVideoDirectory("/videos/", "/photos")).toEqual(false);
      expect(checkVideoDirectory("/videos/", "/")).toEqual(false);
   });
});
