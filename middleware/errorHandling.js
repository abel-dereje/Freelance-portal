// using the constant.js
const { constants } = require('./constant');
// we are passing four parameters for middleware 
const errorHandler = (error,req,res,next) => {
// we have define the status code 
const statusCode =res.statusCode ? res.statusCode : 500 ;
//creating switch case define the status code 
switch (statusCode) {
    case constants.VALIDATION_ERROR:
        res.json({tittle:"Validation Error", stackTrace: error.stack});
        break ;
    case constants.UNAUTHORIZED:
        res.json({tittle:"Unauthorized", stackTrace: error.stack});
        break ;
    case constants.FORBIDDEN:
        res.json({tittle:"Forbidden", stackTrace: error.stack});
        break ;
    case constants.NOT_FOUND:
        res.json({tittle:"Not Found", stackTrace: error.stack});
        break ;
    case constants.SERVER_ERROR:
        res.json({tittle:"Server Error", stackTrace: error.stack});
        break ;
    default:
        console.log("No Error It is Fine");
        break ;
}

};

module.exports =errorHandler;