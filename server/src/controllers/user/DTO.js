const Joi = require("joi");
const {
  MALE,
  FEMALE,
  BISEXUAL,
  USER,
  SUPER,
  ADMIN,
} = require("../../configs/constants");
const catchValidateError = require("../../helpers/catch_validate_error");
const getPage = require("../../helpers/get_page");
const toSlug = require("../../helpers/to_slug");
const _ = require("lodash");
class DTO {
  createUser(data, role = USER) {
    const {
      email,
      password,
      first_name,
      last_name,
      sex,
      address,
      phone,
      avt_url,
    } = data || {};

    const schema = Joi.object({
      role: Joi.number().valid(USER, SUPER, ADMIN),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6).required(),
      first_name: Joi.string().alphanum().min(1).required(),
      last_name: Joi.string().alphanum().min(1).required(),
      sex: Joi.string().valid(MALE, FEMALE, BISEXUAL),
      address: Joi.string().min(10).required(),
      phone: joi
        .string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      avt_url: Joi.string().min(1),
    });

    const { error } = schema.validate({
      email,
      password,
      first_name,
      last_name,
      sex,
      address,
      phone,
      avt_url,
      role,
    });

    catchValidateError(error);

    return {
      email,
      password,
      first_name,
      last_name,
      sex,
      address,
      phone,
      avt_url,
      role,
    };
  }

  updateUser(_id, newData) {
    const {
      email,
      password,
      first_name,
      last_name,
      sex,
      address,
      phone,
      avt_url,
    } = newData || {};

    const schema = Joi.object({
      _id: Joi.string().alphanum().required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6),
      first_name: Joi.string().alphanum().min(1),
      last_name: Joi.string().alphanum().min(1),
      sex: Joi.string().valid(MALE, FEMALE, BISEXUAL),
      address: Joi.string().min(10),
      phone: joi
        .string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      avt_url: Joi.string().min(1),
    });

    const { error } = schema.validate({
      _id,
      email,
      password,
      first_name,
      last_name,
      sex,
      address,
      phone,
      avt_url,
    });

    catchValidateError(error);

    return {
      _id,
      newData,
    };
  }

  queryUsers(params) {
    const { page, role } = params || {};

    const schema = Joi.object({
      role: Joi.number().valid(USER, SUPER, ADMIN),
      page: Joi.number().min(1),
    });

    const { error } = schema.validate({
      page,
      role,
    });

    catchValidateError(error);

    const { start, limit } = getPage(page || 1);
    const conditions = {
      start,
      limit,
    };

    delete params["page"];

    return {
      params,
      conditions,
    };
  }

  getOneUser(data) {
    const { _id } = data;
    const schema = Joi.object({
      _id: Joi.string().alphanum().required(),
    });

    const { error } = schema.validate({
      _id,
    });

    catchValidateError(error);

    return _id;
  }
}

module.exports = new DTO();
