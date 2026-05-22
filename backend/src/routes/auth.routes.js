import express from 'express';
import { registerValidation , loginValidation} from '../validation/auth.validation.js';
import { registerController ,getMeController, loginController,verifyEmailController} from '../controllers/auth.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';
const authRouter = express.Router();



/**
 * @route POST /api/auth/register
 * @desc Register a new user and send verification email
 * @access Public
 * @returns {object} Success message
 */
authRouter.post('/register',registerValidation , registerController)


/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email using token
 * @access Public
 * @returns {object} Success message
 */
authRouter.get('/verify-email',verifyEmailController);



/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user
 * @access Private
 * @returns {object} User object
 */
authRouter.get('/get-me', authUser, getMeController);



/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @returns {string} JWT token
 */
authRouter.post('/login', loginValidation , loginController);

export default authRouter ; 