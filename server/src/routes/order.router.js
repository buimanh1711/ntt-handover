const { Router } = require("express");
const { USER, ADMIN } = require("../configs/constants");
const OrderControllers = require("../controllers/order");
const auth = require("../middlewares/auth");
const orderRouter = Router();

orderRouter.get("/", auth(ADMIN), OrderControllers.queryOrders);
orderRouter.get("/:_id", auth(USER), OrderControllers.getOneOrder);

orderRouter.post("/", auth(USER), OrderControllers.createOrder);
orderRouter.put("/:_id", auth(ADMIN), OrderControllers.updateOrder);
orderRouter.delete("/:_id", auth(ADMIN), OrderControllers.removeOrder);

module.exports = orderRouter;
