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
        console.error(err);
        return res.status(500).json({message: ''});
    }
  }

  export default errorHandler;