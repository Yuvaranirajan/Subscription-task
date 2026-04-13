import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
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
    ),
  password: z
    .string()
    .nonempty('Password is Required')
    .min(6, 'Password must be at least 6 characters')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
