const userSchema = require('../models/user-model');
const passport = require('passport');

exports.registerUsers = async (req, res) => {
    try {
        const user = new userSchema({
            username: req.body.username,
            password: req.body.password
        });
        const savedUser = await user.save();

        if (!savedUser) {
            return res.status(400).json({ message: "User not saved" });
        }
        res.status(201).json({ message: "User saved successfully", data: savedUser });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
}

//login user
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Handle server errors
            return res.status(500).json({ message: "Server error", error: err.message });
        }
        if (!user) {
            // Handle authentication failure
            return res.status(401).json({ message: info.message });
        }
        // Successful authentication
        res.status(200).json({
            message: "Login successful!",
            user: {
                id: user._id,
                username: user.username,
            },
        });
    })(req, res, next);
}



// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username, password });
//     if (!user) {
//       return res.status(404).send({ message: "Invalid credentials!" });
//     }
//     res.status(200).send({ message: "Login successful!" });
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// };