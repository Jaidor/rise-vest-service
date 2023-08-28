import express from 'express';

import { createPosts, getAllPosts }  from '../controllers/posts';
import { authentication }  from '../middleware/authentication';

export default ( router: express.Router ) => {
    router.post('/api/v1/posts', authentication, createPosts);
    router.get('/api/v1/posts', authentication, getAllPosts);
}