import crypto from 'crypto';
import bcrypt from 'bcryptjs';

/**
 * cleaned sring 
 * incase of special character
 * @param data 
 * @returns clean_message_final
 */

export const cleanString = ( data: string ) => {
    const cleaned = data.replace('\\', "");
    const cleaned_message = cleaned.replace('"', "");
    const cleaned_final = cleaned_message.replace('\\', "");
    const cleaned_message_final = cleaned_final.replace('"', "");
    return cleaned_message_final;
}

/**
 * Hash password
 * @param string 
 * @returns password
 */

export const hashPassword = ( string: string ) => {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(string, salt);
	return password;
}

/**
 * Validate password
 * @param pass 
 * @param hashedPass 
 * @returns boolean
 */

export const validatePass = ( pass: string, hashedPass: string ) => {
    const isMatch = bcrypt.compareSync(pass, hashedPass);
	if(isMatch) return true;
	else return false;
}

/**
 * Json output
 * To be uniformed
 * Across the
 * Application
 * @param status 
 * @param code 
 * @param message 
 * @param response 
 * @returns responseData
 */

export const responseData = ( status: boolean, code: string, message: any[] = [], response: any[] = [] ) => {
    const responseData = {'data' : { 'status': status, 'code': code, 'message': message, 'response': response } };
    return responseData;
}