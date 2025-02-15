import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { testPlacemarks, mozart, testCategories, maggie, concerto } from "../fixtures.js";
import { db } from "../../src/models/db.js";

suite("Placemark API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    // db.init("json");

    await placemarkService.deleteAllCategories();
    await placemarkService.deleteAllUsers();
    await placemarkService.deleteAllplacemarks();
    user = await placemarkService.createUser(maggie);
    mozart.userid = user._id;
    beethovenSonatas = await placemarkService.createCategory(mozart);
  });

  teardown(async () => {});

  test("create Placemark", async () => {
    const returnedCategory = await placemarkService.createPlacemark(beethovenSonatas._id, concerto);
    // assert.isNotNull(placemarkNew);
    assertSubset(concerto, returnedCategory);
  });

  test("create Multiple placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // placemarkTests[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createplacemark(beethovenSonatas._id, testPlacemarks[i]);
    }
    const returnedPlacemarks = await placemarkService.getAllplacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    for (let i = 0; i < returnedPlacemarks.length; i += 1) {
      // await placemarkService.deleteAllPlacemarks();
      // returnedPlacemark = await placemarkService.getAllPlacemarks();
      // eslint-disable-next-line no-await-in-loop
      const placemark = await placemarkService.getPlacemark(returnedPlacemarks[i]._id);
      assertSubset(placemark, returnedPlacemarks[i]);
    }
  });

  test("Delete placemark", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createplacemark(beethovenSonatas._id, testPlacemarks[i]);
    }
    let returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    for (let i = 0; i < returnedPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await placemarkService.deleteplacemark(returnedPlacemarks[i]._id);
    }
    returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("test denormalised placemark", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlacemark(beethovenSonatas._id, testPlacemarks[i]);
    }
    const returnedCategory = await placemarkService.getCategory(beethovenSonatas._id);
    assert.equal(returnedCategory.placemarks.length, testPlacemarks.length);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      assertSubset(testPlacemarks[i], returnedCategory.placemarks[i]);
    }
  });
});
