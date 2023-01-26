const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');

const Donor = require('../models/donor.model');
const Patient = require('../models/patient.model');
const config = require('./config');

const localLogin = new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  let user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
    return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
  }
  user = user.toObject();
  delete user.hashedPassword;
  done(null, user);
});

const jwtLogin = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}, async (payload, done) => {
  console.log("Line 26", payload);
  let user
  if( payload.user.user_type === 'patient') {
    user = await Patient.findById(payload.user._id);
  } else {
    user = await Donor.findById(payload.user._id);
  }
  if (!user) {
    return done(null, false);
  }
  user = user.toObject();
  delete user.hashedPassword;
  done(null, user);
});

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = passport;
