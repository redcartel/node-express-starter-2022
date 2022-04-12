import express from 'express';
import getRoot from '../controllers/root/getRoot.js';
import postRoot from '../controllers/root/postRoot.js';

const root = express.Router();

root.get('/', getRoot);
root.post('/', postRoot);

export default root;