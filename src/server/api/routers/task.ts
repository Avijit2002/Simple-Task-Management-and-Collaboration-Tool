import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({
            title: z.string().trim().min(1, 'Title is required and cannot be empty'),
            description: z.string().optional().nullable(),
            deadline: z.date().optional().nullable(),
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
        }))
        .mutation(async ({ ctx, input }) => {

            const user = await ctx.db.user.findUnique({
                where: {
                    id: input.userId
                }
            })

            if (user?.id) {
                throw new TRPCError({
                    code: 'FORBIDDEN',
                    message: 'User not found.',
                });
            }

            const createdTask = await ctx.db.task.create({
                data: input
            })

            return {
                status: 201,
                message: "Task created successfully",
                result: createdTask,
            };
        }),


    read: publicProcedure.query(async({ ctx }) => {
        const tasks = await ctx.db.task.findMany()
        return {
            status: 201,
            result: tasks,
        }; 
    }),


    update: publicProcedure
        .input(z.object({
            id: z.string().min(1, 'Task id is required to update the task'),
            title: z.string().trim().min(1, 'Title is required and cannot be empty').optional(),
            description: z.string().optional().nullable(),
            deadline: z.date().optional().nullable(),
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
                .optional()
                .transform((val) => val?.toUpperCase())
                .refine((val) => ['TO DO', 'IN PROGRESS', 'DONE'].includes(val ?? ''), {
                    message: 'Status must be "To Do", "In Progress", or "Done"',
                }),
            completed: z.boolean().optional(),
            userId: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {

            if (input.userId) {
                const user = await ctx.db.user.findUnique({
                    where: {
                        id: input.userId
                    }
                })

                if (user?.id) {
                    throw new TRPCError({
                        code: 'FORBIDDEN',
                        message: 'User not found.',
                    });
                }
            }


            const createdTask = await ctx.db.task.update({
                where: {
                    id: input.id
                },
                data: input
            })

            return {
                status: 201,
                message: "Task updated successfully",
                result: createdTask,
            };
        }),
        

        delete: publicProcedure
        .input(z.object({
            id: z.string().min(1, 'Task id is required to update the task'),
        }))
        .mutation(async ({ ctx, input }) => {

            const result = await ctx.db.task.delete({
                where: {
                    id: input.id
                },
            })

            return {
                status: 201,
                message: "Task deleted successfully",
                result: result.id,
            };
        }),




});
