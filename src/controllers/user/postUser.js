import { matchedData } from 'express-validator'
import moment from 'moment';
import config from '../../config';

/**
 * Example login endpoint
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const postUser = (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const { email, password } = matchedData(req, {
        locations: ['body'],
        onlyValidData: true,
    })

    if (!email || !password) {
        return res.status(400).json({message: 'bad request'})
    }

    if (!config.adminUsername || email !== config.adminUsername || !config.adminPassword || password !== config.adminPassword) {
        res.clearCookie('authCookie', {
            secure: config.nodeEnv === 'production',
            httpOnly: true
        })
        return res.status(200).json({ token: null, message: 'bad username or password' });
    }
    else {
        res.cookie('authCookie', config.authCookie, {
            secure: config.nodeEnv === 'production',
            httpOnly: true,
            expires: moment().add(30, 'd').toDate()
        })
        return res.status(200).json({ token: config.sessionToken, message: `logged in as ${config.adminUsername}` });
    }
}

export default postUser