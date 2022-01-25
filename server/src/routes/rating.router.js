const { Router } = require("express");
const { USER } = require("../configs/constants");
const RatingControllers = require("../controllers/rating/index");
const auth = require("../middlewares/auth");
const ratingRouter = Router();

ratingRouter.get("/:product_id", RatingControllers.queryStars);

ratingRouter.post("/", auth(USER), RatingControllers.createRate);

module.exports = ratingRouter;
