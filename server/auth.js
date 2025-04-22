const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user-model");
const bcrypt = require("bcrypt");

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log("Username: ", username)
        const user = await User.findOne({ username: username });
        if (!user) return done(null, false, { message: "User not Found." })
        const isPasswordMatch = comparePassword(user.password, password) ? true : false;
        if (isPasswordMatch) {
            return done(null, user)
        } else {
            return done(null, false, { message: "Incorrect Password" })
        }

    } catch (err) {
        return done(err);
    }
}));

// compare password
function comparePassword(hashPass, userPass){
    return bcrypt.compareSync(userPass, hashPass);
}


module.exports = passport;