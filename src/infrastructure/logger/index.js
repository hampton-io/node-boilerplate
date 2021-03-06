'use strict';

const winston = require('winston');
const config = require('./../config');
const WinstonSequelizeTransport = require('authbox.audit.winston-sequelize-transport');

const logLevel = (config && config.loggerSettings && config.loggerSettings.logLevel) ? config.loggerSettings.logLevel : 'info';

const loggerConfig = {
  levels: {
    audit: 0,
    error: 1,
    warn: 2,
    info: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: (config && config.loggerSettings && config.loggerSettings.colors) ? config.loggerSettings.colors : null,
  transports: [],
};

loggerConfig.transports.push(new (winston.transports.Console)({level: logLevel, colorize: true}));

const sequelizeTransport = WinstonSequelizeTransport(config);
if (sequelizeTransport) {
  loggerConfig.transports.push(sequelizeTransport);
}

const logger = new (winston.Logger)(loggerConfig);

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at:', p, 'reason:', reason);
});

module.exports = logger;
