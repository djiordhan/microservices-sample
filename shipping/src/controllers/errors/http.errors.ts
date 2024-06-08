export class HttpError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string = 'Bad Request') {
        super(400, message);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string = 'Forbidden') {
        super(403, message);
    }
}

export class InternalServerError extends HttpError {
    constructor(message: string = 'Internal Server Error') {
        super(500, message);
    }
}