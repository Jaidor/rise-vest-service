"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comments_1 = require("../controllers/comments");
const authentication_1 = require("../middleware/authentication");
exports.default = (router) => {
    router.post('/api/v1/comments/:id', authentication_1.authentication, comments_1.createComments);
    router.get('/api/v1/comments', authentication_1.authentication, comments_1.getUsersWithLatestPostsAndComments);
};
