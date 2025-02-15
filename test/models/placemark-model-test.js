import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { maggie, testCategories, testUsers, mozart, concerto, testPlacemarks, beethoven } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("placemark API tests", () => {
  let beethovenList = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.placemarkStore.deleteAllPlacemarks(); // Each test should generally start from an empty data store
    beethovenList = await db.categoryStore.addCategory(beethoven);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(beethovenList._id, testPlacemarks[i]);
    }
  });

  test("create a placemark", async () => {
    const newCategory = await db.categoryStore.addCategory(mozart);
    const newPlacemark = await db.placemarkStore.addPlacemark(newCategory._id, concerto);
    assert.isNotNull(newPlacemark._id);
    assertSubset(mozart.concerto, newCategory.newPlacemark);
  });

  test("get multiple placemarks", async () => {
    const placemarks = await db.placemarkStore.getplacemarksByCategoryId(beethovenList._id);
    assert.equal(placemarks.length, testPlacemarks.length);
  });

  test("delete all placemarks", async () => {
    const placemarks = await db.placemarkStore.getAllplacemarks();
    assert.equal(placemarks.length, testPlacemarks.length);
    await db.placemarkStore.deleteAllplacemarks();
    const newPlacemarks = await db.placemarkStore.getAllplacemarks();
    assert.equal(newPlacemarks.length, 0);
  });

  test("get a placemark - success", async () => {
    const category = await db.categoryStore.addCategory(mozart);
    const placemark = await db.placemarkStore.addplacemark(category._id, concerto);
    const newPlacemark = await db.placemarkStore.getplacemarkById(placemark._id);
    assertSubset(category.newPlacemark, mozart.concerto);
  });

  test("delete One placemark - success", async () => {
    const id = testPlacemarks[0]._id;
    await db.placemarkStore.deletePlacemark(id);
    const returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length - 1);
    const deletedPlacemarks = await db.placemarkStore.getPlacemarkById(id);
    assert.isNull(deletedPlacemarks);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });

  test("delete One placemark - fail", async () => {
    await db.placemarkStore.deletePlacemark("bad-id");
    const allPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, allPlacemarks.length);
  });
});
