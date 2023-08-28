"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseData = exports.validatePass = exports.hashPassword = exports.cleanString = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * cleaned sring
 * incase of special character
 * @param data
 * @returns clean_message_final
 */
const cleanString = (data) => {
    const cleaned = data.replace('\\', "");
    const cleaned_message = cleaned.replace('"', "");
    const cleaned_final = cleaned_message.replace('\\', "");
    const cleaned_message_final = cleaned_final.replace('"', "");
    return cleaned_message_final;
};
exports.cleanString = cleanString;
/**
 * Hash password
 * @param string
 * @returns password
 */
const hashPassword = (string) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const password = bcryptjs_1.default.hashSync(string, salt);
    return password;
};
exports.hashPassword = hashPassword;
/**
 * Validate password
 * @param pass
 * @param hashedPass
 * @returns boolean
 */
const validatePass = (pass, hashedPass) => {
    const isMatch = bcryptjs_1.default.compareSync(pass, hashedPass);
    if (isMatch)
        return true;
    else
        return false;
};
exports.validatePass = validatePass;
/**
 * Json output
 * To be uniformed
 * Across the
 * Application
 * @param status
 * @param code
 * @param message
 * @param response
 * @returns responseData
 */
const responseData = (status, code, message = [], response = []) => {
    const responseData = { 'data': { 'status': status, 'code': code, 'message': message, 'response': response } };
    return responseData;
};
exports.responseData = responseData;
