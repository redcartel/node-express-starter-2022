import express from 'express';
import config from '../config';
import errors from './errors';
import root from './root';
import user from './user';

const primaryRouter = express.Router();

primaryRouter.use('/', root);
primaryRouter.use('/user', user);

if (config.nodeEnv !== 'production') {
    primaryRouter.use('/errors', errors);
}

export default primaryRouter;