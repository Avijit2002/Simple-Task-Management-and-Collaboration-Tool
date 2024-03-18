import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { hash } from "argon2";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    signup: publicProcedure
        .input(z.object({
            email: z.string().trim().email("This is not a valid email.").transform((val) => val?.toUpperCase()),
            password: z.string().trim().min(6, { message: "Must be 6 or more characters long" }),
        }))
        .mutation(async ({ ctx, input }) => {

            const { email, password } = input

            const exists = await ctx.db.user.findUnique({
                where: {
                    email
                }
            })
            if (exists?.id) {
                throw new TRPCError({
                    code: 'FORBIDDEN',
                    message: 'This email is already registered.',
                });
            }

            const hashedPassword = await hash(password);

            const result = await ctx.db.user.create({
              data: { email, password: hashedPassword },
            });
        
            return {
              status: 201,
              message: "Account created successfully",
              result: result.email,
            };
        }),

});
