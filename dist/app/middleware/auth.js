"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = require("../utils/catchAsync");
const app_error_1 = __importDefault(require("../../error/app.error"));
const JWT_SECRET = config_1.default.jwt_access_secret;
const authUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new app_error_1.default(http_status_codes_1.default.UNAUTHORIZED, "Access denied. No token provided or invalid format.");
    }
    const token = authHeader.split(" ")[1];
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
}));
const onlyAdmin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._doc;
    if (!user || !user.role) {
        throw new Error("Access denied. No token provided or invalid format.");
    }
    if (user.role !== "admin") {
        throw new Error("Access denied only admin");
    }
    next();
}));
exports.auth = { authUser, onlyAdmin };
