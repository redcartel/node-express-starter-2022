import config from '../../config';
import moment from 'moment';

/**
 * Log in endpoint
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getLogout = (req, res) => {
    res.clearCookie('authCookie', {
        secure: config.nodeEnv === 'production',
        httpOnly: true,
        domain: config.origin
    })
    res.json({ email: null });
}

export default getLogout