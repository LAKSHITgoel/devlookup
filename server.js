const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportConfig = require("./config/passport");
//const dotenv = require("dotenv");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const github = require("./routes/services/auth.github");
// const linkedin = require("./routes/services/auth.linkedin");
const google = require("./routes/services/auth.google");
const keys = require("./config/keys");
const app = express();
// const ejs = require("ejs");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.set("view engine", ejs);

// Passport Config
require("./config/passport")(passport);
// require("./routes/services/caching");

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(
  cookieSession({
    expiry: 7 * 24 * 60 * 60 * 1000,
    secret: [keys.secretOrKey]
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
passportConfig.passportGoogle(passport);
// passportConfig.passportLinkedIn(passport);
passportConfig.passportGithub(passport);
passportConfig.passportJwt(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/auth/github", github);
// app.use("/auth/linkedin", linkedin);
app.use("/auth/google", google);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
}
// app.use(express.static("client/build"));
app.get("/", (req, res) => {
  res.send("api is working");
});

app.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.send("fuck");
});

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

const port = process.env.PORT || 8080;

app.listen(8080, () => console.log(`Server running on port ${port}`));
