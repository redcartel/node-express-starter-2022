import express from 'express';
import root from './root';

const primaryRouter = express.Router();

primaryRouter.use('/', root);

export default primaryRouter;