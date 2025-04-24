import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Prisma } from "@prisma/client";

const CommentInput = z.object({
  slug: z.string().min(1),
  name: z.string().optional(),
  text: z.string().min(1).max(1000),
  honeypot: z.string().optional(), // trap bots
});

export const commentRouter = createTRPCRouter({
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.comment.findMany({
        where: { slug: input.slug },
        orderBy: { createdAt: "desc" },
      });
    }),

  add: publicProcedure
    .input(CommentInput)
    .mutation(async ({ ctx, input }) => {
      if (input.honeypot && input.honeypot.length > 0) {
        throw new Error("Bot detected");
      }

      // very simple rate limit (could be replaced with IP + timestamp later)
      const now = Date.now();
      const lastComment = await ctx.db.comment.findFirst({
        where: { slug: input.slug },
        orderBy: { createdAt: "desc" },
      });

      if (
        lastComment &&
        new Date(lastComment.createdAt).getTime() > now - 3000
      ) {
        throw new Error("You're commenting too fast. Try again in a few seconds.");
      }

      return await ctx.db.comment.create({
        data: {
          slug: input.slug,
          name: input.name || "Anonymous",
          text: input.text,
          ip: ctx.ip || null,
          honeypot: input.honeypot || "",
        },
      });
    }),
});