import express, { Request, Response, NextFunction } from 'express';
import { validateLogin } from '../middleware/validator';
import { cleanString, responseData, validatePass } from '../utils';
import { connectDB, getUserByUsername } from '../db';
import jwt from 'jsonwebtoken';

export const login = async ( req: Request, res: Response, next: NextFunction ) => {
    try {

        const { username, password } = req.body;
        /** Validate User */
        const { value, error } = validateLogin(req.body);
        if(error){
            const message = cleanString(error?.details[0].message);
            const resData = responseData(false, 'ERR_004', [message], []);
            return res.status(400).json(resData);
        }

        /** Checks if user exists */
        const client = await connectDB();
        const userRecord = await client.query(getUserByUsername(),[username]);
        
        if(userRecord.rowCount > 0){
            const identity = userRecord.rows[0];

            /** Check if password match */
            const password_match = validatePass(password, identity.password);
            if(!password_match) {
                const resData = responseData(false, 'ERR_005', ['Incorrect passsword'], []);
                return res.status(406).json(resData);
            }

            /** Generate session token */
            const token = jwt.sign({ 'user_id': identity.id, 'username': identity.username }, `${process.env.JWT_SECRET}`, {
                expiresIn: '1d',
            });

            const resData = responseData(true, 'OK', ['Login successful'], [{'token': token}]);
            return res.status(200).json(resData);

        } else {

            const resData = responseData(false, 'ERR_006', ['Incorrect username adress'], []);
            return res.status(400).json(resData);
        }

    } catch ( error ) {

        const resData = responseData(false, 'ERR_007', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
}