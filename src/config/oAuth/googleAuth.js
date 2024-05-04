const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID =
  "328888175047-hlgc0hacauml5t0fnedj0thq19mjqjgo.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const google = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
};

module.exports = google;
