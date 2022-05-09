import express from "express";
import { body } from "express-validator";
import getLogout from "../controllers/user/getLogout";
import getUser from "../controllers/user/getUser";
import postUser from "../controllers/user/postUser";
import withAuth from "../middleware/withAuth";

const user = new express.Router();

user.post('/',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    postUser)

user.get('/',
    withAuth(true),
    getUser
)

user.get('/logout',
    getLogout
)

export default user