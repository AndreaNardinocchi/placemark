// MVC Model View Controller: https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
// eslint-disable-next-line import/no-cycle
import { db } from "../models/db.js";
import { updatedUserSpec, UserCredentialsSpec, UserSpec } from "../models/joi-schemas.js";
import { somethingAnalytics } from "../utils/something-analytics.js";

export const accountsController = {
  index: {
    /**
     * This turns off the session strategy - so these routes can work
     * (and the users can signup/login).
     */
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Placemark" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Placemark" });
    },
  },
  signup: {
    auth: false,
    /**
     * validate object specifying our validation schema
     * (UserSpec) + failAction method,
     * to be called if the validation fails.
     * 'errors: error.details' will enable the signup page to show the errors
     * .takeover() will avoid the redirection to accountController, as Joi will manage the error
     */
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      console.log("This is the currentHour: ", user);
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Placemark" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Login error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      // We set the cookie and istall the object 'user', passing the '._id' of te user
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  /**
   * The function has access to a session object - which will have the users ID.
   * We use this ID to locate the user object from the store and, if found,
   * return this object: { isValid: true, credentials: user }; otherwise
   * { valid: false };
   */
  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },

  showAccount: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
      const accCat0 = await somethingAnalytics.getAccountCategories0(categories);
      const accCatId0 = await somethingAnalytics.getAccountCategoriesId0(categories);
      const accCat1 = await somethingAnalytics.getAccountCategories1(categories);
      const accCatId1 = await somethingAnalytics.getAccountCategoriesId1(categories);
      const accCat2 = await somethingAnalytics.getAccountCategories2(categories);
      const accCatId2 = await somethingAnalytics.getAccountCategoriesId2(categories);
      const accCat3 = await somethingAnalytics.getAccountCategories3(categories);
      const accCatId3 = await somethingAnalytics.getAccountCategoriesId3(categories);
      const userDetails = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "Your Account details | App",
        user: loggedInUser,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        userLat: userDetails.userLat,
        userLong: userDetails.userLong,
        country: userDetails.country,
        street: userDetails.street,
        addressCode: userDetails.addressCode,
        DOB: userDetails.DOB,
        phoneNumber: userDetails.phoneNumber,
        email: userDetails.email,
        password: userDetails.password,
        accCat0: accCat0,
        accCatId0: accCatId0,
        accCat1: accCat1,
        accCatId1: accCatId1,
        accCat2: accCat2,
        accCatId2: accCatId2,
        accCat3: accCat3,
        accCatId3: accCatId3,
        _id: userDetails._id,
        createdTimeStamp: userDetails.createdTimeStamp,
      };
      return h.view("account-view", viewData);
    },
  },

  deleteAccount: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      await db.userStore.deleteUserById(user._id);
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  updateAccount: {
    validate: {
      payload: updatedUserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("account-view", { title: "Update user details error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      const newUserLat = Number(request.payload.userLat);
      const newUserLong = Number(request.payload.userLong);
      const newCountry = request.payload.country;
      const newStreet = request.payload.street;
      const newAddressCode = request.payload.addressCode;
      const newPhoneNumber = Number(request.payload.phoneNumber);
      const newEmail = request.payload.email;
      const newPassword = request.payload.password;
      const updatedUser = {
        userLat: newUserLat,
        userLong: newUserLong,
        country: newCountry,
        street: newStreet,
        addressCode: newAddressCode,
        phoneNumber: newPhoneNumber,
        email: newEmail,
        password: newPassword,
        _id: user._id,
      };
      await db.userStore.updateUser(user, updatedUser);
      return h.redirect("/account");
    },
  },
};
