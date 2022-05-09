import express from 'express';
import getError from '../controllers/errors/getError';
import getRejection from '../controllers/errors/getRejection';
import wrapAsync from '../utils/wrapAsync';

const errors = express.Router();
errors.get('/', getError);
errors.get('/rejection', wrapAsync(getRejection));

export default errors;