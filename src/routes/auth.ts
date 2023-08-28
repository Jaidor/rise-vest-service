import express from 'express';

import { createUser }  from '../controllers/register';
import { login }  from '../controllers/login';
export default ( router: express.Router ) => {
    router.post('/api/v1/auth/register', createUser);
    router.post('/api/v1/auth/login', login);
}