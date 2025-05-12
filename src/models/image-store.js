import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret,
};
cloudinary.config(credentials);

export const imageStore = {
  getAllImages: async function () {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function (imagefile) {
    writeFileSync("./public/temp.img", imagefile);
    const response = await cloudinary.v2.uploader.upload("./public/temp.img");
    return response.secure_url;
  },

  // uploadImage: async function (imagefile) {
  //   const buffer = imagefile._data; // Hapi stores raw file data here

  //   writeFileSync("./public/temp.img", buffer); // Write buffer to temp file
  //   const response = await cloudinary.v2.uploader.upload("./public/temp.img"); // Upload to Cloudinary
  //   return response.secure_url; // Return the image URL
  // },

  deleteImage: async function (img) {
    await cloudinary.v2.uploader.destroy(img, {});
  },
};
