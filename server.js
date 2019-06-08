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
const path = require("path");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true });
let mongo = mongoose.connection;
mongo.on('error', console.error.bind(console, 'connection error:'));
mongo.once('open',function(){
  console.log("We are connected")
})

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

app.set("view engine", "ejs");
// Server static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
// }

// app.use(express.static(path.resolve(__dirname, "client", "build")));
// if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build')); 
  app.use('*', express.static('client/build')); // Added this     
// }
// app.get("*", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

const port = process.env.PORT || 8080;

app.listen(8080, () => console.log(`Server running on port ${port}`));
