"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsRoute = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const auth_1 = require("../../../middleware/auth");
const validateRequest_1 = require("../../../middleware/validateRequest");
const router = express_1.default.Router();
// route 
router.post('/', auth_1.auth.authUser, (0, validateRequest_1.validateRequest)(blog_validation_1.createBlogValidationSchema), blog_controller_1.blogController.blogCreate);
router.get('/', auth_1.auth.authUser, blog_controller_1.blogController.getBlog);
router.patch('/:Id', auth_1.auth.authUser, (0, validateRequest_1.validateRequest)(blog_validation_1.updateBlogValidationSchema), blog_controller_1.blogController.blogUpdate);
router.delete('/:Id', auth_1.auth.authUser, blog_controller_1.blogController.blogDelete);
exports.BlogsRoute = router;
