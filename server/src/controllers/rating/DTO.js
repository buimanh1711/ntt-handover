const Joi = require("joi");
const catchValidateError = require("../../helpers/catch_validate_error");

class DTO {
  createRate(data) {
    const { product_id, user_id, stars } = data || {};

    const schema = Joi.object({
      product_id: Joi.string().alphanum().min(1).required(),
      user_id: Joi.string().alphanum().min(1).required(),
      stars: Joi.number().required().min(1).max(5),
    });

    const { error } = schema.validate({
      product_id,
      user_id,
      stars,
    });

    catchValidateError(error);

    return { product_id, user_id, stars };
  }

  queryStars(params) {
    const { product_id } = params || {};

    const schema = Joi.object({
      product_id: Joi.string().alphanum().min(1).required(),
    });

    const { error } = schema.validate({
      product_id,
    });

    catchValidateError(error);

    return {
      product_id,
    };
  }
}

module.exports = new DTO();
