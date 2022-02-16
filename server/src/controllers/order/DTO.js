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
    const { payment_type, user } = data || {};

    const schema = Joi.object({
      payment_type: Joi.string().valid(COD, PAYPAL).required(),
      user: Joi.string().alphanum().required(),
    });

    const { error } = schema.validate({
      payment_type,
      user,
    });

    catchValidateError(error);

    return {
      payment_type,
      user,
    };
  }

  updateOrder(_id, newData) {
    const { order_status, payment_type, amount } = newData || {};

    const schema = Joi.object({
      payment_type: Joi.string().valid(COD, PAYPAL),
      order_status: Joi.string().valid(PENDING, DONE),
      user: Joi.string().alphanum(),
      exporter: Joi.string().alphanum(),
    });

    const { error } = schema.validate({
      order_status,
      payment_type,
      user,
      exporter,
    });

    catchValidateError(error);

    return {
      order_status,
      payment_type,
      user,
      exporter,
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
    const { order_status, payment_type, page, user } = params || {};

    const schema = Joi.object({
      payment_type: Joi.string().valid(COD, PAYPAL),
      order_status: Joi.string().valid(PENDING, DONE, CONFIRMED),
      page: Joi.number().min(1),
      user: Joi.string().alphanum(),
    });

    const { error } = schema.validate({
      order_status,
      payment_type,
      page,
      user,
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

  queryUserOrdersList(params) {
    const { user } = params || {};

    const schema = Joi.object({
      user: Joi.string().alphanum().required(),
    });

    const { error } = schema.validate({
      user,
    });

    catchValidateError(error);

    return {
      user,
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
