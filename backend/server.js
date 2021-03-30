const express = require("express");
const app = express();
app.use(express.json());

const PORT = 8000;

const path = require("path");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const database = low(adapter);
const { nanoid } = require("nanoid");
const idlength = 8;
// database.defaults({ users: [], "planet-votes": [] }).write();

// passport authentication setup
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
app.use(cookieParser());
app.use(
  expressSession({
    secret: "derpy",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 60 * 24 }, // 60000 = 1 minute
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local-login",
  new LocalStrategy(async (username, password, done) => {
    const user = database.get("users").find({ username }).value();

    if (user && (await bcrypt.compare(password, user.hash))) {
      done(null, user, {
        message: "Successful login!",
      });
    } else {
      return done(null, false, {
        message: "Incorrect username or password.",
      });
    }
  })
);

// set what data is included in the cookie to identify the user
// in this case the id
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  try {
    const user = database.get("users").find({ id }).value();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(302).json({
    text: `There was an error during voting on planet.`,
    type: 302,
  });
}

app.use("/", express.static(path.join(__dirname, "../frontend/build")));
app.use("/login", express.static(path.join(__dirname, "../frontend/build")));
app.use("/register", express.static(path.join(__dirname, "../frontend/build")));

app.route("/register").post(async (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;

  const foundUser = database.get("users").find({ username }).value();

  if (!foundUser) {
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = { id: nanoid(idlength), username, hash };

    database.get("users").push(newUser).write();

    res.json({ message: "Successful registration. Log in to continue." });
  } else {
    res.status(401).json({
      message: "Username already exists, please choose another one!",
    });
  }
});

app.route("/vote").post(checkAuthenticated, (req, res) => {
  console.log(req.body);

  const planetName = req.body.planet_name;

  const newPlanet = {
    id: nanoid(10),
    planet_id: planetName,
    planet_name: planetName,
    user_id: 123,
    submission_time: Date.now(),
  };

  database.get("planet-votes").push(newPlanet).write();

  res.json({
    text: `Voted on planet ${planetName} successfully.`,
    type: 200,
  });
});

app.route("/votestat").get((req, res) => {
  const planetdata = database.get("planet-votes").value();
  res.json(planetdata);
});

app.route("/login").post((req, res, next) => {
  console.log(req.body);

  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        message: info.message,
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.json({
        username: req.user.username,
        message: info.message,
      });
    });
  })(req, res, next);
});

app.get("/logout", (req, res) => {
  req.logout();
  res.send("Logout successful");
});

app.get("/session", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user.username);
  } else {
    res.status(401).send("");
  }
});

app.listen(PORT, () => {
  console.log("Express server listening on port ", PORT);
});
