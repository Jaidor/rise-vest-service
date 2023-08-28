import express, { Request, Response, NextFunction } from 'express';
import { responseData } from '../utils';
import jwt from 'jsonwebtoken';

/**
 * Authentication
 * @param req 
 * @param res 
 * @param next 
 */

export const authentication = (req: Request, res: Response, next: NextFunction) => {

    /** Check header */
    const authHeader: string | undefined = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        const resData = responseData(false, 'ERR_009', ['Authentication invalid!'], []);
        return res.status(401).json(resData);
    }
    
    try {        

        let session_token: any | undefined = authHeader?.split(' ')[1];
        let payload: any | undefined;
        payload = jwt.verify(session_token, `${process.env.JWT_SECRET}`);

        /** Attach the user record */
        const userData: any = {
            userID: payload.user_id,
            username: payload.username
        }
        res.locals.user = userData;
        next();

    } catch (error) {
        const resData = responseData(false, 'ERR_100', ['Your session has expired, kindly login again...'], []);
        return res.status(401).json(resData);
    }

}