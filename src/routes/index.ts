import express from 'express';
import auth from './auth'
import users from './users'
import posts from './posts'
import comments from './comments'

const router = express.Router();

/**
 * Router
 */

export default ( ): express.Router => {
    auth(router);
    users(router);
    posts(router);
    comments(router);
    return router;
}