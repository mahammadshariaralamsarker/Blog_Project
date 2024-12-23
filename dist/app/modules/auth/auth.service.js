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
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const app_error_1 = __importDefault(require("../../../error/app.error"));
const config_1 = __importDefault(require("../../../config"));
const JWT_SECRET = config_1.default.jwt_access_secret;
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = new user_model_1.UserModel(payload);
    if (!result)
        throw new app_error_1.default(http_status_codes_1.default.NOT_FOUND, "Validation error");
    yield result.save();
    return result;
});
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    if (!email || !password)
        throw new app_error_1.default(http_status_codes_1.default.NOT_FOUND, "Invalid credentials!");
    const user = yield user_model_1.UserModel.findOne({ email: email }).select('+password');
    if (!user)
        throw new app_error_1.default(http_status_codes_1.default.NOT_FOUND, `Invalid ${email} no record create !`);
    const isDeleted = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (isDeleted) {
        throw new app_error_1.default(http_status_codes_1.default.FORBIDDEN, 'This user is deleted !');
    }
    // Compare provided password with the hashed password
    const isPasswordValid = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordValid) {
        throw new app_error_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Invalid password!');
    }
    const token = jsonwebtoken_1.default.sign(Object.assign({}, user), JWT_SECRET, { expiresIn: "1h" });
    return token;
});
exports.AuthService = {
    createUserIntoDB, loginUserIntoDB
};
