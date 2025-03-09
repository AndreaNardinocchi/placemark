import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { maggie, testCategories, testUsers, museums, elPradoMuseum, testPlacemarks, parks } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("placemark API model tests", () => {
  let parksList = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.placemarkStore.deleteAllPlacemarks(); // Each test should generally start from an empty data store
    parksList = await db.categoryStore.addCategory(parks);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(parksList._id, testPlacemarks[i]);
    }
  });

  test("create a placemark", async () => {
    const newCategory = await db.categoryStore.addCategory(museums);
    const newPlacemark = await db.placemarkStore.addPlacemark(newCategory._id, elPradoMuseum);
    assert.isNotNull(newPlacemark._id);
    assertSubset(museums.elPradoMuseum, newCategory.newPlacemark);
  });

  test("get multiple placemarks", async () => {
    const placemarks = await db.placemarkStore.getPlacemarksByCategoryId(parksList._id);
    assert.equal(placemarks.length, testPlacemarks.length);
  });

  test("delete all placemarks", async () => {
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testPlacemarks.length);
    await db.placemarkStore.deleteAllPlacemarks();
    const newPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(newPlacemarks.length, 0);
  });

  test("get a placemark - success", async () => {
    const category = await db.categoryStore.addCategory(museums);
    const placemark = await db.placemarkStore.addPlacemark(category._id, elPradoMuseum);
    const newPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset(category.newPlacemark, museums.elPradoMuseum);
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
