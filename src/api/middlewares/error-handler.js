const { APIError, ValidationError } = require("../../utils/appErrors");


function appErrorHandler(err, req, res, next) {
    if (!err) {
        return next();
    }

    if ( err instanceof ValidationError ) {
        const responseBody = {
            error: {
                message: err.message,
                fields: err.fields
            }
        }

        return res.status(err.statusCode).json(responseBody);
    } else if ( err instanceof APIError ) {
        const responseBody = {
            error: { message: err.message }
        }

        return res.status(err.statusCode).json(responseBody);
    }

    console.log("====Error====", err);

    return res.status(500).json({ 
        error: { message: "Internal server error"}
    });
}


module.exports = appErrorHandler;