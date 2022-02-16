const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const BrandModel = require("../../models/brand.model");

class BrandHandlers {
  async createBrand(data) {
    try {
      const result = await BrandModel.create(data);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not create brand!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Create brand successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateBrand(_id, newData) {
    try {
      const query = { _id };
      const data = newData;
      const option = {
        new: true,
        runValidations: true,
      };

      const result = await BrandModel.findOneAndUpdate(query, data, option);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not update brand!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Update brand successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeBrand(_id) {
    try {
      const result = await BrandModel.deleteOne({ _id });

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not remove brand!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Remove brand successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryBrands(params) {
    try {
      const { limit, start, search } = params;
      const query = {
        ...params,
      };

      if (search?.trim()) query.$text = { $search: search };

      const results = await BrandModel.find(query);
      // .skip(start).limit(limit);

      if (!results || results === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get brand!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get brands successfully!",
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new BrandHandlers();
