"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogValidationSchema = exports.createBlogValidationSchema = void 0;
const zod_1 = require("zod");
exports.createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(5, { message: "Must be 5 or more characters long" }).max(50, { message: 'Must be 20 or end charactes long' }),
        content: zod_1.z.string().min(10, { message: "Must be 10 or more characters long" }).max(500, { message: 'Must be 500 or end charactes long' }),
        isPublished: zod_1.z.boolean().default(true)
    })
});
exports.updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(5, { message: "Must be 5 or more characters long" }).max(50, { message: 'Must be 20 or end charactes long' }).optional(),
        content: zod_1.z.string().min(10, { message: "Must be 10 or more characters long" }).max(500, { message: 'Must be 500 or end charactes long' }).optional(),
        isPublished: zod_1.z.boolean().default(true).optional()
    })
});
