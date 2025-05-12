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
      return h.view("main", { title: "Welcome to PlaceMark" });
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
      const users = await db.userStore.getAllUsers();
      const user = request.payload;

      /**
       * The below lines of code will verify whether the email inputted by the user to sign up
       * is already in the user store or not.
       * If the email is taken, the user will get redirected to the taken-email.hbs page, and advised
       * to use a different email to sign up.
       */

      // let { email } = request.payload;
      // let exEmail = "";
      // // eslint-disable-next-line prefer-const
      // let existingEmail = [];
      // // eslint-disable-next-line no-shadow
      // users.forEach((user) => {
      //   exEmail = user.email;
      //   console.log("Existing email", exEmail);
      //   existingEmail.push(exEmail);
      // });
      // let existingEmailNow = "";
      // for (let i = 0; i < existingEmail.length; i += 1) {
      //   existingEmailNow = existingEmail[i];
      //   if (existingEmail[i] === email) {
      //     email = existingEmailNow;
      //     console.log("existingEmailNow", existingEmailNow);
      //     return h.redirect("/taken-email");
      //   }
      // }

      const existingUser = await db.userStore.getUserByEmail(user.email);

      if (existingUser) {
        return h.redirect("/taken-email");
        // return h.response({ error: "Email is already taken" }).code(409);
      }

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
      // We set the cookie and istall the object 'user', passing the '._id' of the user
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
        title: "Your Account details | PlaceMark",
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

  takenEmail: {
    auth: false,
    handler: function (request, h) {
      return h.view("taken-email", { title: "Your email is taken already" });
    },
  },
};

// // MVC Model View Controller: https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
// // eslint-disable-next-line import/no-cycle
// import bcrypt from "bcryptjs";

// import { db } from "../models/db.js";
// import { updatedUserSpec, UserCredentialsSpec, UserSpec } from "../models/joi-schemas.js";
// import { somethingAnalytics } from "../utils/something-analytics.js";

// export const accountsController = {
//   index: {
//     /**
//      * This turns off the session strategy - so these routes can work
//      * (and the users can signup/login).
//      */
//     auth: false,
//     handler: function (request, h) {
//       return h.view("main", { title: "Welcome to PlaceMark" });
//     },
//   },
//   showSignup: {
//     auth: false,
//     handler: function (request, h) {
//       return h.view("signup-view", { title: "Sign up for Placemark" });
//     },
//   },
//   signup: {
//     auth: false,
//     /**
//      * validate object specifying our validation schema
//      * (UserSpec) + failAction method,
//      * to be called if the validation fails.
//      * 'errors: error.details' will enable the signup page to show the errors
//      * .takeover() will avoid the redirection to accountController, as Joi will manage the error
//      */
//     validate: {
//       payload: UserSpec,
//       options: { abortEarly: false },
//       failAction: function (request, h, error) {
//         return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
//       },
//     },
//     handler: async function (request, h) {
//       const users = await db.userStore.getAllUsers();
//       const user = request.payload;

//       /**
//        * The below lines of code will verify whether the email inputted by the user to sign up
//        * is already in the user store or not.
//        * If the email is taken, the user will get redirected to the taken-email.hbs page, and advised
//        * to use a different email to sign up.
//        */

//       let { email } = request.payload;
//       let exEmail = "";
//       // eslint-disable-next-line prefer-const
//       let existingEmail = [];
//       // eslint-disable-next-line no-shadow
//       users.forEach((user) => {
//         exEmail = user.email;
//         console.log("Existing email", exEmail);
//         existingEmail.push(exEmail);
//       });
//       let existingEmailNow = "";
//       for (let i = 0; i < existingEmail.length; i += 1) {
//         existingEmailNow = existingEmail[i];
//         if (existingEmail[i] === email) {
//           email = existingEmailNow;
//           console.log("existingEmailNow", existingEmailNow);
//           return h.redirect("/taken-email");
//         }
//       }

//       // https://www.npmjs.com/package/bcrypt
//       // https://github.com/kelektiv/node.bcrypt.js
//       // Hash the password before saving the user
//       const saltRounds = 10; // Number of salt rounds
//       // eslint-disable-next-line no-useless-escape
//       const myPlaintextPassword = "s0/\/\P4$$w0rD";
//       const hashedPassword = await bcrypt.hash(user.password, saltRounds);

//       // Update the user object with the hashed password
//       user.password = hashedPassword;
//       console.log("Hashed Password:", hashedPassword);

//       await db.userStore.addUser(user);
//       return h.redirect("/");
//     },
//   },
//   showLogin: {
//     auth: false,
//     handler: function (request, h) {
//       return h.view("login-view", { title: "Login to Placemark" });
//     },
//   },
//   login: {
//     auth: false,
//     validate: {
//       payload: UserCredentialsSpec,
//       options: { abortEarly: false },
//       failAction: function (request, h, error) {
//         return h.view("login-view", { title: "Login error", errors: error.details }).takeover().code(400);
//       },
//     },
//     handler: async function (request, h) {
//       const { email, password } = request.payload;
//       const user = await db.userStore.getUserByEmail(email);
//       console.log("Stored hashed password Inputted:", password, user.password);
//       if (!user || !(await bcrypt.compare(password, user.password))) {
//         return h.redirect("/");
//       }
//       // We set the cookie and istall the object 'user', passing the '._id' of the user
//       request.cookieAuth.set({ id: user._id });
//       return h.redirect("/dashboard");
//     },
//   },

//   // login: {
//   //   auth: false,
//   //   validate: {
//   //     payload: UserCredentialsSpec,
//   //     options: { abortEarly: false },
//   //     failAction: function (request, h, error) {
//   //       return h.view("login-view", { title: "Login error", errors: error.details }).takeover().code(400);
//   //     },
//   //   },
//   //   handler: async function (request, h) {
//   //     const { email, password } = request.payload;
//   //     const user = await db.userStore.getUserByEmail(email);
//   //     console.log("Stored hashed password Inputted:", password, user.password);

//   //     // Compare password with stored hash using bcrypt
//   //     if (!user || !(await bcrypt.compare(password, user.password))) {
//   //       return h.redirect("/");
//   //     }

//   //     // We set the cookie and install the object 'user', passing the '._id' of the user
//   //     request.cookieAuth.set({ id: user._id });
//   //     return h.redirect("/dashboard");
//   //   },
//   // },

//   logout: {
//     auth: false,
//     handler: function (request, h) {
//       request.cookieAuth.clear();
//       return h.redirect("/");
//     },
//   },

//   /**
//    * The function has access to a session object - which will have the users ID.
//    * We use this ID to locate the user object from the store and, if found,
//    * return this object: { isValid: true, credentials: user }; otherwise
//    * { valid: false };
//    */
//   async validate(request, session) {
//     const user = await db.userStore.getUserById(session.id);
//     if (!user) {
//       return { isValid: false };
//     }
//     return { isValid: true, credentials: user };
//   },

//   showAccount: {
//     handler: async function (request, h) {
//       const loggedInUser = request.auth.credentials;
//       const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
//       const accCat0 = await somethingAnalytics.getAccountCategories0(categories);
//       const accCatId0 = await somethingAnalytics.getAccountCategoriesId0(categories);
//       const accCat1 = await somethingAnalytics.getAccountCategories1(categories);
//       const accCatId1 = await somethingAnalytics.getAccountCategoriesId1(categories);
//       const accCat2 = await somethingAnalytics.getAccountCategories2(categories);
//       const accCatId2 = await somethingAnalytics.getAccountCategoriesId2(categories);
//       const accCat3 = await somethingAnalytics.getAccountCategories3(categories);
//       const accCatId3 = await somethingAnalytics.getAccountCategoriesId3(categories);
//       const userDetails = await db.userStore.getUserById(loggedInUser._id);
//       const viewData = {
//         title: "Your Account details | PlaceMark",
//         user: loggedInUser,
//         firstName: userDetails.firstName,
//         lastName: userDetails.lastName,
//         userLat: userDetails.userLat,
//         userLong: userDetails.userLong,
//         country: userDetails.country,
//         street: userDetails.street,
//         addressCode: userDetails.addressCode,
//         DOB: userDetails.DOB,
//         phoneNumber: userDetails.phoneNumber,
//         email: userDetails.email,
//         password: userDetails.password,
//         accCat0: accCat0,
//         accCatId0: accCatId0,
//         accCat1: accCat1,
//         accCatId1: accCatId1,
//         accCat2: accCat2,
//         accCatId2: accCatId2,
//         accCat3: accCat3,
//         accCatId3: accCatId3,
//         _id: userDetails._id,
//         createdTimeStamp: userDetails.createdTimeStamp,
//       };
//       return h.view("account-view", viewData);
//     },
//   },

//   deleteAccount: {
//     handler: async function (request, h) {
//       const loggedInUser = request.auth.credentials;
//       const user = await db.userStore.getUserById(loggedInUser._id);
//       await db.userStore.deleteUserById(user._id);
//       request.cookieAuth.clear();
//       return h.redirect("/");
//     },
//   },

//   updateAccount: {
//     validate: {
//       payload: updatedUserSpec,
//       options: { abortEarly: false },
//       failAction: function (request, h, error) {
//         return h.view("account-view", { title: "Update user details error", errors: error.details }).takeover().code(400);
//       },
//     },
//     handler: async function (request, h) {
//       const loggedInUser = request.auth.credentials;
//       const user = await db.userStore.getUserById(loggedInUser._id);
//       const newUserLat = Number(request.payload.userLat);
//       const newUserLong = Number(request.payload.userLong);
//       const newCountry = request.payload.country;
//       const newStreet = request.payload.street;
//       const newAddressCode = request.payload.addressCode;
//       const newPhoneNumber = Number(request.payload.phoneNumber);
//       const newEmail = request.payload.email;
//       const newPassword = request.payload.password;
//       const updatedUser = {
//         userLat: newUserLat,
//         userLong: newUserLong,
//         country: newCountry,
//         street: newStreet,
//         addressCode: newAddressCode,
//         phoneNumber: newPhoneNumber,
//         email: newEmail,
//         password: newPassword,
//         _id: user._id,
//       };

//       // If a new password is provided, hash it
//       if (newPassword) {
//         const saltRounds = 10;
//         updatedUser.password = await bcrypt.hash(newPassword, saltRounds);
//       }
//       await db.userStore.updateUser(user, updatedUser);
//       return h.redirect("/account");
//     },
//   },

//   takenEmail: {
//     auth: false,
//     handler: function (request, h) {
//       return h.view("taken-email", { title: "Your email is taken already" });
//     },
//   },
// };
