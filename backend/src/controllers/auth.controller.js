import userModel from "../models/user.model.js";
import { sendEmail } from "../services/email.js";
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';


export async function registerController(req, res) {

    const { email, password, username } = req.body;
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ email }, { username }]
    });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: 'User already exists',
            success: false
        })
    }

    const user = await userModel.create({
        email,
        username,
        password
    });

    const emailVerificationToken = jwt.sign({ userId: user._id }, config.JWT_SECRET_KEY);

    await sendEmail({
        to: email,
        subject: 'Welcome to Perplexity 🚀',
        html: `
    <div style="font-family: Arial, sans-serif; background-color: #f6f8fa; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 24px; border-radius: 10px;">

            <h2 style="font-size: 20px; margin-bottom: 16px;">
                Welcome to Perplexity, ${username} 🚀
            </h2>

            <p style="font-size: 15px; line-height: 1.6;">
                We're excited to have you on board.
            </p>

            <p style="font-size: 15px; line-height: 1.6;">
                You can now explore, ask questions, and get instant, reliable answers anytime.
            </p>

            <p style="font-size: 15px; line-height: 1.6;">
                Please verify your email address to activate your account:
            </p>

            <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}"
               style="display: inline-block; padding: 10px 16px; background-color: #2563eb; color: #ffffff; 
               text-decoration: none; border-radius: 6px; font-size: 14px; margin-top: 8px;">
                Verify Email
            </a>

            <p style="font-size: 14px; line-height: 1.6; margin-top: 20px;">
                If you need help, our support team is always here for you.
            </p>

            <p style="font-size: 14px; margin-top: 20px;">
                Best regards,<br/>
                <strong>The Perplexity Team</strong>
            </p>

        </div>
    </div>
    `
    });

    res.status(201).json({
        message: 'User registered successfully',
        success: true,
        user: {
            id: user._id,
            email: user.email,
            username: user.username
        }
    })
}

export async function verifyEmailController(req, res) {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        user.verified = true;
        await user.save();

        const html = `
        <div style="font-family: Arial, sans-serif; background-color: #f6f8fa; padding: 30px;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 24px; border-radius: 10px;">
                <h2 style="font-size: 20px; margin-bottom: 16px;">
                    Email Verification Successful
                </h2>
                <p style="font-size: 15px; line-height: 1.6;">
                    Thank you for verifying your email address. You can now enjoy all the features of our platform.
                </p>
            </div>
        </div>
        `;
        res.send(html);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid or expired token',
            success: false
        });
    }
}

export async function loginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: 'User not found',
            success: false
        });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: 'Invalid password',
            success: false
        });
    }
    if (!user.verified) {
        return res.status(403).json({
            message: 'Email not verified. Please verify your email before logging in.',
            success: false
        });
    }

    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET_KEY);

    res.cookie('token', token);

    res.status(200).json({
        message: 'Login successful',
        success: true,
        user : {
            id: user._id,
            email: user.email,
            username: user.username
        }
    });


}

export async function getMeController(req, res) {
    const userId = req.user.userId;

    const user = await userModel.findById(userId).select('-password');

    if (!user) {
        return res.status(404).json({
            message: 'User not found',
            success: false
        });
    }

    res.status(200).json({
        message: 'User retrieved successfully',
        success: true,
        user
    });
}
