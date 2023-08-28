"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = require("../controllers/register");
const login_1 = require("../controllers/login");
exports.default = (router) => {
    router.post('/api/v1/auth/register', register_1.createUser);
    router.post('/api/v1/auth/login', login_1.login);
};
