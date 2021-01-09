const { createLogger } = require('./logger/logger');
const { createServer } = require('./server');

const config = {
  host:     process.env.HOST || 'localhost',
  port:     parseInt(process.env.PORT || '8080', 10),
  logLevel: process.env.LOG_LEVEL || 'debug'
};

const logger = createLogger(config.logLevel);
const server = createServer({ logger });

server.listen(config.port, err => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }

  logger.info(`Server running at http://${config.host}:${config.port}`);
});
