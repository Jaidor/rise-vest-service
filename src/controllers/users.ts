import express, { Request, Response, NextFunction } from 'express';
import { responseData } from '../utils';
import { connectDB, fetchAllUsers, fetchUserByID } from '../db';

/**
 * Fetch all users
 * @param req 
 * @param res 
 * @param next 
 */

export const getAllUsers = async ( req: Request, res: Response, next: NextFunction ) => {
    try {

        const client = await connectDB();
        const userRecord = await client.query(fetchAllUsers());

        if(userRecord.rows[0]){

            const resData = responseData(true, 'OK', ['Record fetched successfully'], [{'data': userRecord.rows}]);
            return res.status(200).json(resData);

        } else {

            const resData = responseData(false, 'ERR_101', ['No record found'], []);
            return res.status(404).json(resData);

        }

    } catch ( error ) {

        const resData = responseData(false, 'ERR_102', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
}

/**
 * Get single user
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */


export const getUser = async ( req: Request, res: Response, next: NextFunction ) => {
    try {

        const user_id = req.params.id;
        const client = await connectDB();
        const userRecord = await client.query(fetchUserByID(), [user_id]);
        if(userRecord.rows[0]){

            const resData = responseData(true, 'OK', ['Record fetched successfully'], [{'data': userRecord.rows[0]}]);
            return res.status(200).json(resData);

        } else {

            const resData = responseData(false, 'ERR_103', ['No record found'], []);
            return res.status(404).json(resData);

        }

    } catch ( error ) {

        const resData = responseData(false, 'ERR_104', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
}