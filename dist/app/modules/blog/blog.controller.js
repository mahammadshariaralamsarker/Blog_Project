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
exports.blogController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const blog_service_1 = require("./blog.service");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const blogCreate = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = req.user;
    if (!data)
        throw new Error("Invalid Body Information");
    const result = yield blog_service_1.BlogService.createBlogIntoDB(data, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    });
}));
const getBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const user = req.user;
    const result = yield blog_service_1.BlogService.getBlogIntoDB(query, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Blogs fetched successfully",
        data: result
    });
}));
const blogUpdate = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { Id } = req.params;
    const user = req.user;
    if (!data || !Id)
        throw new Error("Invalid Body Information");
    const result = yield blog_service_1.BlogService.updateBlogIntoDB(data, Id, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Blog updated successfully",
        data: result
    });
}));
const blogDelete = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Id } = req.params;
    const user = req.user;
    if (!Id || !user)
        throw new Error("Invalid Body Information");
    const result = yield blog_service_1.BlogService.deleteBlogIntoDB(Id, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Blog deleted successfully",
        data: result
    });
}));
exports.blogController = { blogCreate, blogUpdate, blogDelete, getBlog };
