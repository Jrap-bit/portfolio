import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const viewsRouter = createTRPCRouter({
  get: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
    const record = await db.view.findUnique({
      where: { slug: input.slug },
    });

    return record?.count ?? 0;
  }),

  increment: publicProcedure.input(z.object({ slug: z.string() })).mutation(async ({ input }) => {
    const record = await db.view.upsert({
      where: { slug: input.slug },
      update: { count: { increment: 1 } },
      create: {
        slug: input.slug,
        count: 1,
      },
    });

    return record.count;
  }),
});