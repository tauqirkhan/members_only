const db = require("../db/queries");
const bcrypt = require("bcrypt");

const postSignUp = async (req, res, next) => {
  try {
    const { username, fullname, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 17);
    await db.insertUser(username, fullname, hashedPassword);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = postSignUp;
