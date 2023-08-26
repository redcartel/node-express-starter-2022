import config from '../config';

/**
 * 500 response & log when errors are raised.
 *
 * @param {any} err
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 * @returns
 */

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    return res.status(500).json({
        message: config.nodeEnv === 'production' ?
            'unknown error' :
            `${err}`
    });
}

export default errorHandler