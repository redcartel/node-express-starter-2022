import { getSiteData } from '../../services/siteDataService';

/**
 * Retrieve the site title and description
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const _getSiteData = async (req, res) => {
    return res.json(await getSiteData())
}

export default _getSiteData