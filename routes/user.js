const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const passport = require('passport');
const {saveRedirectUrl} = require('../middleware.js');
const userController = require('../controllers/users.js');

router.route("/signUp")
    .get(userController.renderSignUpPage)
    .post(wrapAsync(userController.SignUp));

router.route("/login")
    .get(userController.renderloginPage)
    .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), wrapAsync(userController.login));

router.get('/logout', userController.logout);

module.exports = router;