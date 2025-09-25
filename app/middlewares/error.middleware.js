const errorMiddleware = (err, req, res, next) => {
    let error = err;
 
    // mongoose bad objectid
    if(err.name === 'CastError') {
        error = new Error('Resource not found');
        error.statusCode = 404
    }

    // mongoose duplicate key
    if(err.name === 'MongooseError') error.statusCode = 400

    // mongoose validation error
    if(err.name === 'ValidationError') {
        error = new Error(JSON.stringify(err.errors));
        error.statusCode = 400
    }

    res.status(error.statusCode || 500).json({ success: false, message: error.message || 'Internal Server Error' });
}

export default errorMiddleware;