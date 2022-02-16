const { Router } = require("express");
const NotificationControllers = require("../controllers/notification");

const noitificationRouter = Router();

noitificationRouter.get(
  "/:user_id",
  NotificationControllers.queryUserNotifications
);
noitificationRouter.get("/", NotificationControllers.queryAllNotifications);

module.exports = noitificationRouter;
