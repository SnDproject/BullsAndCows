var encryption = require('../utilities/encryption');
var users = require('../data/users');

var CONTROLLER_NAME = 'users';

module.exports = {

    postRegister: function(req, res, next) {
        var newUserData = req.body;

        if (newUserData.password != newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match!';
            res.redirect('/register');
        }
        else {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            users.create(newUserData, function(err, user) {
                if (err) {
                    console.log('Failed to register new user: ' + err);
                    return;
                }

                req.logIn(user, function(err) {
                    if (err) {
                        res.status(400);
                        return res.send({reason: err.toString()}); // TODO:
                    }
                    else {
                        res.status(200);
                        res.redirect('/login');
                    }
                })
            });
        }
    },
    getProfile: function(req, res){
        var user = req.user;
        res.render(CONTROLLER_NAME + '/details', {user: user});
    }
};
