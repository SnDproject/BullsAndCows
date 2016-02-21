var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        //db: 'mongodb://localhost:27017/bnc',
        db: 'mongodb://niki:satana1@ds013848.mongolab.com:13848/heroku_d229mdlz',
        port: process.env.PORT || 3001
    },
    production: {
        rootPath: rootPath,
        db: process.env.MONGOLAB_URI,
        port: process.env.PORT || 3001
    }
};
