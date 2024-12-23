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
exports.BlogService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const blog_model_1 = require("./blog.model");
const app_error_1 = __importDefault(require("../../../../error/app.error"));
const QueryBuilder_1 = __importDefault(require("../../QueryBuilder"));
const createBlogIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = user._doc;
    payload.author = userData === null || userData === void 0 ? void 0 : userData._id;
    const result = yield blog_model_1.BlogModel.create(payload);
    if (!result)
        throw new app_error_1.default(http_status_codes_1.default.NOT_FOUND, "Invalid User Infomation");
    const populatedResult = yield result.populate('author');
    return populatedResult;
});
const getBlogIntoDB = (query, user) => __awaiter(void 0, void 0, void 0, function* () {
    // blog filed 
    let filter = {};
    const { _id, role } = user._doc;
    if (role === 'admin') {
        filter = {};
    }
    else {
        filter = { author: _id };
    }
    const blogSearchFileds = ['title', 'content'];
    const blogQuery = new QueryBuilder_1.default(blog_model_1.BlogModel.find(filter), query)
        .search(blogSearchFileds)
        .filter()
        .sort();
    const result = blogQuery.modelQuery.populate('author');
    return result;
});
const updateBlogIntoDB = (payload, Id, user) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = {};
    const { _id, role } = user._doc;
    if (role === 'admin') {
        filter = { _id: Id };
    }
    else {
        filter = { _id: Id, author: _id };
    }
    const result = yield blog_model_1.BlogModel.findOneAndUpdate(filter, payload, { new: true });
    if (!result)
        throw new app_error_1.default(http_status_codes_1.default.NOT_FOUND, "Invalid User Infomation");
    return result;
});
const deleteBlogIntoDB = (Id, user) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = {};
    const { _id, role } = user._doc;
    if (role === 'admin') {
        filter = { _id: Id };
    }
    else {
        filter = { _id: Id, author: _id };
    }
    const result = yield blog_model_1.BlogModel.deleteOne(filter);
    if (!result)
        throw new app_error_1.default(http_status_codes_1.default.NOT_FOUND, "Invalid Delete Infomation");
    return result;
});
exports.BlogService = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogIntoDB,
    getBlogIntoDB
};
