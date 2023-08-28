import express from 'express';

import { createComments, getUsersWithLatestPostsAndComments }  from '../controllers/comments';
import { authentication }  from '../middleware/authentication';

export default ( router: express.Router ) => {
    router.post('/api/v1/comments/:id', authentication, createComments);
    router.get('/api/v1/comments', authentication, getUsersWithLatestPostsAndComments);
}