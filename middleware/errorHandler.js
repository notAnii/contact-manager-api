const errorMiddleware = (err, req, res, next) => {
    const status = err.status ? err.status : 500;
    const message = status === 500 ? "An unexpected error occurred" : err.message;
    const errors = err.error;
    res.status(status).send({ message, error: errors });
    console.log(err.stack);
};

module.exports = errorMiddleware;