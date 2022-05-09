/**
 * Log in endpoint
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */

const getUser = (req, res) => {
    res.json(req.user ?? {});
}

export default getUser;