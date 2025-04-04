// src/server/api/routers/post.ts

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getLatest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.post.create({
        data: { name: input.name },
      });
    }),
});