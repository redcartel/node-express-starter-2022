import csurf from 'csurf';
import express from 'express';
import config from '../config';
import getCSRF from '../controllers/csrf/getCSRF';
import data from './data';
import errors from './errors';
import root from './root';
import user from './user';

const primaryRouter = express.Router()

primaryRouter.use('/', root)
primaryRouter.use('/user', user)
primaryRouter.use('/data', data)

primaryRouter.get('/csrf', csurf(config.csurfMiddleware), getCSRF)

/* istanbul ignore next */
if (config.nodeEnv !== 'production') {
    primaryRouter.use('/errors', errors)
}

export default primaryRouter