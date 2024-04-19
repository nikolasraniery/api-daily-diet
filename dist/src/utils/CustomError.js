"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    constructor({ code, message }) {
        this.code = code;
        this.message = message;
    }
}
exports.CustomError = CustomError;
