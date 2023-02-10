import { t } from "../trpc";
import { z } from "zod";

//new game data:

type BaseCell = {
  shape: string;
  territory: string;
  fillColor: string;
  xposition: number;
  yposition: number;
  troop: string;
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
    shape: "M 0,0 100,0 100,100 0,100 Z",
    territory: "A0",
    fillColor: "red",
    xposition: 20,
    yposition: 20,
    troop: "ranged",
    population: 6,
    nearby: ["A1", "A5"],
  },
  {
    shape: "M 100,0 200,0 200,100 100,100 Z",
    territory: "A1",
    fillColor: "green",
    xposition: 120,
    yposition: 20,
    troop: "melee",
    population: 1,
    nearby: ["A0", "A2", "A6"],
  },
  {
    shape: "M 200,0 300,0 300,100 200,100 Z",
    territory: "A2",
    fillColor: "green",
    xposition: 220,
    yposition: 20,
    troop: "ranged",
    population: 4,
    nearby: ["A1", "A3", "A7"],
  },
  {
    shape: "M 300,0 400,0 400,100 300,100 Z",
    territory: "A3",
    fillColor: "green",
    xposition: 320,
    yposition: 20,
    troop: "ranged",
    population: 2,
    nearby: ["A2", "A4", "A8"],
  },
  {
    shape: "M 400,0 500,0 500,100 400,100 Z",
    territory: "A4",
    fillColor: "green",
    xposition: 420,
    yposition: 20,
    troop: "melee",
    population: 4,
    nearby: ["A3", "A9"],
  },
  {
    shape: "M 0,100 100,100 100,200 0,200 Z",
    territory: "A5",
    fillColor: "green",
    xposition: 20,
    yposition: 120,
    troop: "ranged",
    population: 1,
    nearby: ["A0", "A10", "A6"],
  },
  {
    shape: "M 100,100 200,100 200,200 100,200 Z",
    territory: "A6",
    fillColor: "red",
    xposition: 120,
    yposition: 120,
    troop: "ranged",
    population: 3,
    nearby: ["A5", "A7", "A1", "A11"],
  },
  {
    shape: "M 200,100 300,100 300,200 200,200 Z",
    territory: "A7",
    fillColor: "red",
    xposition: 220,
    yposition: 120,
    troop: "melee",
    population: 4,
    nearby: ["A6", "A8", "A2", "A12"],
  },
  {
    shape: "M 300,100 400,100 400,200 300,200 Z",
    territory: "A8",
    fillColor: "red",
    xposition: 320,
    yposition: 120,
    troop: "air",
    population: 7,
    nearby: ["A7", "A9", "A3", "A13"],
  },
  {
    shape: "M 400,100 500,100 500,200 400,200 Z",
    territory: "A9",
    fillColor: "green",
    xposition: 420,
    yposition: 120,
    troop: "ranged",
    population: 2,
    nearby: ["A4", "A14", "A8"],
  },
  {
    shape: "M 0,200 100,200 100,300 0,300 Z",
    territory: "A10",
    fillColor: "green",
    xposition: 20,
    yposition: 220,
    troop: "melee",
    population: 1,
    nearby: ["A5", "A15", "A11"],
  },
  {
    shape: "M 100,200 200,200 200,300 100,300 Z",
    territory: "A11",
    fillColor: "red",
    xposition: 120,
    yposition: 220,
    troop: "ranged",
    population: 3,
    nearby: ["A10", "A12", "A6", "A16"],
  },
  {
    shape: "M 200,200 300,200 300,300 200,300 Z",
    territory: "A12",
    fillColor: "green",
    xposition: 220,
    yposition: 220,
    troop: "melee",
    population: 7,
    nearby: ["A11", "A13", "A7", "A17"],
  },
  {
    shape: "M 300,200 400,200 400,300 300,300 Z",
    territory: "A13",
    fillColor: "blue",
    xposition: 320,
    yposition: 220,
    troop: "melee",
    population: 7,
    nearby: ["A12", "A14", "A8", "A18"],
  },
  {
    shape: "M 400,200 500,200 500,300 400,300 Z",
    territory: "A14",
    fillColor: "red",
    xposition: 420,
    yposition: 220,
    troop: "ranged",
    population: 6,
    nearby: ["A9", "A19", "A13"],
  },
  {
    shape: "M 0,300 100,300 100,400 0,400 Z",
    territory: "A15",
    fillColor: "green",
    xposition: 20,
    yposition: 320,
    troop: "air",
    population: 1,
    nearby: ["A10", "A20", "A16"],
  },
  {
    shape: "M 100,300 200,300 200,400 100,400 Z",
    territory: "A16",
    fillColor: "red",
    xposition: 120,
    yposition: 320,
    troop: "ranged",
    population: 5,
    nearby: ["A15", "A17", "A11", "A21"],
  },
  {
    shape: "M 200,300 300,300 300,400 200,400 Z",
    territory: "A17",
    fillColor: "green",
    xposition: 220,
    yposition: 320,
    troop: "ranged",
    population: 3,
    nearby: ["A16", "A18", "A12", "A22"],
  },
  {
    shape: "M 300,300 400,300 400,400 300,400 Z",
    territory: "A18",
    fillColor: "red",
    xposition: 320,
    yposition: 320,
    troop: "melee",
    population: 2,
    nearby: ["A17", "A19", "A13", "A23"],
  },
  {
    shape: "M 400,300 500,300 500,400 400,400 Z",
    territory: "A19",
    fillColor: "green",
    xposition: 420,
    yposition: 320,
    troop: "ranged",
    population: 9,
    nearby: ["A14", "A24", "A18"],
  },
  {
    shape: "M 0,400 100,400 100,500 0,500 Z",
    territory: "A20",
    fillColor: "green",
    xposition: 20,
    yposition: 420,
    troop: "melee",
    population: 1,
    nearby: ["A15", "A21"],
  },
  {
    shape: "M 100,400 200,400 200,500 100,500 Z",
    territory: "A21",
    fillColor: "green",
    xposition: 120,
    yposition: 420,
    troop: "ranged",
    population: 9,
    nearby: ["A20", "A22", "A16"],
  },
  {
    shape: "M 200,400 300,400 300,500 200,500 Z",
    territory: "A22",
    fillColor: "red",
    xposition: 220,
    yposition: 420,
    troop: "melee",
    population: 2,
    nearby: ["A21", "A23", "A17"],
  },
  {
    shape: "M 300,400 400,400 400,500 300,500 Z",
    territory: "A23",
    fillColor: "red",
    xposition: 320,
    yposition: 420,
    troop: "air",
    population: 8,
    nearby: ["A22", "A24", "A18"],
  },
  {
    shape: "M 400,400 500,400 500,500 400,500 Z",
    territory: "A24",
    fillColor: "blue",
    xposition: 420,
    yposition: 420,
    troop: "ranged",
    population: 6,
    nearby: ["A19", "A23"],
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
