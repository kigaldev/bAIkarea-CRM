const winston = require("winston");
const path = require("path");

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
);

// Create logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: logFormat,
  defaultMeta: { service: "bikearea-crm" },
  transports: [
    // Write logs to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
    }),
    // Write logs to file
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/combined.log"),
    }),
  ],
  // Create logs directory if it doesn't exist
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/exceptions.log"),
    }),
  ],
});

module.exports = { logger };
