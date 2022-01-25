const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const OrderModel = require("../../models/order.model");
require("../../models/category.model");
require("../../models/brand.model");
class OrderHandlers {
  async createOrder(data) {
    try {
      const result = await OrderModel.create(data);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not create order!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Create order successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateOrder(_id, newData) {
    try {
      const query = { _id };
      const data = newData;
      const option = {
        new: true,
        runValidations: true,
      };

      const result = await OrderModel.findOneAndUpdate(query, data, option);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not update order!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Update order successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeOrder(_id) {
    try {
      const result = await OrderModel.deleteOne({ _id });

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not remove order!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Remove order successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryOrders(params, conditions) {
    try {
      const { limit, start } = conditions;

      const results = await OrderModel.find(params)
        // .populate({
        //   path: "categories",
        //   model: "category_model",
        //   select: "name slug image_url",
        // })
        // .populate({
        //   path: "brand",
        //   model: "brand_model",
        //   select: "name slug image_url",
        // })
        .skip(start)
        .limit(limit);

      if (!results || results === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get orders!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get orders successfully!",
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async getOneOrder(_id) {
    try {
      const result = await OrderModel.findOne({
        _id,
      });

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get order!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get order successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new OrderHandlers();
