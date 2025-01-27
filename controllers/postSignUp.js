const db = require("../db/queries");

const postSignUp = async (req, res) => {
  const { username, fullname, password } = req.body;
  await db.insertUser(username, fullname, password);

  res.redirect("/");
};

module.exports = postSignUp;
