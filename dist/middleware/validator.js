"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateComments = exports.validatePosts = exports.validateLogin = exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * Validate user
 * @param user
 * @returns user
 */
const validateUser = (user) => {
    const userSchema = joi_1.default.object({
        username: joi_1.default.string().min(3).max(12).required(),
        firstname: joi_1.default.string().min(3).max(50).required(),
        lastname: joi_1.default.string().min(3).max(50).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).required(),
        confirmPassword: joi_1.default.ref("password")
    });
    return userSchema.validate(user);
};
exports.validateUser = validateUser;
/**
 * Validate login
 * @param login
 * @returns login data
 */
const validateLogin = (login) => {
    const loginSchema = joi_1.default.object({
        username: joi_1.default.string().min(3).max(12).required(),
        password: joi_1.default.string().regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).required(),
    });
    return loginSchema.validate(login);
};
exports.validateLogin = validateLogin;
/**
 * Validate post
 * @param posts
 * @returns
 */
const validatePosts = (posts) => {
    const postsSchema = joi_1.default.object({
        title: joi_1.default.string().required(),
    });
    return postsSchema.validate(posts);
};
exports.validatePosts = validatePosts;
/**
 * Validate comments
 * @param comments
 * @returns
 */
const validateComments = (comments) => {
    const commentsSchema = joi_1.default.object({
        content: joi_1.default.string().required(),
    });
    return commentsSchema.validate(comments);
};
exports.validateComments = validateComments;
