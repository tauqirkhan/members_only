const express = require("express");
const app = express();
const path = require("node:path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const indexRouter = require("./routes/indexRouter");
const pool = require("./db/pool");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetPath = path.join(__dirname, "public");
app.use(express.static(assetPath));

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),
    //Equals to 1 week or 7 days
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    name: "session_cookie",
  })
);
app.use(passport.session());
//Data type of req.body will only be string
app.use(express.urlencoded({ extended: false }));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];

      if (!user) return done(null, false, { message: "Incorrect username" });

      //compare later with bcrypt
      const match = password === user.password;

      if (!match) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (error) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    //attach user object to .user property of req as req.user
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use((req, res, next) => {
  console.log("currentUser Name", req.user);
  console.log("req.session", req.session);
  console.log("req.sessionID", req.sessionID);
  next();
});

app.use("/", indexRouter);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "sign-in",
  })
);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`App is live at - http://localhost:${PORT}/`);
});
