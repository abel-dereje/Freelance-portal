const { constants } = require('./constant');

const errorHandler = (error, req, res, next) => {
    const statusCode = error.status || res.statusCode || constants.SERVER_ERROR;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(constants.VALIDATION_ERROR).json({ title: "Validation Error", stackTrace: error.stack });
            break;
        case constants.UNAUTHORIZED:
            res.status(constants.UNAUTHORIZED).json({ title: "Unauthorized", stackTrace: error.stack });
            break;
        case constants.FORBIDDEN:
            res.status(constants.FORBIDDEN).json({ title: "Forbidden", stackTrace: error.stack });
            break;
        case constants.NOT_FOUND:
            res.status(constants.NOT_FOUND).json({ title: "Not Found", stackTrace: error.stack });
            break;
        case constants.SERVER_ERROR:
            res.status(constants.SERVER_ERROR).json({ title: "Server Error", stackTrace: error.stack });
            break;
        default:
            console.error("No Error. Everything is fine.");
            res.status(constants.SERVER_ERROR).json({ title: "Unknown Error", stackTrace: error.stack });
            break;
    }
};

module.exports = errorHandler;
