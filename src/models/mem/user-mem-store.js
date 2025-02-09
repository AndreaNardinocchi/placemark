import { v4 } from "uuid";

let users = [];

export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user) {
    user._id = v4();
    users.push(user);
    return user;
  },

  async getUserById(id) {
    let u = users.find((user) => user._id === id);
    if (u === undefined) u = null;
    return u;
  },

  async getUserByEmail(email) {
    let u = users.find((user) => user.email === email);
    if (u === undefined) u = null;
    return u;
  },

  async deleteUserById(id) {
    const index = users.findIndex((user) => user._id === id);
    if (index !== -1) users.splice(index, 1);
  },

  async deleteAll() {
    users = [];
  },

  // TOCHECK
  async updateUser(user, updatedUser) {
    console.log(updatedUser);
    user._id = updatedUser._id;
    user.country = updatedUser.country;
    user.street = updatedUser.street;
    user.addressCode = updatedUser.addressCode;
    user.phoneNumber = updatedUser.phoneNumber;
    user.email = updatedUser.email;
    user.password = updatedUser.password;
    // users.pop(user);
    // users.push(user);
    console.log(user);
    return user;
  },
};
