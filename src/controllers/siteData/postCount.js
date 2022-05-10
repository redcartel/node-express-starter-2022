import { getSiteVisitCount, incrementSiteVisitCount } from '../../services/siteDataService';

/**
 * Echo endpoint
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const postCount = async (req, res) => {
    const { inc } = req.body;
    if (inc !== 1) {
        return res.status(400).json({message: 'must increment by 1'})
    }
    await incrementSiteVisitCount()
    return res.json({count: await getSiteVisitCount()})
}

export default postCount