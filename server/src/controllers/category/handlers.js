const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const CategoryModel = require("../../models/category.model");
class BrandHandlers {
  async createCategory(data) {
    try {
      const result = await CategoryModel.create(data);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not create category!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Create category successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateCategory(_id, newData) {
    try {
      const query = { _id };
      const data = newData;
      const option = {
        new: true,
        runValidations: true,
      };

      const result = await CategoryModel.findOneAndUpdate(query, data, option);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not update category!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Update category successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeCategory(_id) {
    try {
      const result = await CategoryModel.deleteOne({ _id });

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not remove category!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Remove category successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryCategories(params) {
    try {
      const { limit, start, search } = params;
      const query = {
        ...params,
      };

      if (search?.trim()) query.$text = { $search: search };

      const results = await CategoryModel.find(query);
      // .skip(start).limit(limit);

      if (!results || results === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get categories!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get categories successfully!",
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new BrandHandlers();
