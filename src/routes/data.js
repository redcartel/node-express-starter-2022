import csurf from "csurf";
import express from "express";
import { body } from "express-validator";
import config from "../config";
import getCount from "../controllers/siteData/getCount";
import postCount from "../controllers/siteData/postCount";
import getSiteData from "../controllers/siteData/getSiteData";
import postSiteData from "../controllers/siteData/postSiteData";
import withAuth from "../middleware/withAuth";

const data = express.Router();

data.get('/', getSiteData)

data.post('/', 
    withAuth(true), 
    csurf(config.csurfMiddleware),
    body('title').isString(),
    body('description').isString(),
    postSiteData)

data.get('/count', getCount)

data.post('/count', 
    csurf(config.csurfMiddleware),
    body('inc').isNumeric(),
    postCount)

export default data;