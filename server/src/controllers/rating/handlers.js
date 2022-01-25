const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const RatingModel = require("../../models/rating.model");
const _ = require("lodash");

class RatingHandlers {
  async createRate(data) {
    try {
      const result = await RatingModel.create(data);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not create rate!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Create rate successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryStars(params) {
    try {
      const { product_id } = params;

      const results = await RatingModel.find({
        product_id,
      }).select("stars");

      if (!results || results === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get ratings!"),
        };

      const count = results.length;
      const avg = _.sumBy(results, (rate) => rate.stars) / results.length;
      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get ratings successfully!",
          data: {
            total: count,
            star: avg,
          },
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new RatingHandlers();
