/**
 * This defines a schema we will use for the signup form, indicating that all
 * fields are strings, required + the email should be a validly formatted email.
 *
 * Sources: // https://www.npmjs.com/package/@joi/date and https://github.com/hapijs/joi-date/issues/39
 */

import Joi from "joi";
import JoiDate from "@joi/date";

const JoiExtended = Joi.extend(JoiDate);

export const UserSpec = {
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  gender: Joi.string().min(3).max(10).required(),
  country: Joi.string().min(3).max(30).required(),
  street: Joi.string().min(3).max(50).required(),
  addressCode: Joi.string().min(3).max(15).required(),
  DOB: JoiExtended.date().raw().format().required(), // to comment on the readme.md
  phoneNumber: Joi.string().min(8).max(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
};

export const updatedUserSpec = {
  country: Joi.string().min(3).max(30).required(),
  street: Joi.string().min(3).max(50).required(),
  addressCode: Joi.string().min(3).max(15).required(),
  phoneNumber: Joi.string().min(8).max(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const CategorySpec = {
  title: Joi.string().required(),
};

// https://joi.dev/api/?v=17.13.3
// https://stackoverflow.com/questions/47873369/joi-validation-string-fails-on-and
export const placemarkSpec = {
  title: Joi.string().min(3).max(30).required(),
  lat: Joi.string().min(3).max(30).required(),
  long: Joi.string().min(3).max(30).required(),
  address: Joi.string().min(3).max(150).required(),
  country: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(8).max(20).required(),
  website: Joi.string().required(),
  visited: Joi.string().min(2).max(3).required(),
  description: Joi.string().min(100).max(250).required(),
};

export const updatedPlacemarkSpec = {
  title: Joi.string().min(3).max(30).required(),
  lat: Joi.string().min(3).max(30).required(),
  long: Joi.string().min(3).max(30).required(),
  address: Joi.string().min(3).max(150).required(),
  country: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(8).max(20).required(),
  website: Joi.string().required(),
  visited: Joi.string().min(2).max(3).required(),
  description: Joi.string().min(100).max(250),
};
