import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { zodTaskCreate, zodTaskUpdate } from "~/zod";

export const taskRouter = createTRPCRouter({
    create: publicProcedure
        .input(zodTaskCreate)
        .mutation(async ({ ctx, input }) => {

            console.log(input)
            let createdTask

            if(input.teamUserId){
                const user = await ctx.db.user.findUnique({
                    where: {
                        id: input.teamUserId
                    }
                })
                //console.log(user)
    
                if (!user?.id) {
                    throw new TRPCError({
                        code: 'FORBIDDEN',
                        message: 'Teammate User not found.',
                    });
                }

                createdTask = await ctx.db.task.create({
                    data: {
                        title: input.title,
                        description: input.description,
                        deadline: input.deadline,
                        priority: input.priority,
                        status: input.status,
                        completed: input.completed,
                        users: {
                            connect: [
                                {
                                    id: input.userId
                                },
                                {
                                    id: input.teamUserId
                                }
                            ]
                        }
                    }
                })

            }else{
                createdTask = await ctx.db.task.create({
                    data: {
                        title: input.title,
                        description: input.description,
                        deadline: input.deadline,
                        priority: input.priority,
                        status: input.status,
                        completed: input.completed,
                        users: {
                            connect: [
                                {
                                    id: input.userId
                                }
                            ]
                        }
                    }
                })


            }

            

            return {
                status: 201,
                message: "Task created successfully",
                result: createdTask,
            };
        }),


    read: publicProcedure
        .input(
            z.object({
                userId: z.string().min(1)
            })
        )
        .mutation(async ({ ctx, input }) => {

            const tasks = await ctx.db.task.findMany({
                where: {
                    users:{
                        some: {
                            id:{equals: input.userId}
                        }
                    }
                },
                include:{
                    users:{
                        select:{
                            id:true,
                            email:true,
                            name: true
                        }
                    }
                }
                
            })

            console.log(tasks)
            return {
                status: 201,
                result: tasks,
            };
        }),


    update: publicProcedure
        .input(zodTaskUpdate)
        .mutation(async ({ ctx, input }) => {

            let createdTask

            if(input.teamUserId){
                const user = await ctx.db.user.findUnique({
                    where: {
                        id: input.teamUserId
                    }
                })
                //console.log(user)
    
                if (!user?.id) {
                    throw new TRPCError({
                        code: 'FORBIDDEN',
                        message: 'Teammate User not found.',
                    });
                }


                createdTask = await ctx.db.task.update({
                    where: {
                        id:input.id
                    },
                    data: {
                        title: input.title,
                        description: input.description,
                        deadline: input.deadline,
                        priority: input.priority,
                        status: input.status,
                        completed: input.completed,
                        users: {
                            connect: [
                                {
                                    id: input.teamUserId
                                }
                            ]
                        }
                    }
                })

            }else{
                const { userId, teamUserId, ...data} = input
                createdTask = await ctx.db.task.update({
                    where: {
                        id: input.id
                    },
                    data
                })


            }


            return {
                status: 201,
                message: "Task updated successfully",
                result: createdTask,
            };
        }),


    delete: publicProcedure
        .input(String)
        .mutation(async ({ ctx, input }) => {

            const result = await ctx.db.task.delete({
                where: {
                    id: input
                },
            })

            return {
                status: 201,
                message: "Task deleted successfully",
                result: result.id,
            };
        }),




});
