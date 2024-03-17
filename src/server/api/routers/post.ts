import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  read: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      select:{
        id:true,
        name:true
      }
    })
  }),

  delete: publicProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ ctx,input }) => {
    return ctx.db.post.delete({
      where:{
        id: input.id
      }
    })
  }),
});
