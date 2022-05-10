/**
 * Get CSRF token
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getCSRF = (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken())
    return res.json({ csrf: true })
}

export default getCSRF