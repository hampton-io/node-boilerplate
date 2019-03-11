const healthCheck = require('login.dfe.healthcheck');

const example = require('./example');


const mountRoutes = (app, config) => {
  app.use('/healthcheck', healthCheck({
    config,
  }));

  app.use('/', example.home);
};


module.exports = {
  mountRoutes
};
