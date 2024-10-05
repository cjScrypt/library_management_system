class APIError extends Error {
    constructor({
        message="Internal Server Error",
        statusCode=500,
        name="Internal Server Error"
    }) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}

class AuthenticationError extends APIError {
    constructor({
        message="Authentication Error",
        statusCode=401,
        name="Authentication Error"
    }) {
        super({ message, statusCode, name });
    }
}

class AccessForbiddenError extends APIError {
    constructor({
        message="Access Forbidden Error",
        statusCode=401,
        name="Access Forbidden Error"
    }) {
        super({ message, statusCode, name });
    }
}

class BadRequest extends APIError {
    constructor({
        message="Bad Request",
        statusCode=400,
        name="Bad Request"
    }) {
        super({ message, statusCode, name });
    }
}

class ServiceError extends APIError {
    constructor({
        message="Service Error",
        statusCode=400,
        name="Service Error"
    }) {
        super({ message, statusCode, name});
    }
}

class ValidationError extends APIError {
    constructor({
        message="Validation Error",
        statusCode=400,
        name="Validaton Error",
        fields={}
    }) {
        super({ message, statusCode, name });
        this.fields = fields
    }
}

module.exports = {
    APIError,
    BadRequest,
    ServiceError,
    ValidationError
}