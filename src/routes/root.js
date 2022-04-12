import express from 'express';
import getRoot from '../controllers/getRoot.js';

const root = express.Router();

root.get('/', getRoot);

export default root;