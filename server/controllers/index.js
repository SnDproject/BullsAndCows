var UsersController = require('./UsersController'),
    GameController = require('./GameController'),
    StatsController = require('./StatsController'),
    HomeController = require('./HomeController');

module.exports = {
    users: UsersController,
    game: GameController,
    stats: StatsController,
    home: HomeController
};
