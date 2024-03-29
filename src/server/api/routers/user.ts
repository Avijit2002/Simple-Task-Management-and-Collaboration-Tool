import { TRPCError } from "@trpc/server";

import { signIn } from "next-auth/react";
import { zodSignup } from "~/zod";


import bcrypt from "bcrypt";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    signup: publicProcedure
        .input(zodSignup)
        .mutation(async ({ ctx, input }) => {
            console.log(input)
            const { email, password } = input

            // const users:object[] = await ctx.db.$queryRaw`SELECT * FROM User;`
            // console.log(users[0])

            try {
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

                const hashedPassword = await bcrypt.hash(password,10);

                const result = await ctx.db.user.create({
                    data: { email, password: hashedPassword },
                });

                return {
                    status: 201,
                    message: "Account created successfully",
                    result: result.email,
                };

            } catch (error) {
                if (!(error instanceof TRPCError)) {
                    throw new TRPCError({
                        code: 'FORBIDDEN',
                        message: 'DB error.',
                    });

                } else {
                    throw error
                }

            }


        }),

    searchuser: publicProcedure.input(String).mutation(async({ ctx, input }) => {

        const data = await ctx.db.user.findMany({
            where: {
                OR: [
                    {
                        email: {
                            startsWith: input,
                            mode: 'insensitive'
                        }
                    },
                    {
                        name: {
                            startsWith: input,
                            mode: 'insensitive'
                        }
                    },
                ]
            },
            select:{
                email: true,
                id: true,
                name: true
            }
        })
        return {
            status: 200,
            message: "users found",
            result: data
        };
    })

    // signin: publicProcedure
    //     .input(z.object({
    //         email: z.string().trim().email("This is not a valid email.").transform((val) => val?.toUpperCase()),
    //         password: z.string().trim().min(6, { message: "Must be 6 or more characters long" }),
    //     }))
    //     .mutation(async ({ ctx, input }) => {

    //         const { email, password } = input;

    //         try {
    //             await signIn("credentials", { redirect: false, email, password });
    //         } catch (error) {
    //             console.log(error)
    //             throw new TRPCError({
    //                 code: 'FORBIDDEN',
    //                 message: 'Error Signing in...',
    //             });
    //         }

    //         return {
    //             status: 201,
    //             message: "Signin success successfully",
    //         };
    //     }),

});
