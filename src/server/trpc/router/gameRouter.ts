import { t } from "../trpc";
import { z } from "zod";
import { contextProps } from "@trpc/react/dist/internals/context";

export const gameRouter = t.router({
  //save gamestate to database

  newGame: t.procedure.mutation(async ({ ctx }) => {
    const game = await ctx.prisma.gameState.create({
      data: {
        game_state: JSON.stringify(initialGameState),
      },
    });

    return game.id;
  }),
});
