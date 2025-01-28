const { Router } = require("express");
const getIndexPage = require("../controllers/getIndexPage");
const getSignUpPage = require("../controllers/getSignUpPage");
const postMembership = require("../controllers/postMembership");
const postSignUp = require("../controllers/postSignUp");

const indexRouter = Router();

indexRouter.get(["/", "home", "index"], getIndexPage);
indexRouter.get("/sign-up", getSignUpPage);

indexRouter.post("/sign-up", postSignUp);
// indexRouter.post("/membership", postMembership);

module.exports = indexRouter;
