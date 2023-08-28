import express, { Request, Response, NextFunction } from 'express';
import { validateComments } from '../middleware/validator';
import { cleanString, responseData } from '../utils';
import { connectDB, addComments } from '../db';
import users from '../routes/users';
import comments from '../routes/comments';

/**
 * Create comments
 * @param req 
 * @param res 
 * @param next 
 */

export const createComments = async ( req: Request, res: Response, next: NextFunction ) => {
    try {

        /** Validate posts */
        const { value, error } = validateComments(req.body);
        if(error){
            const message = cleanString(error?.details[0].message);
            const resData = responseData(false, 'ERR_110', [message], []);
            return res.status(400).json(resData);
        }

        /** Insert record */
        const client = await connectDB();
        const dateCreated = new Date();
        client.query(addComments(),[req.params.id, req.body.content, dateCreated], (error, result) => {
            if(error){
                const resData = responseData(false, 'ERR_111', ['Unable to add comments, please try again'], []);
                return res.status(400).json(resData)
            }

            if(result){
                const resData = responseData(true, 'OK', ['Congratulations!, Your comments has been posted'], []);
                return res.status(201).json(resData);
            }
        });

    } catch ( error ) {

        const resData = responseData(false, 'ERR_112', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }
}

/**
 * Fetch  latest
 * comments
 * @param req 
 * @param res 
 * @param next 
 */

export const getUsersWithLatestPostsAndComments = async ( req: Request, res: Response, next: NextFunction ) => {
    try {

        const client = await connectDB();
        const records = await client.query('SELECT users.id, users.username, posts.title, comments.content FROM users LEFT JOIN posts ON users.id = posts.user_id LEFT JOIN comments ON posts.id = comments.posts_id ORDER BY (SELECT COUNT(posts.id) FROM posts WHERE posts.user_id = users.id) desc LIMIT 3');

        if(records.rows[0]){

            const resData = responseData(true, 'OK', ['The top three users with the most post and latest comments fetched successfully'], [{'data': records.rows}]);
            return res.status(200).json(resData);

        } else {

            const resData = responseData(false, 'ERR_108', ['No record found'], []);
            return res.status(404).json(resData);

        }

    } catch ( error ) {

        console.log(error);

        const resData = responseData(false, 'ERR_113', ['Error occurred, please try again later'], []);
        return res.status(500).json(resData);
    }


    return res.send("I love my DAD...");
}