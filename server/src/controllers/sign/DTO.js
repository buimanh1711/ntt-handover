const Joi = require("joi");
const catchValidateError = require("../../helpers/catch_validate_error");

class DTO {
  login(data) {
    const { email, password } = data || {};

    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate({
      email,
      password,
    });

    catchValidateError(error);

    return {
      email,
      password,
    };
  }
}

module.exports = new DTO();
