/**
 * Echo endpoint
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const postRoot = (req, res) => {
    const json = req.body
    res.json(json)
}

export default postRoot