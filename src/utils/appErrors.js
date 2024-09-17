class AppError extends Error {

}


class ServiceError extends AppError {

}


module.exports = {
    ServiceError,
}