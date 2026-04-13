import { z } from 'zod';

const emailValidation = z
  .string()
  .nonempty('E-Mail is Required')
    .refine((val) => val.includes('@'), {
      message: "Please include an '@' in the email address. 'E-Mail' is missing an '@'.",
    })
  .refine(
    (val) => {
      if (val.includes('@')) {
        const [, domain] = val.split('@');
        return domain && domain.includes('.');
      }
      return true;
    },
    {
      message: "Please enter a part following '@'. 'E-Mail@' is incomplete.",
    }
  );

const passwordValidation = z
  .string()
  .nonempty('Password is Required')
  .min(6, 'Password must be at least 6 characters')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

export const LoginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .nonempty('Full name is required')
    .max(30, 'Full Name cannot exceed 30 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full Name must only contain letters and spaces'),
  email: emailValidation,
  password: passwordValidation,
});

export type LoginFormData = z.infer<typeof LoginSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
