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
exports.getUser = exports.getAllUsers = void 0;
const utils_1 = require("../utils");
const db_1 = require("../db");
/**
 * Fetch all users
 * @param req
 * @param res
 * @param next
 */
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, db_1.connectDB)();
        const userRecord = yield client.query((0, db_1.fetchAllUsers)());
        if (userRecord.rows[0]) {
            const resData = (0, utils_1.responseData)(true, 'OK', ['Record fetched successfully'], [{ 'data': userRecord.rows }]);
            return res.status(200).json(resData);
        }
        else {
            const resData = (0, utils_1.responseData)(false, 'ERR_101', ['No record found'], []);
            return res.status(404).json(resData);
        }
    }
    catch (error) {
        const resData = (0, utils_1.responseData)(false, 'ERR_102', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
});
exports.getAllUsers = getAllUsers;
/**
 * Get single user
 * @param req
 * @param res
 * @param next
 * @returns
 */
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.id;
        const client = yield (0, db_1.connectDB)();
        const userRecord = yield client.query((0, db_1.fetchUserByID)(), [user_id]);
        if (userRecord.rows[0]) {
            const resData = (0, utils_1.responseData)(true, 'OK', ['Record fetched successfully'], [{ 'data': userRecord.rows[0] }]);
            return res.status(200).json(resData);
        }
        else {
            const resData = (0, utils_1.responseData)(false, 'ERR_103', ['No record found'], []);
            return res.status(404).json(resData);
        }
    }
    catch (error) {
        const resData = (0, utils_1.responseData)(false, 'ERR_104', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
});
exports.getUser = getUser;
