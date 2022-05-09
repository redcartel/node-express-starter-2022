import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config';
import logger from './logger';
import primaryRouter from './routes/primaryRouter';

const app = express()

// Make cookies available in the request object
app.use(cookieParser())

// Restrict XMLHttpRequest calls to a specific origin:
app.use(cors({
    origin: config.nodeEnv === 'production' ? config.origin : '*'
}))

// Make json request bodies available in the request object
app.use(express.json())

// Make form data urlencoded request bodies available in the request object
app.use(express.urlencoded({ extended: true }))

// Limit the number of requests coming from a given IP per 10 minutes
app.use(rateLimit({
    windowMs: 10 * 60 * 1000,
    max: config.requestMax,
    standardHeaders: true,
    legacyHeaders: false
}))

// Set a bunch of security response headers and turn off some dumb default behavior:
app.use(helmet())

// Request logging:
app.use(morgan('short', {
    stream: {
        write: (message) => logger.http(message.replace('\n', ''))
    }
}))

// Apply all routes to primaryRouter in routes/primaryRouter.js
app.use('/', primaryRouter)

// A route to test error handling
if (config.nodeEnv !== 'production') {
    app.use('/error', () => {
        logger.info('throwing test error...')
        throw new Error('test error');
    });
}

// Apply error handling last
app.use((_req, res) => {
    return res.status(404).json({ message: 'not found'})
})

// Respond with 500 and log uncaught errors
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    logger.error(err);
    return res.status(500).json({ message: config.nodeEnv === 'production' ? 'error' : `${err}`});
})

export default app