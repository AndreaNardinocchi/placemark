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
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gender: Joi.string().required(),
  country: Joi.string().required(),
  street: Joi.string().required(),
  addressCode: Joi.string().required(),
  DOB: JoiExtended.date().raw().format().required(), // to comment on the readme.md
  phoneNumber: Joi.number().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const updatedUserSpec = {
  country: Joi.string().required(),
  street: Joi.string().required(),
  addressCode: Joi.string().required(),
  phoneNumber: Joi.number().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
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
export const TrackSpec = {
  title: Joi.string().min(3).max(30).required(),
  long: Joi.string().min(3).max(30).required(),
  lat: Joi.string().min(3).max(30).required(),
  address: Joi.string().min(3).max(30).required(),
  country: Joi.string().min(3).max(30).required(),
  phone: Joi.number().required(),
  website: Joi.string().required(),
  description: Joi.string().min(100).max(230).required(),
};
