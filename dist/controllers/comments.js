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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersWithLatestPostsAndComments = exports.createComments = void 0;
const validator_1 = require("../middleware/validator");
const utils_1 = require("../utils");
const db_1 = require("../db");
/**
 * Create comments
 * @param req
 * @param res
 * @param next
 */
const createComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /** Validate posts */
        const { value, error } = (0, validator_1.validateComments)(req.body);
        if (error) {
            const message = (0, utils_1.cleanString)(error === null || error === void 0 ? void 0 : error.details[0].message);
            const resData = (0, utils_1.responseData)(false, 'ERR_110', [message], []);
            return res.status(400).json(resData);
        }
        /** Insert record */
        const client = yield (0, db_1.connectDB)();
        const dateCreated = new Date();
        client.query((0, db_1.addComments)(), [req.params.id, req.body.content, dateCreated], (error, result) => {
            if (error) {
                const resData = (0, utils_1.responseData)(false, 'ERR_111', ['Unable to add comments, please try again'], []);
                return res.status(400).json(resData);
            }
            if (result) {
                const resData = (0, utils_1.responseData)(true, 'OK', ['Congratulations!, Your comments has been posted'], []);
                return res.status(201).json(resData);
            }
        });
    }
    catch (error) {
        const resData = (0, utils_1.responseData)(false, 'ERR_112', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
});
exports.createComments = createComments;
/**
 * Fetch  latest
 * comments
 * @param req
 * @param res
 * @param next
 */
const getUsersWithLatestPostsAndComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, db_1.connectDB)();
        const records = yield client.query('SELECT users.id, users.username, posts.title, comments.content FROM users LEFT JOIN posts ON users.id = posts.user_id LEFT JOIN comments ON posts.id = comments.posts_id ORDER BY (SELECT COUNT(posts.id) FROM posts WHERE posts.user_id = users.id) desc LIMIT 3');
        if (records.rows[0]) {
            const resData = (0, utils_1.responseData)(true, 'OK', ['The top three users with the most post and latest comments fetched successfully'], [{ 'data': records.rows }]);
            return res.status(200).json(resData);
        }
        else {
            const resData = (0, utils_1.responseData)(false, 'ERR_108', ['No record found'], []);
            return res.status(404).json(resData);
        }
    }
    catch (error) {
        console.log(error);
        const resData = (0, utils_1.responseData)(false, 'ERR_113', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
    return res.send("I love my DAD...");
});
exports.getUsersWithLatestPostsAndComments = getUsersWithLatestPostsAndComments;
