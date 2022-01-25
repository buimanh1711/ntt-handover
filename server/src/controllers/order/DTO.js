const Joi = require("joi");
const {
  DONE,
  PENDING,
  COD,
  PAYPAL,
  CONFIRMED,
} = require("../../configs/constants");
const catchValidateError = require("../../helpers/catch_validate_error");
const getPage = require("../../helpers/get_page");
const _ = require("lodash");
class DTO {
  createOrder(data) {
    const { payment_type, amount } = data || {};

    const schema = Joi.object({
      payment_type: Joi.string().valid(COD, PAYPAL).required(),
      amount: Joi.number().min(1),
    });

    const { error } = schema.validate({
      payment_type,
      amount,
    });

    catchValidateError(error);

    return {
      payment_type,
      amount,
    };
  }

  updateOrder(_id, newData) {
    const { order_status, payment_type, amount } = newData || {};

    const schema = Joi.object({
      payment_type: Joi.string().valid(COD, PAYPAL).required(),
      amount: Joi.number().min(1),
      order_status: Joi.string().valid(PENDING, DONE),
    });

    const { error } = schema.validate({
      order_status,
      payment_type,
      amount,
    });

    catchValidateError(error);

    return {
      order_status,
      payment_type,
      amount,
    };
  }

  removeOrder(_id) {
    const schema = Joi.object({
      _id: Joi.string().alphanum().required(),
    });

    const { error } = schema.validate({
      _id,
    });

    catchValidateError(error);

    return _id;
  }

  queryOrders(params) {
    const { order_status, payment_type, page } = params || {};

    const schema = Joi.object({
      payment_type: Joi.string().valid(COD, PAYPAL).required(),
      order_status: Joi.string().valid(PENDING, DONE, CONFIRMED),
      page: Joi.number().min(1),
    });

    const { error } = schema.validate({
      order_status,
      payment_type,
      page,
    });

    catchValidateError(error);

    const { start, limit } = getPage(page || 1);
    delete params["page"];

    return {
      params,
      conditions: {
        start,
        limit,
      },
    };
  }

  getOneOrder(_id) {
    const schema = Joi.object({
      _id: Joi.string().alphanum().min(1),
    });

    const { error } = schema.validate({
      brand,
    });

    catchValidateError(error);

    return _id;
  }
}

module.exports = new DTO();
