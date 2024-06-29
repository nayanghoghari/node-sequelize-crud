class ApiError extends Error {
    statusCode;
    constructor({ message, statusCode }){
        super(message)
        this.statusCode = statusCode || 500
    }
}

class NotFoundError extends ApiError {
    constructor(message = "NotFound!"){
        super({message, statusCode: 404 })
    }
}

class UnauthorizedError extends ApiError{
    constructor(message = "Unauthorized!") {
        super({ message, statusCode: 401})
    }
}

module.exports = { ApiError, NotFoundError, UnauthorizedError };