import { t } from "../trpc";
import { z } from "zod";

//new game data:

type BaseCell = {
  territory: string;
  cellWidth: number;
  cellHeight: number;
  fillColor: string;
  xposition: number;
  yposition: number;
  population: number;
  nearby: string[];
};

const initialCellArray: BaseCell[] = [
  {
    territory: "Canada",
    cellWidth: 100,
    cellHeight: 100,
    fillColor: "red",
    xposition: 0,
    yposition: 0,
    population: 1,
    nearby: ["US", "Mexico"],
  },
  {
    territory: "US",
    cellWidth: 100,
    cellHeight: 100,
    fillColor: "green",
    xposition: 100,
    yposition: 0,
    population: 3,
    nearby: ["Canada", "Mexico", "Cuba"],
  },
  {
    territory: "Cuba",
    cellWidth: 100,
    cellHeight: 100,
    fillColor: "red",
    xposition: 200,
    yposition: 0,
    population: 4,
    nearby: ["US", "Mexico"],
  },
  {
    territory: "Mexico",
    cellWidth: 300,
    cellHeight: 100,
    fillColor: "blue",
    xposition: 0,
    yposition: 100,
    population: 9,
    nearby: ["Canada", "US", "Cuba", "Columbia", "Brazil"],
  },
  {
    territory: "Columbia",
    cellWidth: 200,
    cellHeight: 100,
    fillColor: "green",
    xposition: 0,
    yposition: 200,
    population: 2,
    nearby: ["Mexico", "Brazil"],
  },
  {
    territory: "Brazil",
    cellWidth: 100,
    cellHeight: 100,
    fillColor: "red",
    xposition: 200,
    yposition: 200,
    population: 3,
    nearby: ["Mexico", "Columbia"],
  },
];

export const gameRouter = t.router({
  //save gamestate to database

  newGame: t.procedure.mutation(async ({ ctx }) => {
    const game = await ctx.prisma.gameState.create({
      data: {
        game_state: JSON.stringify(initialCellArray),
      },
    });

    return game.id;
  }),

  getGameState: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;
      let game;
      if (id !== "") {
        game = await ctx.prisma.gameState.findFirstOrThrow({
          where: {
            id,
          },
        });
        const gameState = JSON.parse(game.game_state);
        return gameState as BaseCell;
      }
    }),
});
