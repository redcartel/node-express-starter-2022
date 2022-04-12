import express from 'express';
import getRoot from '../controllers/root/getRoot.js';

const root = express.Router();

root.get('/', getRoot);

export default root;