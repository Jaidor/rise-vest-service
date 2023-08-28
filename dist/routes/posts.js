"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const posts_1 = require("../controllers/posts");
const authentication_1 = require("../middleware/authentication");
exports.default = (router) => {
    router.post('/api/v1/posts', authentication_1.authentication, posts_1.createPosts);
    router.get('/api/v1/posts', authentication_1.authentication, posts_1.getAllPosts);
};
