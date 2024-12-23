"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastValidationError = void 0;
const handleCastValidationError = (err) => {
    const errorSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        errorSources,
    };
};
exports.handleCastValidationError = handleCastValidationError;
