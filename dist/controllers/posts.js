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
exports.getAllPosts = exports.createPosts = void 0;
const validator_1 = require("../middleware/validator");
const utils_1 = require("../utils");
const db_1 = require("../db");
/**
 * Create posts
 * @param req
 * @param res
 * @param next
 */
const createPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /** Validate posts */
        const { value, error } = (0, validator_1.validatePosts)(req.body);
        if (error) {
            const message = (0, utils_1.cleanString)(error === null || error === void 0 ? void 0 : error.details[0].message);
            const resData = (0, utils_1.responseData)(false, 'ERR_105', [message], []);
            return res.status(400).json(resData);
        }
        /** Insert record */
        const client = yield (0, db_1.connectDB)();
        const dateCreated = new Date();
        client.query((0, db_1.addPosts)(), [res.locals.user.userID, req.body.title, dateCreated], (error, result) => {
            if (error) {
                const resData = (0, utils_1.responseData)(false, 'ERR_106', ['Unable to create posts, please try again'], []);
                return res.status(400).json(resData);
            }
            if (result) {
                const resData = (0, utils_1.responseData)(true, 'OK', ['Congratulations!, Your posts has been created successfully'], []);
                return res.status(201).json(resData);
            }
        });
    }
    catch (error) {
        const resData = (0, utils_1.responseData)(false, 'ERR_107', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
});
exports.createPosts = createPosts;
/**
 * Fetch all posts
 * Of a user
 * @param req
 * @param res
 * @param next
 */
const getAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, db_1.connectDB)();
        const postsRecord = yield client.query((0, db_1.fetchAllPosts)());
        if (postsRecord.rows[0]) {
            const resData = (0, utils_1.responseData)(true, 'OK', ['Posts fetched successfully'], [{ 'data': postsRecord.rows }]);
            return res.status(200).json(resData);
        }
        else {
            const resData = (0, utils_1.responseData)(false, 'ERR_108', ['No record found'], []);
            return res.status(404).json(resData);
        }
    }
    catch (error) {
        const resData = (0, utils_1.responseData)(false, 'ERR_109', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
});
exports.getAllPosts = getAllPosts;
