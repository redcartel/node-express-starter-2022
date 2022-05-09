import { validationResult } from 'express-validator'
import moment from 'moment';
import config from '../../config';

/**
 * Example login endpoint
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const postUser = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'bad request' });
    }

    // eslint-disable-next-line no-unused-vars
    const { email, password } = req.body

    if (!config.adminUsername || email !== config.adminUsername || !config.adminPassword || password !== config.adminPassword) {
        res.clearCookie('authCookie', {
            secure: config.nodeEnv === 'production',
            domain: config.origin,
            httpOnly: true
        })
        return res.status(200).json({ token: null, message: 'bad username or password' });
    }
    else {
        res.cookie('authCookie', config.authCookie, {
            secure: config.nodeEnv === 'production',
            httpOnly: true,
            domain: config.origin,
            expires: moment().add(30, 'd').toDate()
        })
        return res.status(200).json({ token: config.sessionToken, message: `logged in as ${config.adminUsername}` });
    }
}

export default postUser