import express, { Request, Response, NextFunction } from 'express';
import { responseData } from '../utils';

/**
 * Error handler
 * @param req 
 * @param res 
 * @param next 
 */

export const errorHandler = (err:any, req: Request, res:Response, next: NextFunction) => {
    const resData = responseData(false, 'ERR_008', [err.message], []);
    res.status(err.status || 500).json(resData);
}