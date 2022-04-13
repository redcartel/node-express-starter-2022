import config from "src/config.js"

/**
 * Emit correct errors for `throw { status: 403, message: 'forbidden', ... }` or e.g. `throw 403`.
 * For involuntary errors, it logs and responds with nothing in production and error
 * information otherwise.
 *
 * @param {any} err
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 * @returns
 */
const errorHandler = (err, req, res, next) => {
    try {
        // handle error of form (throw { status, ... })
        if (err.hasOwnProperty('status')) {
            return res.status(err.status).json({
                message: err.message ?? ''
            })
        }
        // handle numeric error (throw http code)
        else if (parseInt(`${err}`) >= 200 && parseInt(`${err}`) < 600) {
            return res.status(parseInt(`${err}`)).json({ message: `${err}` })
        }
        // handle generic error
        else {
            if (config.nodeEnv === 'production') {
                console.error(`${err}`.slice(0, 512))
            }
            else {
                console.error(err)
            }
            return res.status(500).json({ message: '' })
        }
    }
    catch (e) {
        console.error('An error happened while processing an error')
        console.error(e)
        console.error('')
        console.error(err)
        return res.status(500).json({ message: '' })
    }
}

export default errorHandler