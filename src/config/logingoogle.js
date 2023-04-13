const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const loginwithgoogle = (app)=>{
    app.use(passport.initialize());
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CLIENT_HOST + "/auths/google/callback"
    },
        async function (accessToken, refreshToken, profile, cb) {
            const { provider, _raw, _json, ...user } = profile;
            return cb(null, user);
        }
    ));
}

module.exports = loginwithgoogle;