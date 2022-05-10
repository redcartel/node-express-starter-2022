import { matchedData } from 'express-validator';
import { getSiteData, setSiteData } from '../../services/siteDataService';

/**
 * Update the title or description
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const postSiteData = async (req, res) => {
    const { title, description } = matchedData(req, {
        locations: ['body'],
        onlyValidData: true,
    })
    await setSiteData({ title, description })
    return res.json(await getSiteData())
}

export default postSiteData