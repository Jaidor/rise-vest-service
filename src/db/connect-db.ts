import { AnyARecord } from 'dns';
import { Client } from 'pg'

export const connectDB = async () => {
    const DB = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        ssl: false,
    });
    await DB.connect();
    const res = await DB.query('SELECT $1::text as connected', ['Connected to postgres successful!']);
    console.log(res.rows[0].connected);

    /** Setup Tables */
    setupTables( DB );
    return DB;
};

/** Queries TO Setup Tables */
export const setupTables = async ( DB: any) => {

    /** Users Table Setup Starts Here */    
    let createUsersTable = `CREATE TABLE IF NOT EXISTS users (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        username VARCHAR(100) NOT NULL,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at DATE,
        updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
    )`;

    let usersIndex = `CREATE UNIQUE INDEX IF NOT EXISTS email
    ON users (email)`;

    await DB.query(createUsersTable);
    await DB.query(usersIndex);
    /** Users Table Setup Ends Here */


    /** Posts Table Setup Starts Here */
    let createPostsTable = `CREATE TABLE IF NOT EXISTS posts (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        user_id INT,
        title TEXT NOT NULL,
        created_at DATE,
        updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
    )`;

    let postIndex = `CREATE INDEX IF NOT EXISTS user_id
    ON posts (user_id)`;

    await DB.query(createPostsTable);
    await DB.query(postIndex);
    /** Posts Table Setup Ends Here */


    /** Comments Table Setup Starts Here */
    let createCommentsTable = `CREATE TABLE IF NOT EXISTS comments (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        posts_id INT,
        content TEXT,
        created_at DATE,
        updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
    )`;
    let commentsIndex = `CREATE INDEX IF NOT EXISTS posts_id
    ON comments (posts_id)`;

    await DB.query(createCommentsTable);
    await DB.query(commentsIndex);
    /** Comments Table Setup Ends Here */

    console.log("🌴🌴🌴🌴 Tables setup completed!");
    await DB.end();
}