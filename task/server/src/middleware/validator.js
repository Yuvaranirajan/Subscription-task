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
            message: 'Validation failed',
            errors: e.errors 
        });
    }
};

export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
});

export const subscriptionSchema = z.object({
    body: z.object({
        planId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Plan ID format'),
    }),
});
