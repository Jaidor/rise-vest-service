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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
/** Connect DB */
// import { connectDB } from './db/connect-db';
/** Extra Security */
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
/** Extra Security */
/** Routers */
const routes_1 = __importDefault(require("./routes"));
/** Routers */
/** Middleware Error Handler */
const not_found_1 = require("./middleware/not-found");
const error_handler_1 = require("./middleware/error-handler");
/** Middleware Error Handler */
/** App Use */
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
});
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use(limiter);
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
/** App Use */
/** Route Starts Here */
app.get('/', (req, res) => {
    res.send('Silence is Golden.');
});
app.get('/api', (req, res) => {
    res.send('Silence is Golden..');
});
app.get('/api/v1', (req, res) => {
    res.send('Silence is Golden...');
});
app.post('/', (req, res) => {
    res.send('Silence is Golden....');
});
app.post('/api', (req, res) => {
    res.send('Silence is Golden.....');
});
app.post('/api/v1', (req, res) => {
    res.send('Silence is Golden......');
});
app.use('/', (0, routes_1.default)());
/** Routes Ends Here */
/** Error Handler */
app.use(not_found_1.notFound);
app.use(error_handler_1.errorHandler);
/** Error Handler */
const server = http_1.default.createServer(app);
const PORT = Number(process.env.APP_PORT) || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await connectDB();
        server.listen(process.env.APP_PORT || 3000, () => {
            console.log(`🚀 🚀 🚀 Server is listening on port ${PORT}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
// npm install -D supertest @types/supertest
// npm install _D jest ts-jest @types/jest
// npx ts-jest config:init
