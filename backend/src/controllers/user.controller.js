import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

export async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username) {
            return res.status(400).json({
                status: 'error',
                message: 'username is required'
            });
        }

        if (!email) {
            return res.status(400).json({
                status: 'error',
                message: 'email is required'
            });
        }

        if (!password) {
            return res.status(400).json({
                status: 'error',
                message: 'password is required'
            });
        }

        if (password.length < 8 || password.length > 20) {
            return res.status(400).json({
                status: 'error',
                message: "Password must be 8–20 characters"
            });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                status: 'error',
                message: 'user already exists!, try login'
            });
        }

        const user = new User({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        await user.save();

        res.status(201).json({
            status: 'success',
            message: 'successfully registered an account',
            data: { id: user._id, email: user.email, username: user.username }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: err.message
        });
    }
}