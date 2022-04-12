/**
 * Emit correct errors for throw { status, message } or throw statusCode
 * log error and emit status 500 for other errors
 * 
 * @param {any} err 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 * @returns 
 */
const errorHandler = (err, req, res, next) => {
    // handle error of form (throw { status, message })
    if (err.hasOwnProperty('status')) {
      return res.status(err.status).json({
          message: err.message ?? ''
      });
    }
    // handle numeric error (throw http code)
    else if (parseInt(`${err}`) >= 400 && parseInt(`${err}`) < 600) {
        return res.status(parseInt(`${err}`)).json({message: ''});
    }
    // handle generic error
    else {
        if (process.env['NODE_ENV'] === 'production') {
            console.error(`${err}`.slice(0,512));
        }
        else {
            console.error(err);
        }
        return res.status(500).json({message: ''});
    }
  }

  export default errorHandler;