'use-strict';

var mongoose = require('mongoose'),
    config = require('../../config/').config,
    logger = config.logger;

mongoose.set('debug', (typeof config.database.debug !== undefined) ? config.database.debug : false);

mongoose.Promise = global.Promise; // Fix for error : Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html

/**
 * @description Connecting the mongodb
 */
var connect = function(){
    mongoose.connect(config.database.mongodb.dbURI, function(err) {
        if (err){
            logger.error('MongoDB connection error: ' + err);
            console.log('MongoDB connection error: ' + err);
            process.exit(1);
        }
    });
    return mongoose;
}

mongoose.connection.on('connected', function() {
    logger.info('MongoDB event connected');
    console.log('MongoDB event connected : '+config.database.mongodb.dbURI);
});

mongoose.connection.once('open', function() {
    logger.info('MongoDB event open');
    logger.debug('MongoDB connected [%s]', config.database.mongodb.dbURI);

    mongoose.connection.on('disconnected', function() {
        logger.warn('MongoDB event disconnected');
        console.log('MongoDB event disconnected : '+config.database.mongodb.dbURI);
    });

    mongoose.connection.on('disconnect', function(err) {
        console.log('Mongoose disconnect', err);
    });

    mongoose.connection.on('reconnected', function() {
        logger.info('MongoDB event reconnected');
    });

    mongoose.connection.on('error', function(err) {
        logger.error('MongoDB event error: ' + err);
    });

    mongoose.connection.on('parseError', function(err) {
        logger.error('Mongoose parseError:', err);
    });
});

mongoose.connection.on('timeout', function(err) {
    console.log('Mongoose timeout', err);
});

var gracefulExit = function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection with DB :' + config.database.mongodb.dbURI + ' is disconnected through app termination');
    process.exit(0);
  });
}
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit);//.on('SIGTERM', gracefulExit);

module.exports = {
  init: function() {
      return connect();
  },
  mongoose
}
