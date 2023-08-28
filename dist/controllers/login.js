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
exports.login = void 0;
const validator_1 = require("../middleware/validator");
const utils_1 = require("../utils");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        /** Validate User */
        const { value, error } = (0, validator_1.validateLogin)(req.body);
        if (error) {
            const message = (0, utils_1.cleanString)(error === null || error === void 0 ? void 0 : error.details[0].message);
            const resData = (0, utils_1.responseData)(false, 'ERR_004', [message], []);
            return res.status(400).json(resData);
        }
        /** Checks if user exists */
        const client = yield (0, db_1.connectDB)();
        const userRecord = yield client.query((0, db_1.getUserByUsername)(), [username]);
        if (userRecord.rowCount > 0) {
            const identity = userRecord.rows[0];
            /** Check if password match */
            const password_match = (0, utils_1.validatePass)(password, identity.password);
            if (!password_match) {
                const resData = (0, utils_1.responseData)(false, 'ERR_005', ['Incorrect passsword'], []);
                return res.status(406).json(resData);
            }
            /** Generate session token */
            const token = jsonwebtoken_1.default.sign({ 'user_id': identity.id, 'username': identity.username }, `${process.env.JWT_SECRET}`, {
                expiresIn: '1d',
            });
            const resData = (0, utils_1.responseData)(true, 'OK', ['Login successful'], [{ 'token': token }]);
            return res.status(200).json(resData);
        }
        else {
            const resData = (0, utils_1.responseData)(false, 'ERR_006', ['Incorrect username adress'], []);
            return res.status(400).json(resData);
        }
    }
    catch (error) {
        const resData = (0, utils_1.responseData)(false, 'ERR_007', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
});
exports.login = login;
