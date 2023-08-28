"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Authentication
 * @param req
 * @param res
 * @param next
 */
const authentication = (req, res, next) => {
    /** Check header */
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        const resData = (0, utils_1.responseData)(false, 'ERR_009', ['Authentication invalid!'], []);
        return res.status(401).json(resData);
    }
    try {
        let session_token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
        let payload;
        payload = jsonwebtoken_1.default.verify(session_token, `${process.env.JWT_SECRET}`);
        /** Attach the user record */
        const userData = {
            userID: payload.user_id,
            username: payload.username
        };
        res.locals.user = userData;
        next();
    }
    catch (error) {
        const resData = (0, utils_1.responseData)(false, 'ERR_100', ['Your session has expired, kindly login again...'], []);
        return res.status(401).json(resData);
    }
};
exports.authentication = authentication;
