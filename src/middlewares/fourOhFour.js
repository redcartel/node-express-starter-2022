/**
 * JSON 404 response
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 */
const fourOhFour = (req, res, next) => {
    throw {status: 404, message: 'not found'}
};

export default fourOhFour