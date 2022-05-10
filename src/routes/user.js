import csurf from "csurf";
import express from "express";
import { body } from "express-validator";
import config from "../config";
import getLogout from "../controllers/user/getLogout";
import getUser from "../controllers/user/getUser";
import postUser from "../controllers/user/postUser";
import withAuth from "../middleware/withAuth";

const user = express.Router();

user.post('/',
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 5 }),
    csurf(config.csurfMiddleware),
    postUser)

user.get('/',
    withAuth(true),
    getUser
)

user.get('/logout',
    getLogout
)

export default user