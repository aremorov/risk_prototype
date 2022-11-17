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

type CurrentColor = "red" | "green" | "blue";

type GameStateObject = {
  cells: BaseCell[];
  ccolor: CurrentColor;
};

const ZMove = z.object({
  territory1: z.string(),
  territory2: z.string(),
});

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

const initialGameState: GameStateObject = {
  cells: initialCellArray,
  ccolor: "red",
};

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
        return gameState as GameStateObject;
      }
    }),

  updateMove: t.procedure
    .input(z.object({ id: z.string(), move: ZMove }))
    .mutation(async ({ input, ctx }) => {
      const { id, move } = input;

      //check if move is valid:

      const { territory1, territory2 } = move;
      //gets game:
      const game = await ctx.prisma.gameState.findFirstOrThrow({
        where: {
          id,
        },
      });

      let gameState = JSON.parse(game.game_state) as GameStateObject;

      const { cells } = gameState;
      let { ccolor } = gameState;

      let selected = cells.find(
        (BaseCell) => BaseCell.territory === territory1
      );

      const cell = cells.find((BaseCell) => BaseCell.territory === territory2);

      let moved = false;

      // Handle moving to empty cell
      if (selected !== null) {
        //set the necessary UI to visible here
        if (
          cell &&
          selected &&
          cell.fillColor !== selected.fillColor &&
          selected.nearby.includes(cell.territory) &&
          selected.population > 0 &&
          cell.population > 0
        ) {
          cell.population -= 1;
          selected.population -= 1;

          //change color to next one:
          if (ccolor === "red" && selected !== undefined) {
            ccolor = "green";
            selected = undefined;
          }
          if (ccolor === "green" && selected !== undefined) {
            ccolor = "blue";
            selected = undefined;
          }
          if (ccolor === "blue" && selected !== undefined) {
            ccolor = "red";
            selected = undefined;
          }
        } //else if (cell?.fillColor === selected?.fillColor) {
        //   setSelected(cell); //just select another territory of same color
        // }
      }

      gameState = {
        cells: cells,
        ccolor: ccolor,
      };

      {
        await ctx.prisma.gameState.update({
          where: {
            id,
          },
          data: {
            game_state: JSON.stringify(gameState),
          },
        });
        moved = true;
      }

      return moved;
    }),
});
