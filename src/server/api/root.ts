import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { likesRouter } from "./routers/likes";
import { viewsRouter } from "./routers/views";
import { commentRouter } from "./routers/comments";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  likes: likesRouter,
  views: viewsRouter,
  comments: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
