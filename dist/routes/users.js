"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const authentication_1 = require("../middleware/authentication");
exports.default = (router) => {
    router.get('/api/v1/users', authentication_1.authentication, users_1.getAllUsers);
    router.get('/api/v1/users/:id', authentication_1.authentication, users_1.getUser);
};
