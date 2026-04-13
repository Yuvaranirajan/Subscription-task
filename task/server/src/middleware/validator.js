import { z } from 'zod';

export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: e.errors 
        });
    }
};

const emailValidation = z.string().email();
const passwordValidation = z.string().min(6);

export const registerSchema = z.object({
    body: z.object({
        name: z
            .string()
            .max(30, 'Name cannot exceed 30 characters')
            .regex(/^[a-zA-Z\s]+$/, 'Name must only contain letters and spaces'),
        email: emailValidation,
        password: passwordValidation,
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: emailValidation,
        password: passwordValidation,
    }),
});

export const subscriptionSchema = z.object({
    body: z.object({
        planId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Plan ID format'),
    }),
});
