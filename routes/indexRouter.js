const { Router } = require("express");
const getIndexPage = require("../controllers/getIndexPage");
const getSignUpPage = require("../controllers/getSignUpPage");

const indexRouter = Router();

indexRouter.get(["/", "home", "index"], getIndexPage);
// indexRouter.get("/sign-up", getSignUpPage);

// indexRouter.post("/login", postLogin);
// indexRouter.post("/membership", postMembership);

module.exports = indexRouter;
