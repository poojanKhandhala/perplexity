import express from 'express';
import morgan from 'morgan';
import connectToDB from './config/database.js';
import cookieParser from 'cookie-parser';
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(morgan('dev'));


connectToDB();



export default app;