import { z } from "zod";

export const zodSignup = z.object({
    email: z.string().trim().email("This is not a valid email.").transform((val) => val?.toLowerCase()),
    password: z.string().trim().min(6, { message: "Must be 6 or more characters long" }),
})

export const zodTaskCreate = z.object({
    title: z.string().trim().min(1, 'Title is required and cannot be empty'),
    description: z.string().optional().nullable(),
    deadline: z.coerce.date().optional().nullable(),
    priority: z
        .string()
        .optional()
        .nullable()
        .transform((val) => val?.toUpperCase())
        .refine((val) => ['HIGH', 'MEDIUM', 'LOW'].includes(val ?? ''), {
            message: 'Priority must be "High", "Medium", or "Low"',
        }),
    status: z
        .string()
        .transform((val) => val?.toUpperCase())
        .refine((val) => ['TO DO', 'IN PROGRESS', 'DONE'].includes(val ?? ''), {
            message: 'Status must be "To Do", "In Progress", or "Done"',
        }),
    completed: z.boolean().optional(),
    userId: z.string(),
    teamUserId: z.string().optional()
})

export type typeSignup = z.infer<typeof zodSignup>

export type typeTaskCreate = z.infer<typeof zodTaskCreate >