var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.post('/register', controllers.users.postRegister);

    app.post('/login', auth.login);
    app.get('/logout', auth.logout);

    app.get('/game/:type', controllers.game.newGame);
    app.get('/guess/:code', controllers.game.guess);

    app.get('/stats/globalstats/:type', controllers.stats.getStatistics);
    app.get('/stats/ranking/:type', controllers.stats.getRanking);


    app.get('/profile', auth.isAuthenticated, controllers.users.getProfile);

    app.get('*', function(req, res) {
        res.redirect('/index.html');
    });
};
