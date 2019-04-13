const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportConfig = require("./config/passport");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const github = require("./routes/services/auth.github");
const google = require("./routes/services/auth.google");
const app = express();
const upload = require("./routes/services/upload");
// const ejs = require("ejs");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.set("view engine", ejs);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());
// app.use(passport.session());

// Passport Config
passportConfig.passportGoogle(passport);
passportConfig.passportGithub(passport);
passportConfig.passportJwt(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/services", upload);
app.use("/auth/github", github);
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
