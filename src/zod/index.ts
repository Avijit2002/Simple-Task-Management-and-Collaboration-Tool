import { z } from "zod";

export const zodSignup = z.object({
    email: z.string().trim().email("This is not a valid email.").transform((val) => val?.toLowerCase()),
    password: z.string().trim().min(6, { message: "Must be 6 or more characters long" }),
})

export type typeSignup = z.infer<typeof zodSignup>