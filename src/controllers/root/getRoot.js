import config from 'src/config.js'

/**
 * Health check endpoint
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const getRoot = (req, res) => {
    if (config.nodeEnv === 'production') {
        return res.status(200).send()
    }
    else {
        return res.json({ 'environment': config.nodeEnv ?? 'undefined' })
    }
}

export default getRoot