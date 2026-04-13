import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import sendResponse from '../utils/responseWrapper.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    });
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return sendResponse(res, 400, 'User already exists', null, 'register');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return sendResponse(res, 201, 'Account created successfully', {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            token,
        }, 'register');
    } else {
        return sendResponse(res, 400, 'Invalid user data', null, 'register');
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return sendResponse(res, 200, 'Logged in successfully', {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            token,
        }, 'login');
    } else {
        return sendResponse(res, 400, 'Invalid email or password', null, 'login');
    }
};

export const getUser = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
        return sendResponse(res, 404, 'User not found', null, 'getUserProfile');
    }
    return sendResponse(res, 200, 'fetched successfully', user, 'getUserProfile');
};

export const refreshTokenHandler = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return sendResponse(res, 401, 'Not authorized, no refresh token', null, 'refreshToken');
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return sendResponse(res, 404, 'User not found', null, 'refreshToken');
        }

        const token = generateToken(user._id);
        return sendResponse(res, 200, 'Token refreshed successfully', { token }, 'refreshToken');
    } catch (error) {
        console.error(error);
        return sendResponse(res, 401, 'Not authorized, token failed', null, 'refreshToken');
    }
};

export const logoutUser = (req, res) => {
    res.cookie('refreshToken', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    return sendResponse(res, 200, 'Logged out successfully', null, 'logout');
};
