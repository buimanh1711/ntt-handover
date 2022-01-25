const { Router } = require("express");
const { SUPER, USER, ADMIN } = require("../configs/constants");
const UserControllers = require("../controllers/user/index");
const auth = require("../middlewares/auth");
const userRouter = Router();

userRouter.get("/:_id", UserControllers.getOneUser);
userRouter.get("/", auth(ADMIN), UserControllers.queryUsers);

userRouter.put("/:_id", auth(USER), UserControllers.updateUser);
userRouter.post("/admin", auth(SUPER), UserControllers.createAdmin);
userRouter.post("/", UserControllers.createUser);

module.exports = userRouter;
