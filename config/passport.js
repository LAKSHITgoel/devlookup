const JwtStrategy = require("passport-jwt").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const Profile = require("../models/Profile");
const keys = require("../config/keys");
const passport = require("passport");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id).then(user => {
    done(null, user);
  });
});

module.exports = {
  passportGoogle: function(passport) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: keys.googleClientID,
          clientSecret: keys.googleClientSecret,
          callbackURL: "http://localhost:8080/auth/google/callback",
          passReqToCallback: true
        },
        function(request, accessToken, refreshToken, profile, done) {
          User.findOne({
            providername: "google",
            providerId: profile.id,
            email: profile.email
          }).then(currentUser => {
            if (currentUser) {
              // console.log("user already exists", currentUser);
              done(null, currentUser);
            } else {
              let newUser = {};
              let newProfile = {};

              newUser.providername = "google";
              newUser.providerId = profile.id;
              newUser.email = profile.email;
              newUser.name = profile.displayName;
              newUser.avatar = profile.picture;

              newProfile.handle = profile.given_name;
              newProfile.company = "";
              newProfile.website = "";
              newProfile.location = "";
              newProfile.status = "";
              newProfile.skills = [];
              newProfile.bio = "";
              newProfile.githubusername = "";
              newProfile.experience = [
                {
                  title: "",
                  company: "",
                  location: "",
                  from: "",
                  to: "",
                  description: ""
                }
              ];
              newProfile.education = [
                {
                  school: "",
                  degree: "",
                  fieldoofstudy: "",
                  from: "",
                  to: "",
                  description: ""
                }
              ];

              new User(newUser)
                .save()
                .then(newUser => {
                  console.log("new Google User Created");
                  if (newUser.id) {
                    newProfile.user = newUser.id;
                    new Profile(newProfile)
                      .save()
                      .then(np => console.log("new Google Profile created"))
                      .catch(err =>
                        console.log("Error in creatng Google profile :", err)
                      );
                  }
                  done(null, newUser);
                })
                .catch(err =>
                  console.log("Error in creating Google User :", err)
                );
            }
          });
        }
      )
    );
  },

  // passportLinkedIn: function(passport) {
  //   passport.use(
  //     new LinkedInStrategy(
  //       {
  //         clientID: keys.linkedinClientID,
  //         clientSecret: keys.linkedinClientSecret,
  //         callbackURL: "http://localhost:8080/auth/linkedin/callback",
  //         scope: ["r_liteprofile"],
  //         state: true,
  //         passReqToCallback: true
  //       },
  //       function(request, accessToken, refreshToken, profile, done) {
  //         process.nextTick(function() {
  // console.log("request", request);
  // console.log("AT", accessToken);
  // console.log("RT", refreshToken);
  // console.log(
  //             "linkedin profile=======================================================================",
  //             profile
  //           );
  //           return done(null, profile);
  //         });
  //       }
  //     )
  //   );
  // },

  passportGithub: function(passport) {
    passport.use(
      new GithubStrategy(
        {
          clientID: keys.githubClientID,
          clientSecret: keys.githubClientSecret,
          callbackURL: "http://localhost:8080/auth/github/callback",
          scope: ["user:email"]
        },
        function(request, accessToken, refreshToken, profile, done) {
          // console.log(
          //   "=========================================GITHUB================================",
          //   profile
          // );

          // find or create a new user

          let queryObj =
            profile.emails[0].value !== undefined
              ? {
                  providername: "github",
                  providerId: profile.id,
                  email: profile.emails[0].value
                }
              : { providername: "github", providerId: profile.id };

          User.findOne(queryObj).then(currentUser => {
            if (currentUser) {
              //if existing user do nothing
              // console.log("existing User", currentUser);
              done(null, currentUser);
            } else {
              // create new User Object and its profile

              let newUser = {};
              let newProfile = {};

              newUser.providername = "github";
              newUser.providerId = profile.id;
              newUser.name = profile.displayName;
              newUser.avatar =
                profile._json.avatar_url !== undefined
                  ? profile._json.avatar_url
                  : "";
              newUser.email =
                profile.emails[0].value !== undefined
                  ? profile.emails[0].value
                  : "";

              newProfile.handle = profile.username;
              newProfile.status = "";
              newProfile.company =
                profile._json.company !== undefined
                  ? profile._json.company
                  : "";
              newProfile.website =
                profile._json.blog !== undefined ? profile._json.blog : "";
              newProfile.location =
                profile._json.location !== undefined
                  ? profile._json.location
                  : "";
              newProfile.bio =
                profile._json.bio !== undefined ? profile._json.bio : "";
              newProfile.githubusername = profile.username;
              newProfile.experience = [
                {
                  title: "",
                  company: "",
                  location: "",
                  from: "",
                  to: "",
                  description: ""
                }
              ];
              newProfile.education = [
                {
                  school: "",
                  degree: "",
                  fieldoofstudy: "",
                  from: "",
                  to: "",
                  description: ""
                }
              ];

              new User(newUser)
                .save()
                .then(newUser => {
                  console.log("newUser github Created");
                  if (newUser.id) {
                    newProfile.user = newUser.id;
                    new Profile(newProfile)
                      .save()
                      .then(np => console.log("newProfile Github Created"))
                      .catch(err =>
                        console.log("Error in Creating Github Profile : ", err)
                      );
                  }
                  done(null, newUser);
                })
                .catch(err =>
                  console.log("Error in creating Github User: ", err)
                );
            }
          });
        }
      )
    );
  },

  passportJwt: function(passport) {
    passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id).then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log("Error in creating devLookup user",err));
      })
    );
  }
};
