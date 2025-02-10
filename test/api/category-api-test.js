import { EventEmitter } from "events";
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { mozart, testCategories, maggie } from "../fixtures.js";
import { db } from "../../src/models/db.js";

EventEmitter.setMaxListeners(25);

suite("Category API tests", () => {
  let user = null;
  setup(async () => {
    await placemarkService.deleteAllCategories();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    // await placemarkService.authenticate(maggieCredentials);
    mozart.userid = user._id;
  });
  teardown(async () => {});

  test("create a category", async () => {
    const categoryNew = await placemarkService.createCategory(mozart);
    assert.isNotNull(categoryNew);
    assertSubset(mozart, categoryNew);
    // assert.isDefined(categoryNew._id);
  });

  test("delete a category", async () => {
    const category = await placemarkService.createCategory(mozart);
    const response = await placemarkService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await placemarkService.getCategory(category.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No category with this id", "Incorrect Response Message");
    }
  });

  test("create multiple categories", async () => {
    for (let i = 0; i < testCategories.length; i += 1) {
      testCategories[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createCategory(testCategories[i]);
    }
    let returnedCategory = await placemarkService.getAllCategories();
    assert.equal(returnedCategory.length, testCategories.length);
    await placemarkService.deleteAllCategories();
    returnedCategory = await placemarkService.getAllCategories();
    assert.equal(returnedCategory.length, 0);
  });

  test("remove non-existant category", async () => {
    try {
      const response = await placemarkService.deleteCategory("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No category with this id", "Incorrect Response Message");
    }
  });
});
