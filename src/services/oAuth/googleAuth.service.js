const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const google = require("../../config/oAuth/googleAuth");

passport.use(
  new GoogleStrategy(
    {
      ...google,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
