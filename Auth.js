const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const Users = [];

passport.use(
  new localStrategy((username, password, done) => {
    try {
      const user = Users.find((user) => user.username == username);
      if (!user) {
        return done(null, false, { message: "invalid username" });
      }
      if (user.password != password) {
        return done(null, false, { message: "incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      console.log(error);
    }
  })
);

module.exports = { passport, Users };
