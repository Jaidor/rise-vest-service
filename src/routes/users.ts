import express from 'express';

import { getAllUsers, getUser }  from '../controllers/users';
import { authentication }  from '../middleware/authentication';

export default ( router: express.Router ) => {
    router.get('/api/v1/users', authentication, getAllUsers);
    router.get('/api/v1/users/:id', authentication, getUser);
}