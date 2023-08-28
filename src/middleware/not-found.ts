import express, { Request, Response, NextFunction } from 'express';
import { responseData } from '../utils';

/**
 * Not found
 * Error handler
 * @param req 
 * @param res 
 * @param next 
 */

export const notFound = (req: Request, res:Response, next: NextFunction) => {
    const resData = responseData(false, 'ERR_008', ['Route does not exist...'], []);
    res.status(404).json(resData);
}