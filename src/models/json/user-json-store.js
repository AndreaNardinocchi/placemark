import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const userJsonStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async getUserById(id) {
    await db.read();
    let u = db.data.users.find((user) => user._id === id);
    if (u === undefined) u = null;
    return u;
  },

  async getUserByEmail(email) {
    await db.read();
    let u = db.data.users.find((user) => user.email === email);
    if (u === undefined) u = null;
    return u; // we detect undefined and return null in that instance
  },

  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    if (index !== -1) db.data.users.splice(index, 1);
    await db.write();
    db.data.users.pop(id);
  },

  async deleteAll() {
    db.data.users = [];
    await db.write();
  },

  // TOCHECK
  async updateUser(user, updatedUser) {
    console.log(updatedUser);
    // await db.read();
    user._id = updatedUser._id;
    user.country = updatedUser.country;
    user.street = updatedUser.street;
    user.addressCode = updatedUser.addressCode;
    user.phoneNumber = updatedUser.phoneNumber;
    user.email = updatedUser.email;
    user.password = updatedUser.password;
    // db.data.users.pop(user);
    // db.data.users.push(user);
    await db.write();
    console.log(user);
    return user;
  },
};
