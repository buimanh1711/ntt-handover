const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const ProductModel = require("../../models/product.model");
require("../../models/category.model");
require("../../models/brand.model");
class ProductHandlers {
  async createProduct(data) {
    try {
      const result = await ProductModel.create(data);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not create product!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Create product successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateProduct(_id, newData) {
    try {
      const query = { _id };
      const data = newData;
      const option = {
        new: true,
        runValidations: true,
      };

      const result = await ProductModel.findOneAndUpdate(query, data, option);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not update product!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Update product successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeProduct(_id) {
    try {
      const result = await ProductModel.deleteOne({ _id });

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not remove product!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Remove product successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryProducts(params, conditions) {
    try {
      const { limit, start, min_price, max_price, search } = conditions;
      const query = {
        ...params,
        categories: { $all: params.categories },
        price: {
          $gte: min_price || 0,
          $lte: max_price || 10000000000000000,
        },
      };
      if (search?.trim()) query.$text = { $search: search };

      const results = await ProductModel.find(query)
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
          response: new HttpException(400, "Can not get products!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get products successfully!",
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async getOneProduct(slug) {
    try {
      const result = await ProductModel.findOne({
        slug,
      })
        .populate({
          path: "category",
          model: "category_model",
          select: "name slug image_url",
        })
        .populate({
          path: "brand",
          model: "brand_model",
          select: "name slug image_url",
        });

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get product!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get product successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new ProductHandlers();
