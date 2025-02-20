"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictResponse = exports.BadRequestResponse = exports.UnauthorizedResponse = exports.UnauthenticatedResponse = exports.InternalServerErrorResponse = exports.NotFoundResponse = exports.ErrorResponse = void 0;
class ErrorResponse {
    constructor(message, status) {
        this.message = message;
        this.status = status;
    }
    generate() {
        return {
            data: {
                message: this.message
            },
            status: this.status
        };
    }
}
exports.ErrorResponse = ErrorResponse;
class NotFoundResponse extends ErrorResponse {
    constructor(message = "Resource not found") {
        var _a;
        super((_a = message === null || message === void 0 ? void 0 : message.toString()) !== null && _a !== void 0 ? _a : "Resource not found", 404);
    }
}
exports.NotFoundResponse = NotFoundResponse;
class InternalServerErrorResponse extends ErrorResponse {
    constructor(message = "Internal Server Error") {
        var _a;
        super((_a = message === null || message === void 0 ? void 0 : message.toString()) !== null && _a !== void 0 ? _a : "Internal Server Error", 500);
    }
}
exports.InternalServerErrorResponse = InternalServerErrorResponse;
class UnauthenticatedResponse extends ErrorResponse {
    constructor(message = "Unauthenticated") {
        var _a;
        super((_a = message === null || message === void 0 ? void 0 : message.toString()) !== null && _a !== void 0 ? _a : "Unauthenticated", 401);
    }
}
exports.UnauthenticatedResponse = UnauthenticatedResponse;
class UnauthorizedResponse extends ErrorResponse {
    constructor(message = "Unauthorized") {
        var _a;
        super((_a = message === null || message === void 0 ? void 0 : message.toString()) !== null && _a !== void 0 ? _a : "Unauthorized", 403);
    }
}
exports.UnauthorizedResponse = UnauthorizedResponse;
class BadRequestResponse extends ErrorResponse {
    constructor(message = "Bad Request") {
        var _a;
        super((_a = message === null || message === void 0 ? void 0 : message.toString()) !== null && _a !== void 0 ? _a : "Bad Request", 400);
    }
}
exports.BadRequestResponse = BadRequestResponse;
class ConflictResponse extends ErrorResponse {
    constructor(message = "Conflict") {
        var _a;
        super((_a = message === null || message === void 0 ? void 0 : message.toString()) !== null && _a !== void 0 ? _a : "Conflict", 409);
    }
}
exports.ConflictResponse = ConflictResponse;
