import config from 'src/config.js'

/**
 * Health check endpoint
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const getRoot = (req, res) => {
    if (config.nodeEnv !== 'production') {
        res.status(200).json({
            'environment': config.nodeEnv,
            'version': config.version
        })
    }
    else {
        res.status(200).json({})
    }
}

export default getRoot