const db = require("../db/queries");

const getIndexPage = async (req, res) => {
  const messagesArray = await db.getAllMessagesWithNameArray();
  let isUserMember = false;
  const currentUser = res.locals.currentUser;

  if (currentUser) {
    const isMember = await db.isMember(currentUser.id);
    if (isMember) isUserMember = true;
  }

  console.log("messagesArray", messagesArray);

  res.render("app", {
    messagesArray: messagesArray,
    isUserMember: isUserMember,
  });
};

module.exports = getIndexPage;
