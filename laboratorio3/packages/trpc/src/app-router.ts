import { dbClient } from "@ucr/db-client";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { healthEndpoint } from "./router/health";
import { ucrRouter } from "./router/ucr";
import { createTRPCRouter } from "./trpc";

export const createTRPCContext = async () => {
  return { dbClient };
};

export const appRouter = createTRPCRouter({
  health: healthEndpoint,
  ucr: ucrRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
