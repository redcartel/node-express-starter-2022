import config from '../../config.js';

/**
 * Health check endpoint
 * @param {import('express').Request} _req 
 * @param {import('express').Response} res 
 */
const getRoot = (_req, res) => {
    res.status(200).json({
        name: config.name,
        description: config.description,
        version: config.version
    });
}

export default getRoot