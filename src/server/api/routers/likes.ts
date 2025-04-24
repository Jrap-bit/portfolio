// src/server/api/routers/likes.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const likesRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const like = await ctx.db.like.findUnique({
        where: { slug: input.slug },
      });
      return like?.count ?? 0;
    }),

  increment: publicProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const updated = await ctx.db.like.upsert({
        where: { slug: input.slug },
        create: { slug: input.slug, count: 1 },
        update: { count: { increment: 1 } },
      });
      return updated.count;
    }),
});