var passport = require('passport');

module.exports = {
    login: function(req, res, next) {
        console.log(req.body.username);
        var auth = passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) {
                res.send({success: false}); // TODO:
            }

            req.logIn(user, function(err) {
                if (err) return next(err);
                var userData = {
                    email: user.email,
                    testData: 'TestString'
                }
                res.send(userData); // TODO:
            })
        });

        auth(req, res, next);
    },
    logout: function(req, res, next) {
        req.logout();
        res.json({status: 'success'});
    },
    isAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.json({error: 'Not authorized!'});
        }
        else {
            next();
        }
    }
};
