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
