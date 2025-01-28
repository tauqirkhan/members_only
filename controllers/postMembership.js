const db = require("../db/queries");

require("dotenv").config();

const postMembership = async (req, res) => {
  const { membershipAnswer } = req.body;

  if (res.locals.currentUser) {
    const currentUserId = res.locals.currentUser.id;

    if (membershipAnswer === process.env.MEMBERSHIPANSWER) {
      const isMember = await db.isMember(Number(currentUserId));
      if (!isMember) await db.insertMember(Number(currentUserId));
    }
  }
  res.redirect("/");
};

module.exports = postMembership;
