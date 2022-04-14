import config from "src/config.js"

/**
 * Return 500 when errors are raised.
 *
 * @param {any} err
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns
 */
const errorHandler = (err, req, res) => {
    console.error(err);
    if (config.nodeEnv === 'production') {
        return res.status(500).json({message: 'unknown error'});
    }
    else {
        return res.status(500).json({message: `${err}`});
    }
}

export default errorHandler