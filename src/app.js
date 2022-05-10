import cookieParser from 'cookie-parser';
import cors from 'cors';
import csurf from 'csurf';
import express from 'express';
import rateLimit from 'express-rate-limit';
import res from 'express/lib/response';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config';
import logger from './utils/logger';
import primaryRouter from './routes/primaryRouter';

const app = express()

// Make cookies available in the request object
app.use(cookieParser())

// Restrict XMLHttpRequest calls to a specific origin:
app.use(cors(config.corsMiddleware))

// Make json request bodies available in the request object
app.use(express.json())

// Make form data urlencoded request bodies available in the request object
app.use(express.urlencoded({ extended: true }))

// Limit the number of requests coming from a given IP per 10 minutes
app.use(rateLimit(config.rateLimitMiddleware))

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

// Apply error handling last
app.use((_req, res) => {
    return res.status(404).json({ message: 'not found' })
})

app.use((err, _req, res, next) => {
    if (!err?.code) {
        next(err)
    }
    switch(err.code) {
        case 'EBADCSRFTOKEN':
            return res.status(403).json({ message: 'csrf error' })
        default:
            logger.error(err.code)
            next(err)
    }
})

// Respond with 500 and log uncaught errors
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    logger.error(err)
    return res.status(500).json({ message: config.nodeEnv === 'production' ? 'error' : `${err?.code ? err.code : err}` });
})

export default app