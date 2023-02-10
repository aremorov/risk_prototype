import { t } from "../trpc";
import { z } from "zod";

//new game data:

type BaseCell = {
  shape: string;
  territory: string;
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
    shape:
      "M 10.538661,23.945017 159.41259,48.008335 113.60523,152.28273 41.076903,172.33549 Z",
    territory: "Canada",
    fillColor: "red",
    xposition: 40,
    yposition: 50,
    population: 1,
    nearby: ["US", "Mexico"],
  },
  {
    shape:
      "M 113.60523,152.28273 277.74829,184.36715 239.57549,72.071657 159.41259,48.008335 Z",
    territory: "US",
    fillColor: "blue",
    xposition: 150,
    yposition: 70,
    population: 3,
    nearby: ["Canada", "Mexico", "Cuba"],
  },
  {
    shape:
      "M 239.70429,73.334189 276.91866,184.97728 378.71088,153.23562 332.74021,79.90143 Z",
    territory: "Cuba",
    fillColor: "red",
    xposition: 250,
    yposition: 85,
    population: 4,
    nearby: ["US", "Mexico"],
  },
  {
    shape:
      "M 41.076903,172.33549 37.259625,276.60988 312.10382,260.56766 380.81484,152.28273 277.74829,184.36715 113.60523,152.28273 Z",
    territory: "Mexico",
    fillColor: "green",
    xposition: 130,
    yposition: 160,
    population: 9,
    nearby: ["Canada", "US", "Cuba", "Columbia", "Brazil"],
  },
  {
    shape:
      "M 37.259625,276.60988 56.346024,400.93703 209.03722,412.96871 174.68173,268.58879 Z",
    territory: "Columbia",
    fillColor: "blue",
    xposition: 60,
    yposition: 300,
    population: 2,
    nearby: ["Mexico", "Brazil"],
  },
  {
    shape:
      "M 209.03722,412.96871 H 361.72844 L 313.46947,260.56766 174.68173,268.58879 Z",
    territory: "Brazil",
    fillColor: "red",
    xposition: 220,
    yposition: 300,
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

      // handle attack
      if (selected !== null) {
        //set the necessary UI to visible here
        if (
          cell &&
          selected &&
          cell.fillColor !== selected.fillColor &&
          selected.nearby.includes(cell.territory) &&
          cell.population >= 0 &&
          selected.population > 1
        ) {
          if (cell.population < selected.population) {
            cell.fillColor = ccolor; //change color
          }
          //attack with all troops - 1
          cell.population = Math.abs(cell.population - selected.population + 1); //attacked cell
          selected.population = 1; //attacking cell

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
