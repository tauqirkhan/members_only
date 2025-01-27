const db = require("../db/queries");

const getIndexPage = async (req, res) => {
  const messagesArray = await db.getAllMessagesWithNameArray();

  res.render("app", {
    messagesArray: messagesArray,
  });
};

module.exports = getIndexPage;
