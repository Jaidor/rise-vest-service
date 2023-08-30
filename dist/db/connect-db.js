"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTables = exports.connectDB = void 0;
const pg_1 = require("pg");
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const DB = new pg_1.Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        // ssl: { rejectUnauthorized: false }
        ssl: false
    });
    yield DB.connect();
    const res = yield DB.query('SELECT $1::text as connected', ['Connected to postgres successful!']);
    console.log(res.rows[0].connected);
    /** Setup Tables */
    (0, exports.setupTables)(DB);
    return DB;
});
exports.connectDB = connectDB;
/** Queries TO Setup Tables */
const setupTables = (DB) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield DB.query(createUsersTable);
    yield DB.query(usersIndex);
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
    yield DB.query(createPostsTable);
    yield DB.query(postIndex);
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
    yield DB.query(createCommentsTable);
    yield DB.query(commentsIndex);
    /** Comments Table Setup Ends Here */
    console.log("🌴🌴🌴🌴 Tables setup completed!");
    yield DB.end();
});
exports.setupTables = setupTables;
