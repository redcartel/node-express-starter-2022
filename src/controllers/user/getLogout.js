import config from '../../config';

/**
 * Log out endpoint
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getLogout = (req, res) => {
    res.clearCookie('authCookie', {
        secure: config.nodeEnv === 'production',
        httpOnly: true
    })
    res.json({ email: null });
}

export default getLogout