/**
 * @callback asyncHandler
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise}
 */

import config from '../config';
import logger from '../logger';

/**
 * Example authentication middleware
 * @param {boolean} required 
 * @returns {asyncHandler}
 */
const withAuth = (required) => {
    return async (req, res, next) => {
        const token = req.headers.authorization;
        const user = {
            email: null
        }

        if (req.cookies &&
            req.cookies.authCookie &&
            req.cookies.authCookie === config.authCookie &&
            token &&
            (token.slice(7, token.length) === config.sessionToken ||
                token.slice(7, token.length) === config.oldSessionToken)) {
            user.email = config.adminUsername;
            user.token = config.sessionToken
        }

        if (required && !user.email) {
            return res.status(401).json({ message: 'unauthorized' })
        }

        req.user = user;
        next();
    }
}

export default withAuth