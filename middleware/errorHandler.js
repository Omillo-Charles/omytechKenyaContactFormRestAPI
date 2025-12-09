const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(error => error.message);
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format'
        });
    }

    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Duplicate field value entered'
        });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Server Error'
    });
};

export default errorHandler;
