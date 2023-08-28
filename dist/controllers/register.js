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
exports.createUser = void 0;
const validator_1 = require("../middleware/validator");
const utils_1 = require("../utils");
const db_1 = require("../db");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, firstname, lastname, email, password } = req.body;
        /** Validate User */
        const { value, error } = (0, validator_1.validateUser)(req.body);
        if (error) {
            const message = (0, utils_1.cleanString)(error === null || error === void 0 ? void 0 : error.details[0].message);
            const resData = (0, utils_1.responseData)(false, 'ERR_000', [message], []);
            return res.status(400).json(resData);
        }
        /** Checks if email already exists */
        const client = yield (0, db_1.connectDB)();
        client.query((0, db_1.checkEmailExists)(), [email], (error, result) => {
            if (result.rows.length) {
                const resData = (0, utils_1.responseData)(false, 'ERR_001', [`Email (${email}) already exists`], []);
                return res.status(400).json(resData);
            }
        });
        /** Hash password  */
        const hashedPass = (0, utils_1.hashPassword)(password);
        /** Insert record */
        const dateCreated = new Date();
        client.query((0, db_1.addUser)(), [username, firstname, lastname, email, hashedPass, dateCreated], (error, result) => {
            if (error) {
                const resData = (0, utils_1.responseData)(false, 'ERR_002', ['Unable to create user, please try again'], []);
                res.status(400).json(resData);
            }
            if (result) {
                const resData = (0, utils_1.responseData)(true, 'OK', ['Congratualtions!, Your account has been created successfully'], []);
                return res.status(201).json(resData);
            }
        });
    }
    catch (error) {
        const resData = (0, utils_1.responseData)(false, 'ERR_003', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
});
exports.createUser = createUser;
