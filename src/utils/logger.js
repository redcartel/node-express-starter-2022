import winston from 'winston';
import 'winston-daily-rotate-file';

const format = winston.format.combine(
        winston.format.colorize(), 
        winston.format.errors({ stack: true }), 
        winston.format.timestamp(), 
        winston.format.printf(({ level, message, timestamp, stack }) => {
    if (stack) {
        // print log trace 
        return `${level} ${timestamp}: ${message} - ${stack}`;
    }
    return `${level} ${timestamp}: ${message}`;
}))

var logger = winston.createLogger({
    format: format,
    transports: [
        new winston.transports.File({
            level: 'warn',
            filename: './logs/error.log',
            format: winston.format.uncolorize(),
            maxsize: 2097152, //20MB
        }),
        new winston.transports.DailyRotateFile({
            level: 'http',
            filename: './logs/http-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            format: winston.format.uncolorize(),
            maxSize: '20m',
            maxFiles: '14d',
        }),
        new winston.transports.Console({
            level: 'debug',
        })
    ],
    exitOnError: false
});

export default logger;