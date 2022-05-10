import config from '../../config'

/**
 * Get CSRF token
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getCSRF = (req, res) => {
    /* istanbul ignore next */
    if (!req.csrfToken) {
        return res.json({ csrf: false});
    }
    res.cookie('XSRF-TOKEN', req.csrfToken(), {
        domain: config.origin
    })
    return res.json({ csrf: true })
}

export default getCSRF