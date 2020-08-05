const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const logger = require('./infrastructure/logger');
const https = require('https');
const path = require('path');
const config = require('./infrastructure/config');
const helmet = require('helmet');
const sanitization = require('authbox.sanitization');

const { errorHandler } = require('./infrastructure/utils');
const web  = require('./app/web');
const app = express();
app.use(helmet({
  noCache: true,
  frameguard: {
    action: 'deny',
  },
}));

if (config.hostingEnvironment.env !== 'dev') {
  app.set('trust proxy', 1);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(sanitization());
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'app/web/views'));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');



web.mountRoutes(app, config);


// Error handing
app.use(errorHandler(config, logger));

const port = config.hostingEnvironment.port || process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`${config.loggerSettings.applicationName} Server listening on http://localhost:${port}`);
});
