/**
 * Retrieve user data
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getUser = (req, res) => {
    return res.json(req.user);
}

export default getUser;