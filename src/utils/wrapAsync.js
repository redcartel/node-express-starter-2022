import config from '../config';
import logger from './logger';
/**
 * @callback asyncHandler
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise}
 */

/**
 * Wrap an async controller in to handle rejected promises
 * @param {asyncHandler} controller
 */
const wrapAsync = (controller) => {
    return (req, res, next) => {
        controller(req, res, next).catch(e => {
            logger.error(`promise rejection`);
            logger.error(e);
            /* istanbul ignore next */
            res.status(500).json({message: config.nodeEnv === 'production' ? 'error' : `promise rejection ${e}`});
        })
    }
};

export default wrapAsync;