const { Router } = require("express");

const configRouter = Router();

configRouter.get("/");
configRouter.get("/:slug");

configRouter.put("/:_id");

module.exports = configRouter;
