const errorHandler = (config, logger) => (err, req, res, next) => {
  const errorMessage = err instanceof Error ? err.message : err;
  logger.error(`Error occurred processing ${req.method} ${req.url}: ${errorMessage}`, {
    url: req.url,
    method: req.method,
    error: err,
  });
  if (res.headersSent) {
    return next(err);
  }

  const content = config.hostingEnvironment.env === 'dev' ? errorMessage : null;
  res.status(500);
  return res.send(content);
};

module.exports = errorHandler;
