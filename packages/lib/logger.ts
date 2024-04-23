import winston from 'winston';
const { combine, timestamp, json, align, printf } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'debug',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSSZ',
    }),
    align(),
    printf((info) => {
      const { timestamp, level, message, ...args } = info;

      return `${timestamp} ${level}: ${message} ${
        Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
      }`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      dirname: 'logs',
      filename: 'app.log',
    }),
  ],
});

export { logger };
