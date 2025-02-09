// MVC Model View Controller: https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller

import { db } from "../models/db.js";
import { updatedUserSpec, UserCredentialsSpec, UserSpec } from "../models/joi-schemas.js";

export const accountsController = {
  index: {
    /**
     * This turns off the session strategy - so these routes can work
     * (and the users can signup/login).
     */
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Playlist" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Playlist" });
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
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Playlist" });
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
      // console.log(loggedInUser);
      const userDetails = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "Your Account details | App",
        user: loggedInUser,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        gender: userDetails.gender,
        country: userDetails.country,
        street: userDetails.street,
        addressCode: userDetails.addressCode,
        DOB: userDetails.DOB,
        phoneNumber: userDetails.phoneNumber,
        email: userDetails.email,
        password: userDetails.password,
        _id: userDetails._id,
      };
      return h.view("account-view", viewData);
    },
  },

  deleteAccount: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      // console.log(loggedInUser);
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
      const newCountry = request.payload.country;
      const newStreet = request.payload.street;
      const newAddressCode = request.payload.addressCode;
      const newPhoneNumber = request.payload.phoneNumber;
      const newEmail = request.payload.email;
      const newPassword = request.payload.password;
      const updatedUser = {
        user: loggedInUser,
        country: newCountry,
        street: newStreet,
        addressCode: newAddressCode,
        phoneNumber: newPhoneNumber,
        email: newEmail,
        password: newPassword,
        _id: user._id,
      };
      // The below 'updateUser()' function from the 'user-store.js' file will update the user's data
      await db.userStore.updateUser(user, updatedUser);
      // The cookie 'user' will be created and will contain the user's email
      // console.log(request.cookieAuth);

      // h.cookieAuth.set("user", { id: user._id });
      request.cookieAuth.set(
        "user",
        { id: user._id },
        { country: newCountry },
        { addressCode: newAddressCode },
        { street: newStreet },
        { email: newEmail },
        { phoneNumber: newPhoneNumber },
        { password: newPassword }
      );
      // request.cookieAuth.clear(user);

      // request.cookieAuth.set("user", { id: user._id }, user.country, user.addressCode, user.street, user.phoneNumber, user.email, user.password);
      // request.cookieAuth.clear();
      console.log(`updating ${user.email}`);
      return h.redirect("/");
    },
  },
};
