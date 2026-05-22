import userModel from "../models/user.model.js";
import { sendEmail } from "../services/email.js";
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

    await sendEmail({
        to: email,
        subject: 'Welcome to Perplexity 🚀',
        text: `Hi ${username},

Welcome to Perplexity! We're excited to have you with us.

You can now start exploring, asking questions, and getting instant, reliable answers anytime you need them.

If you ever need help or have any questions, our support team is always here for you.

We are glad you are here — happy exploring!

Best regards,  
The Perplexity Team`
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
