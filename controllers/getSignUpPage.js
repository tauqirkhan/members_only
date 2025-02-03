const getSignUpPage = async (req, res) => {
  if (req.isAuthenticated()) res.redirect("/");
  else res.render("sign-up");
};

module.exports = getSignUpPage;
