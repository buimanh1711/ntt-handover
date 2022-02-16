const productRouter = require("./product.router");
const categoryRouter = require("./category.router");
const brandRouter = require("./brand.router");
const commentRouter = require("./comment.router");
const ratingRouter = require("./rating.router");
const cartRouter = require("./cart.router");
const orderRouter = require("./order.router");
const orderItemRouter = require("./order_item.router");
const userRouter = require("./user.router");
const SignControllers = require("../controllers/sign/index");
const noitificationRouter = require("./notification.rourter");

const ENDPOINT = process.env.API_ENDPOINT || "/api/v1";

const routes = (app) => {
  app.use(`${ENDPOINT}/notifications`, noitificationRouter);
  app.use(`${ENDPOINT}/order-items`, orderItemRouter);
  app.use(`${ENDPOINT}/orders`, orderRouter);
  app.use(`${ENDPOINT}/cart-items`, cartRouter);
  app.use(`${ENDPOINT}/ratings`, ratingRouter);
  app.use(`${ENDPOINT}/comments`, commentRouter);
  app.use(`${ENDPOINT}/products`, productRouter);
  app.use(`${ENDPOINT}/categories`, categoryRouter);
  app.use(`${ENDPOINT}/brands`, brandRouter);
  app.use(`${ENDPOINT}/users`, userRouter);
  app.post(`${ENDPOINT}/sign-in`, SignControllers.login);
  app.get(`${ENDPOINT}/verify/:access_token`, SignControllers.verify);
};

module.exports = routes;
