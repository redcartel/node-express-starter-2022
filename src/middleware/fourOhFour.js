/**
 * JSON 404 response
 * @param {import('express').Request} _req 
 * @param {import('express').Response} res
 */
const fourOhFour = (_req, res) => {
    return res.status(404).json({ message: 'not found' });
}

export default fourOhFour