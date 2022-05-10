import { getSiteVisitCount } from '../../services/siteDataService';

/**
 * Get the visit count
 * @param {import('express').Request} _req 
 * @param {import('express').Response} res 
 */
const getCount = async (_req, res) => {
    return res.json({count: await getSiteVisitCount()})
}

export default getCount