const statusMonitor = require('express-status-monitor')();

const example = require('./example');


const mountRoutes = (app, config) => {
  app.use(statusMonitor);

  app.get('/status', statusMonitor.pageRoute)

  app.get('/', example.home);
};


module.exports = {
  mountRoutes
};
