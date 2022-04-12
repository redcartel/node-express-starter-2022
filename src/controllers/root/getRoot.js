import config from '../../config.js'

/**
 * Health check endpoint
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const getRoot = (req, res) => {
    if (config.nodeEnv === 'production') {
        res.status(200).send();
    }
    else {
        res.json({ 'environment': config.nodeEnv ?? 'undefined' });
    }
}

export default getRoot;