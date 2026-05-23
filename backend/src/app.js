import express from 'express';
import morgan from 'morgan';
import connectToDB from './config/database.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cors from 'cors'
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true , 
    methods : ['GET','POST','PUT','DELETE']
}))

connectToDB();

app.use('/api/auth',authRouter);


export default app;