/**
 * Health check endpoint
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const getRoot = (req, res) => {
    if (process.env['NODE_ENV'] === 'production') {
        res.status(200).send();
    }
    else {
        res.json({ 'NODE_ENV': process.env['NODE_ENV'] ?? 'undefined' });
    }
}

export default getRoot;