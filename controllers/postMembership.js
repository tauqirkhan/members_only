const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validator = [body("")];

require("dotenv").config();

const postMembership = async (req, res) => {
  const { membershipAnswer } = req.body;

  if (res.locals.currentUser) {
    const currentUserId = res.locals.currentUser.id;

    if (membershipAnswer === process.env.MEMBERSHIPANSWER) {
      const isMember = await db.isMember(Number(currentUserId));
      if (!isMember) await db.insertMember(Number(currentUserId));
    } else {
      req.session.memberShipError = "Enter correct answer";
      return res.status(400).redirect("/");
    }
  }
  res.redirect("/");
};

module.exports = postMembership;
