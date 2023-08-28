import express, { Request, Response, NextFunction } from 'express';
import { validatePosts } from '../middleware/validator';
import { cleanString, responseData } from '../utils';
import { connectDB, addPosts, fetchAllPosts } from '../db';

/**
 * Create posts
 * @param req 
 * @param res 
 * @param next 
 */

export const createPosts = async ( req: Request, res: Response, next: NextFunction ) => {
    try {

        /** Validate posts */
        const { value, error } = validatePosts(req.body);
        if(error){
            const message = cleanString(error?.details[0].message);
            const resData = responseData(false, 'ERR_105', [message], []);
            return res.status(400).json(resData);
        }

        /** Insert record */
        const client = await connectDB();
        const dateCreated = new Date();
        client.query(addPosts(),[res.locals.user.userID, req.body.title, dateCreated], (error, result) => {
            if(error){
                const resData = responseData(false, 'ERR_106', ['Unable to create posts, please try again'], []);
                return res.status(400).json(resData)
            }

            if(result){
                const resData = responseData(true, 'OK', ['Congratulations!, Your posts has been created successfully'], []);
                return res.status(201).json(resData);
            }
        });

    } catch ( error ) {

        const resData = responseData(false, 'ERR_107', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
}

/**
 * Fetch all posts
 * Of a user
 * @param req 
 * @param res 
 * @param next 
 */

export const getAllPosts = async ( req: Request, res: Response, next: NextFunction ) => {
    try {

        const client = await connectDB();
        const postsRecord = await client.query(fetchAllPosts());

        if(postsRecord.rows[0]){

            const resData = responseData(true, 'OK', ['Posts fetched successfully'], [{'data': postsRecord.rows}]);
            return res.status(200).json(resData);

        } else {

            const resData = responseData(false, 'ERR_108', ['No record found'], []);
            return res.status(404).json(resData);

        }

    } catch ( error ) {

        const resData = responseData(false, 'ERR_109', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
}