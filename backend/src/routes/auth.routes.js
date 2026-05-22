import express from 'express';
import { registerValidation , loginValidation} from '../validation/auth.validation.js';
const authRouter = express.Router();


authRouter.post('/register',registerValidation)
authRouter.post('/login',loginValidation)


export default authRouter ; 