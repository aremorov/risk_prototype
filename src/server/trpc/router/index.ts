import { t } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { gameRouter } from "./gameRouter";

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  game: gameRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
