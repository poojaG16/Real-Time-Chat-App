const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('./../controllers/user-controller')

const localAuthMiddleware = passport.authenticate('local', { session: false })


router.post('/register', UserController.registerUsers);
router.post('/login',localAuthMiddleware, UserController.login);


module.exports = router;