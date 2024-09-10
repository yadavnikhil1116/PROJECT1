const User = require('../models/user.js');

module.exports.renderSignUpPage = (req, res) => {
    res.render('users/signUp.ejs');
}

module.exports.SignUp = async (req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err) return next(err);
            req.flash('success', 'Welcome to WanderLust');
            res.redirect('/listings');
        });
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/SignUp');
    }
}

module.exports.renderloginPage = (req, res) => {
    res.render('users/login.ejs');
}

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back to WanderLust');
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) =>{
        if(err) return next(err);
    req.flash('success', 'You are logged out successfully!');
    res.redirect('/listings');
    });
}