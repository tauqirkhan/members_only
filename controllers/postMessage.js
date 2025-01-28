const db = require("../db/queries");

const postMessage = async (req, res) => {
  const { messageTitle, messageText } = req.body;

  if (res.locals.currentUser) {
    const currentUserId = res.locals.currentUser.id;
    await db.insertMessage(currentUserId, messageTitle, messageText);
    res.redirect("/");
    return;
  }

  //need throw and handle error
  res.redirect("/");
};

module.exports = postMessage;
