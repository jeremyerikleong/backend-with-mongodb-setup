import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username) {
            return res.status(400).json({
                status: 'fail',
                data: {
                    message: 'username is required'
                }
            });
        }

        if (!email) {
            return res.status(400).json({
                status: 'fail',
                data: {
                    message: 'email is required'
                }
            });
        }

        if (!password) {
            return res.status(400).json({
                status: 'fail',
                data: {
                    message: 'password is required'
                }
            });
        }

        if (password.length < 8 || password.length > 20) {
            return res.status(400).json({
                status: 'fail',
                data: {
                    message: "Password must be 8–20 characters"
                }
            });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                status: 'fail',
                data: {
                    message: 'user already exists!, try login'
                }
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
            data: { id: user._id, email: user.email, username: user.username }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(400).json({
                status: 'fail',
                data: {
                    message: 'User not found'
                }
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                status: 'fail',
                data: {
                    message: 'Invalid email or password'
                }
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        )

        res.status(200).json({
            status: 'success',
            data: {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username
                }
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

export async function logoutUser(req, res) {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        })

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                data: {
                    message: 'User not found'
                }
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                message: 'You have successfully logged out'
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}