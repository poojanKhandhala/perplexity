import express from 'express';
import { registerValidation , loginValidation} from '../validation/auth.validation.js';
import { registerController } from '../controllers/auth.controller.js';

const authRouter = express.Router();



authRouter.post('/register',registerValidation , registerController)
authRouter.post('/login',loginValidation)


export default authRouter ; 