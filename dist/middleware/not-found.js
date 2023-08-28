"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const utils_1 = require("../utils");
/**
 * Not found
 * Error handler
 * @param req
 * @param res
 * @param next
 */
const notFound = (req, res, next) => {
    const resData = (0, utils_1.responseData)(false, 'ERR_008', ['Route does not exist...'], []);
    res.status(404).json(resData);
};
exports.notFound = notFound;
