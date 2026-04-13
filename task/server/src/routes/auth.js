import express from 'express';
import { registerUser, loginUser, getUser, logoutUser, refreshTokenHandler } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate, registerSchema, loginSchema } from '../middleware/validator.js';

const router = express.Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUser);
router.get('/refresh-token', refreshTokenHandler);

export default router;
