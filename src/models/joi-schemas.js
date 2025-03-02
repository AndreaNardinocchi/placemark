/**
 * This defines a schema we will use for the signup form, indicating that all
 * fields are strings, required + the email should be a validly formatted email.
 *
 * Sources: // https://www.npmjs.com/package/@joi/date and https://github.com/hapijs/joi-date/issues/39
 */

import Joi from "joi";
import JoiDate from "@joi/date";
import dayjs from "dayjs";

const JoiExtended = Joi.extend(JoiDate);

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().min(6).max(12).example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().min(3).max(30).example("Homer").required(),
  lastName: Joi.string().min(3).max(30).example("Simpson").required(),
  userLat: Joi.number().max(100).example(40.41541290283203),
  userLong: Joi.number().max(100).example(-3.684231996536255),
  // gender: Joi.string().min(3).max(10).example("Male").required(),
  country: Joi.string().min(3).max(30).example("Portugal").required(),
  street: Joi.string().min(3).max(50).example("Rua das Flores, 4").required(),
  addressCode: Joi.string().min(3).max(15).example("T12Y2NE").required(),
  DOB: JoiExtended.date().raw().format().required().messages({ "date.min": "You must be at least 14 years old.", "date.max": "Date of birth cannot be in the future." }), // to comment on the readme.md
  phoneNumber: Joi.number().example(892356189).required(),
  createdTimeStamp: JoiExtended.date()
    .raw()
    .format()
    .default(() => new Date()),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const updatedUserSpec = {
  userLat: Joi.number().max(100).example(40.41541290283203),
  userLong: Joi.number().max(100).example(-3.684231996536255),
  country: Joi.string().min(3).max(30).required(),
  street: Joi.string().min(3).max(50).required(),
  addressCode: Joi.string().min(3).max(15).required(),
  phoneNumber: Joi.number().example(892356189).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
};

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

// https://joi.dev/api/?v=17.13.3
// https://stackoverflow.com/questions/47873369/joi-validation-string-fails-on-and
export const PlacemarkSpec = Joi.object()
  .keys({
    title: Joi.string().min(3).max(30).example("El Parque del Buen Retiro").required(),
    lat: Joi.number().max(100).example(40.41541290283203).required(),
    long: Joi.number().max(100).example(-3.684231996536255).required(),
    address: Joi.string().min(3).max(150).example("Plaza de la Independencia, 728001").required(),
    country: Joi.string().min(3).max(30).example("Spain").required(),
    phone: Joi.number().example(89672435).required(),
    website: Joi.string().example("https://bit.ly/3bGwJUlrequired").required(),
    visited: Joi.string().min(2).max(3).example("Yes").required(),
    description: Joi.string()
      .min(100)
      .max(250)
      .example(
        "Covering over 125 hectares and comprising more than 15,000 trees, El Retiro Park–recently named a UNESCO World Heritage Site–is a green oasis in the heart of the city. And more!!!"
      )
      .required(),
    categoryid: IdSpec,
  })
  .label("Placemark");

export const updatedPlacemarkSpec = {
  title: Joi.string().min(3).max(30).required(),
  lat: Joi.number().max(100).required(),
  long: Joi.number().max(100).required(),
  address: Joi.string().min(3).max(150).required(),
  country: Joi.string().min(3).max(30).required(),
  phone: Joi.number().required(),
  website: Joi.string().required(),
  visited: Joi.string().min(2).max(3).required(),
  description: Joi.string().min(100).max(250),
};

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const CategorySpec = Joi.object()
  .keys({
    title: Joi.string().example("Museums").required(),
    userLat: Joi.number().max(100).example(40.41541290283203).required(),
    userLong: Joi.number().max(100).example(3.927241764598).required(),
    userid: IdSpec,
    notes: Joi.string().min(20).max(1000).example("Here I will be adding all restaurants I would like to try out...").required(),
    placemarks: PlacemarkArraySpec,
  })
  .label("Category");

export const CategorySpecPlus = CategorySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CategoryPlus");

export const CategoryArraySpec = Joi.array().items(CategorySpecPlus).label("CategoryArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
