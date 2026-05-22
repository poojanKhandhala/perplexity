import express from 'express';
import { registerValidation , loginValidation} from '../validation/auth.validation.js';
import { registerController ,getMeController, loginController,verifyEmailController} from '../controllers/auth.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';
const authRouter = express.Router();



authRouter.post('/register',registerValidation , registerController)
authRouter.get('/verify-email',verifyEmailController);
authRouter.get('/get-me', authUser, getMeController);
/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @returns {string} JWT token
 */

authRouter.post('/login', loginValidation , loginController);

export default authRouter ; 