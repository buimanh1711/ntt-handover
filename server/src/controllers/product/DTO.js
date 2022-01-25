const Joi = require("joi");
const { INLAND, OVERSEA } = require("../../configs/constants");
const catchValidateError = require("../../helpers/catch_validate_error");
const getPage = require("../../helpers/get_page");
const toSlug = require("../../helpers/to_slug");
const _ = require("lodash");
class DTO {
  createProduct(data) {
    const {
      name,
      categories,
      brand,
      origin,
      price,
      sale_percent,
      stock,
      in_home,
    } = data || {};

    const schema = Joi.object({
      name: Joi.string().min(1),
      categories: Joi.array().min(1).items(Joi.string().alphanum().min(1)),
      brand: Joi.string().alphanum().min(1).required(),
      price: Joi.number().min(0),
      sale_percent: Joi.number().min(0).max(100),
      origin: Joi.string().valid(INLAND, OVERSEA),
      stock: Joi.number().min(0),
      in_home: Joi.boolean(),
    });

    const { error } = schema.validate({
      name,
      categories,
      brand,
      price,
      origin,
      sale_percent,
      stock,
      in_home,
    });

    catchValidateError(error);

    const slug = toSlug(data.name);

    return { ...data, slug };
  }

  updateProduct(_id, newData) {
    const {
      name,
      categories,
      brand,
      origin,
      price,
      rate,
      sale_percent,
      stock,
      in_home,
      status,
    } = newData || {};

    const schema = Joi.object({
      _id: Joi.string().alphanum().required(),
      name: Joi.string().min(1),
      origin: Joi.string().valid(INLAND, OVERSEA),
      categories: Joi.array().min(1).items(Joi.string().alphanum().min(1)),
      brand: Joi.string().alphanum().min(1),
      price: Joi.number().min(0),
      rate: Joi.number().min(0).max(5),
      sale_percent: Joi.number().min(0).max(100),
      stock: Joi.number().min(0),
      status: Joi.boolean(),
      in_home: Joi.boolean(),
    });

    const { error } = schema.validate({
      _id,
      name,
      categories,
      brand,
      price,
      sale_percent,
      stock,
      in_home,
      origin,
      rate,
      status,
    });

    catchValidateError(error);

    return {
      _id,
      newData,
    };
  }

  removeProduct(_id) {
    const schema = Joi.object({
      _id: Joi.string().alphanum().required(),
    });

    const { error } = schema.validate({
      _id,
    });

    catchValidateError(error);

    return _id;
  }

  queryProducts(params) {
    const {
      page,
      search,
      categories,
      brand,
      rate,
      min_price,
      max_price,
      origin,
    } = params || {};

    const categoryArr = _.compact((categories || "").split(","));

    const schema = Joi.object({
      categories: Joi.array().min(1).items(Joi.string().alphanum().min(1)),
      brand: Joi.string().alphanum().min(1),
      min_price: Joi.number().min(0),
      max_price: Joi.number().min(0),
      origin: Joi.string().valid(INLAND, OVERSEA),
      rate: Joi.number().min(0).max(5),
      page: Joi.number().min(1),
    });

    const { error } = schema.validate({
      categories: categoryArr,
      brand,
      min_price,
      max_price,
      origin,
      rate,
      page,
    });

    catchValidateError(error);

    const { start, limit } = getPage(page || 1);
    const conditions = {
      min_price,
      max_price,
      start,
      limit,
      search: search,
    };

    params.categories = categoryArr;
    delete params["page"];
    delete params["min_price"];
    delete params["max_price"];
    delete params["search"];

    return {
      params,
      conditions,
    };
  }
}

module.exports = new DTO();
