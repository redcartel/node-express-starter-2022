import config from '../config';

/**
 * 500 response & log when errors are raised.
 *
 * @param {any} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
const errorHandler = (err, req, res) => {
    console.error(err);
    return res.status(500).json({ 
        message: config.nodeEnv === 'production' ?
            'unknown error' :
            `${err}`
    });
}

export default errorHandler