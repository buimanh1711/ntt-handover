const { Router } = require("express");

const noitificationRouter = Router();

noitificationRouter.get("/");
noitificationRouter.get("/:slug");

noitificationRouter.post("/");
noitificationRouter.put("/:_id");

module.exports = noitificationRouter;
