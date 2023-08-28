import express, { Request, Response, NextFunction } from 'express';
import { validateUser } from '../middleware/validator';
import { cleanString, responseData, hashPassword } from '../utils';
import { connectDB, addUser, checkEmailExists } from '../db';

export const createUser = async ( req: Request, res: Response, next: NextFunction ) => {
    try {

        const { username, firstname, lastname, email, password } = req.body;
        /** Validate User */
        const { value, error } = validateUser(req.body);
        if(error){
            const message = cleanString(error?.details[0].message);
            const resData = responseData(false, 'ERR_000', [message], []);
            return res.status(400).json(resData);
        }

        /** Checks if email already exists */
        const client = await connectDB();
        client.query(checkEmailExists(),[email], (error, result) => {
            if(result.rows.length){
                const resData = responseData(false, 'ERR_001', [`Email (${email}) already exists`], []);
                return res.status(400).json(resData);
            }
        });

        /** Hash password  */
        const hashedPass = hashPassword( password );

        /** Insert record */
        const dateCreated = new Date();
        client.query(addUser(),[username, firstname, lastname, email, hashedPass, dateCreated], (error, result) => {
            if(error){
                const resData = responseData(false, 'ERR_002', ['Unable to create user, please try again'], []);
                res.status(400).json(resData)
            }

            if(result){
                const resData = responseData(true, 'OK', ['Congratualtions!, Your account has been created successfully'], []);
                return res.status(201).json(resData);
            }
        });

    } catch ( error ) {

        const resData = responseData(false, 'ERR_003', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
}