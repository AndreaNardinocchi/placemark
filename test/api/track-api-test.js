import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { testTracks, mozart, testCategories, maggie, concerto } from "../fixtures.js";
import { db } from "../../src/models/db.js";

suite("Track API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    // db.init("json");

    await placemarkService.deleteAllCategories();
    await placemarkService.deleteAllUsers();
    await placemarkService.deleteAllTracks();
    user = await placemarkService.createUser(maggie);
    mozart.userid = user._id;
    beethovenSonatas = await placemarkService.createCategory(mozart);
  });

  teardown(async () => {});

  test("create track", async () => {
    const returnedCategory = await placemarkService.createTrack(beethovenSonatas._id, concerto);
    // assert.isNotNull(trackNew);
    assertSubset(concerto, returnedCategory);
  });

  test("create Multiple tracks", async () => {
    for (let i = 0; i < testTracks.length; i += 1) {
      // trackTests[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createTrack(beethovenSonatas._id, testTracks[i]);
    }
    const returnedTracks = await placemarkService.getAllTracks();
    assert.equal(returnedTracks.length, testTracks.length);
    for (let i = 0; i < returnedTracks.length; i += 1) {
      // await placemarkService.deleteAllTracks();
      // returnedTrack = await placemarkService.getAllTracks();
      // eslint-disable-next-line no-await-in-loop
      const track = await placemarkService.getTrack(returnedTracks[i]._id);
      assertSubset(track, returnedTracks[i]);
    }
  });

  test("Delete Track", async () => {
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createTrack(beethovenSonatas._id, testTracks[i]);
    }
    let returnedTracks = await placemarkService.getAllTracks();
    assert.equal(returnedTracks.length, testTracks.length);
    for (let i = 0; i < returnedTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const track = await placemarkService.deleteTrack(returnedTracks[i]._id);
    }
    returnedTracks = await placemarkService.getAllTracks();
    assert.equal(returnedTracks.length, 0);
  });

  test("test denormalised category", async () => {
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createTrack(beethovenSonatas._id, testTracks[i]);
    }
    const returnedCategory = await placemarkService.getCategory(beethovenSonatas._id);
    assert.equal(returnedCategory.tracks.length, testTracks.length);
    for (let i = 0; i < testTracks.length; i += 1) {
      assertSubset(testTracks[i], returnedCategory.tracks[i]);
    }
  });
});
