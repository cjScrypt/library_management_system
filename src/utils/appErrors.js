class AppError extends Error {

}

class AccessForbiddenError extends AppError {

}

class AuthenticationError extends AppError {

}

class ServiceError extends AppError {

}


module.exports = {
    AccessForbiddenError,
    AuthenticationError,
    ServiceError,
}