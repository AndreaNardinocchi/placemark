import { User } from "./user.js";
// import { updatedUser } from "../controllers/about-controller.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },

  // https://endgrate.com/blog/using-the-mongodb-api-to-create-or-update-records-(with-javascript-examples)
  async updateUser(user, updatedUser) {
    const userDoc = await User.findOne({ _id: user._id });
    console.log(userDoc);
    user._id = updatedUser._id;
    userDoc.country = updatedUser.country;
    userDoc.street = updatedUser.street;
    userDoc.addressCode = updatedUser.addressCode;
    userDoc.phoneNumber = updatedUser.phoneNumber;
    userDoc.email = updatedUser.email;
    userDoc.password = updatedUser.password;

    await userDoc.save();

    // await User.findOne(user);
    // try {
    //   const updateUser = await User.updateOne(user, updatedUser);
    //   console.log(updateUser);
    //   console.log(`${updateUser.matchedCount} document(s) matched the filter, updated ${updateUser.modifiedCount} document(s)`);
    // } catch (error) {
    //   console.error("Error updating record:", error);
    // }
  },
};
