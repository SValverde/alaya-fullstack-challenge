// Middleware error handler for json response
const errorHandler = (err,req,res,next)=>{
    console.log("err:",err);
    var output = {
        error: {
            name: err.name,
            message: err.message,
            text: err.toString()
        }
    };
    var statusCode = err.status || 500;
    res.status(statusCode).json(output);
}

module.exports = errorHandler;