const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const OrderItemModel = require("../../models/order_item.model");

class OrderItemHandlers {
  async createOrderItems(data) {
    try {
      const result = await OrderItemModel.create(data);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not order items!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Create order items successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeOrderItems(_ids) {
    try {
      const result = await OrderItemModel.deleteMany({ _id: { $in: _ids } });

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not remove order items!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Remove order items successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryOrderItems(params) {
    try {
      const { _id } = params;
      const results = await OrderItemModel.find({ _id }).populate({
        path: "product",
        model: "product_model",
      });

      if (!results || results === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get order items!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get order items successfully!",
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new OrderItemHandlers();
