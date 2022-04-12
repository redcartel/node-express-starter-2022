/**
 * Echo endpoint
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const postRoot = (req, res) => {
    const json = req.body;
    if (!json) {
        throw 400;
    }
    res.json(json);
}

export default postRoot;