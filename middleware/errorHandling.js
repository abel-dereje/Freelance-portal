// errorHandler.js
const { constants } = require('./constant');

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Error", stackTrace: error.stack });
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", stackTrace: error.stack });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", stackTrace: error.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", stackTrace: error.stack });
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server Error", stackTrace: error.stack });
            break;
        default:
            console.log("No Error. Everything is fine.");
            break;
    }
};

module.exports = errorHandler;
