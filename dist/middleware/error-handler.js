"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const utils_1 = require("../utils");
/**
 * Error handler
 * @param req
 * @param res
 * @param next
 */
const errorHandler = (err, req, res, next) => {
    const resData = (0, utils_1.responseData)(false, 'ERR_008', [err.message], []);
    res.status(err.status || 500).json(resData);
};
exports.errorHandler = errorHandler;
