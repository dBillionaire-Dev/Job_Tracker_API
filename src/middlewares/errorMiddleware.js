import env from "../config/env.js";

const errorHandler = (err, req, res ) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message,
        stack: env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export default errorHandler;
