import express, { 
    Request, 
    Response, 
    NextFunction, 
    Application, 
    ErrorRequestHandler
 } from 'express';

import { Server } from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { config } from 'dotenv';
config();

/** Connect DB */
import { connectDB } from './db/connect-db';

/** Extra Security */
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
/** Extra Security */

/** Routers */
import router from './routes';
/** Routers */

/** Middleware Error Handler */
import { notFound} from './middleware/not-found';
/** Middleware Error Handler */

/** App Use */

const limiter = rateLimiter({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false
})

const app: Application  = express();
app.use(helmet());
app.use(cors({
    credentials: true,
}));
app.use(limiter)
app.use(compression());
app.use(cookieParser());
app.use(express.json());
/** App Use */

/** Route Starts Here */
app.get('/', (req: Request, res: Response) =>{
    res.send('Silence is Golden.')
})
app.get('/api', (req: Request, res: Response) =>{
    res.send('Silence is Golden..')
})
app.get('/api/v1', (req: Request, res: Response) =>{
    res.send('Silence is Golden...')
})
app.post('/', (req: Request, res: Response) =>{
    res.send('Silence is Golden....')
})
app.post('/api', (req: Request, res: Response) =>{
    res.send('Silence is Golden.....')
})
app.post('/api/v1', (req: Request, res: Response) =>{
    res.send('Silence is Golden......')
})

app.use('/', router())
/** Routes Ends Here */

/** Error Handler */
app.use(notFound);
/** Error Handler */


const PORT: Number = Number(process.env.APP_PORT) || 3000;
const start = async () => {
    try {
        await connectDB();
        const server: Server = app.listen(PORT, () => {
            console.log(`🚀 🚀 🚀 Server is listening on port ${PORT}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start();