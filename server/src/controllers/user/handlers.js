const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const UserModel = require("../../models/user.model");
require("../../models/category.model");
require("../../models/brand.model");
class UserHandlers {
  async createUser(data) {
    try {
      const result = await UserModel.create(data);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not create user!"),
        };

      delete result["password"];
      delete result["role"];

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Create user successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateUser(_id, newData) {
    try {
      const query = { _id };
      const data = newData;
      const option = {
        new: true,
        runValidations: true,
      };

      const result = await UserModel.findOneAndUpdate(query, data, option);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not update user!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Update user successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryUsers(params, conditions) {
    try {
      const { limit, start } = conditions;

      const results = await UserModel.find(params)
        .skip(start)
        .limit(limit)
        .select("-password");

      if (!results || results === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get users!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get users successfully!",
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async getOneProduct(_id) {
    try {
      const result = await UserModel.findOne({
        _id,
      }).select("-password");

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get user!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get user successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new UserHandlers();
