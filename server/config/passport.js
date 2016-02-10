var passport = require('passport'),
    LocalPassport = require('passport-local'),
    User = require('mongoose').model('User');

module.exports = function() {

    passport.use(new LocalPassport({passReqToCallback: true},
        function(req, email, password, done) {

        var username = req.body.username,
            password = req.body.password;

        User.findOne({ email: username }).exec(function(err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }

            if (user && user.authenticate(password)) {
                console.log(user);
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    }));

    passport.serializeUser(function(user, done) {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({_id: id}).exec(function(err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }

            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    });
};
