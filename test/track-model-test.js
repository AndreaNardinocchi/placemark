import { assert } from "chai";
import { db } from "../src/models/db.js";
import { maggie, testCategories, testUsers, mozart, concerto, testTracks, beethoven } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Track API tests", () => {
  let beethovenList = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.trackStore.deleteAllTracks(); // Each test should generally start from an empty data store
    beethovenList = await db.categoryStore.addCategory(beethoven);
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testTracks[i] = await db.trackStore.addTrack(beethovenList._id, testTracks[i]);
    }
  });

  test("create a track", async () => {
    const newCategory = await db.categoryStore.addCategory(mozart);
    const newTrack = await db.trackStore.addTrack(newCategory._id, concerto);
    assert.isNotNull(newTrack._id);
    assertSubset(mozart.concerto, newCategory.newTrack);
  });

  test("get multiple tracks", async () => {
    const tracks = await db.trackStore.getTracksByCategoryId(beethovenList._id);
    assert.equal(tracks.length, testTracks.length);
  });

  test("delete all tracks", async () => {
    const tracks = await db.trackStore.getAllTracks();
    assert.equal(tracks.length, testTracks.length);
    await db.trackStore.deleteAllTracks();
    const newTracks = await db.trackStore.getAllTracks();
    assert.equal(newTracks.length, 0);
  });

  test("get a track - success", async () => {
    const category = await db.categoryStore.addCategory(mozart);
    const track = await db.trackStore.addTrack(category._id, concerto);
    const newTrack = await db.trackStore.getTrackById(track._id);
    assertSubset(category.newTrack, mozart.concerto);
  });

  test("delete One track - success", async () => {
    const id = testTracks[0]._id;
    await db.trackStore.deleteTrack(id);
    const returnedTracks = await db.trackStore.getAllTracks();
    assert.equal(returnedTracks.length, testTracks.length - 1);
    const deletedTracks = await db.trackStore.getTrackById(id);
    assert.isNull(deletedTracks);
  });

  test("get a track - bad params", async () => {
    assert.isNull(await db.trackStore.getTrackById(""));
    assert.isNull(await db.trackStore.getTrackById());
  });

  test("delete One track - fail", async () => {
    await db.trackStore.deleteTrack("bad-id");
    const allTracks = await db.trackStore.getAllTracks();
    assert.equal(testTracks.length, allTracks.length);
  });
});
