const DTO = require("./DTO");
const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const RatingHandlers = require("./handlers");
const { ERROR } = require("../../configs/constants");

class RatingControllers {
  async createRate(req, res, next) {
    try {
      const data = DTO.createRate(req.body);
      const response = await RatingHandlers.createRate(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryStars(req, res, next) {
    try {
      const params = DTO.queryStars(req.params);
      const response = await RatingHandlers.queryStars(params);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new RatingControllers();
