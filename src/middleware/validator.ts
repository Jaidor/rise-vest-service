import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

/**
 * Validate user
 * @param user 
 * @returns user
 */

export const validateUser = (user: { username: string; firstname: string; lastname: string; email: string; password: string; confirmPassword: string }) => {

    const userSchema = Joi.object({
        username: Joi.string().min(3).max(12).required(),
        firstname: Joi.string().min(3).max(50).required(),
        lastname: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).required(),
        confirmPassword: Joi.ref("password")
    });

    return userSchema.validate(user);
}

/**
 * Validate login
 * @param login 
 * @returns login data
 */

export const validateLogin = (login: { username: string; password: string; }) => {

    const loginSchema = Joi.object({
        username: Joi.string().min(3).max(12).required(),
        password: Joi.string().regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).required(),
    });

    return loginSchema.validate(login);
}

/**
 * Validate post
 * @param posts
 * @returns 
 */

export const validatePosts = (posts: { title: string; }) => {

    const postsSchema = Joi.object({
        title: Joi.string().required(),
    });

    return postsSchema.validate(posts);
}

/**
 * Validate comments
 * @param comments
 * @returns 
 */

export const validateComments = (comments: { title: string; }) => {

    const commentsSchema = Joi.object({
        content: Joi.string().required(),
    });

    return commentsSchema.validate(comments);
}
