const Joi = require("joi");
const catchValidateError = require("../../helpers/catch_validate_error");
const getPage = require("../../helpers/get_page");
const toSlug = require("../../helpers/to_slug");

class DTO {
  createCategory(data) {
    const { name } = data || {};

    const schema = Joi.object({
      name: Joi.string().min(1),
    });

    const { error } = schema.validate({
      name,
    });

    catchValidateError(error);

    const slug = toSlug(data.name);

    return { ...data, slug };
  }

  updateCategory(_id, newData) {
    const { name, status } = newData || {};

    const schema = Joi.object({
      _id: Joi.string().alphanum().required(),
      name: Joi.string().min(1),
      status: Joi.boolean(),
    });

    const { error } = schema.validate({
      _id,
      name,
      status,
    });

    catchValidateError(error);

    return {
      _id,
      newData,
    };
  }

  removeCategory(_id) {
    const schema = Joi.object({
      _id: Joi.string().alphanum().required(),
    });

    const { error } = schema.validate({
      _id,
    });

    catchValidateError(error);

    return _id;
  }

  queryCategories(params) {
    const { page, search } = params || {};

    const schema = Joi.object({
      page: Joi.number().min(1),
    });

    const { error } = schema.validate({
      page,
    });

    catchValidateError(error);

    const { start, limit } = getPage(page || 1);
    return {
      start,
      limit,
      search: search,
    };
  }
}

module.exports = new DTO();
