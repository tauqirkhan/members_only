const db = require("../db/queries");

const getIndexPage = async (req, res) => {
  const messagesArray = await db.getAllMessagesWithNameArray();

  res.render("app", {
    messagesArray: messagesArray,
    user: req.user,
  });
};

module.exports = getIndexPage;
