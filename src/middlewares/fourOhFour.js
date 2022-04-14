/**
 * JSON 404 response
 * @param {Express.Request} req 
 * @param {Express.Response} res
 */
const fourOhFour = (req, res) => {
    return res.status(404).json({message: 'not found'});
}

export default fourOhFour