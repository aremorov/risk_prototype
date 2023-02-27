import { t } from "../trpc";
import { z } from "zod";

//new game data:

type TroopType = "melee" | "ranged" | "air";

type BaseCell = {
  shape: string;
  territory: string;
  fillColor: string;
  xposition: number;
  yposition: number;
  troop: TroopType;
  population: number;
  nearby: string[];
  terrain: string;
};

const colorList = ["red", "green", "blue"];

type TroopMarket = {
  melee: number;
  ranged: number;
  air: number;
};

type GameStateObject = {
  cells: BaseCell[];
  currentPlayer: number;
  netWorths: number[];
  troopMarket: TroopMarket;
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
    population: 10,
    nearby: ["A1", "A5"],
    terrain: "hills",
  },
  {
    shape: "M 100,0 200,0 200,100 100,100 Z",
    territory: "A1",
    fillColor: "blue",
    xposition: 120,
    yposition: 20,
    troop: "air",
    population: 13,
    nearby: ["A0", "A2", "A6"],
    terrain: "plains",
  },
  {
    shape: "M 200,0 300,0 300,100 200,100 Z",
    territory: "A2",
    fillColor: "blue",
    xposition: 220,
    yposition: 20,
    troop: "melee",
    population: 2,
    nearby: ["A1", "A3", "A7"],
    terrain: "forest",
  },
  {
    shape: "M 300,0 400,0 400,100 300,100 Z",
    territory: "A3",
    fillColor: "red",
    xposition: 320,
    yposition: 20,
    troop: "air",
    population: 2,
    nearby: ["A2", "A4", "A8"],
    terrain: "hills",
  },
  {
    shape: "M 400,0 500,0 500,100 400,100 Z",
    territory: "A4",
    fillColor: "green",
    xposition: 420,
    yposition: 20,
    troop: "ranged",
    population: 1,
    nearby: ["A3", "A9"],
    terrain: "hills",
  },
  {
    shape: "M 0,100 100,100 100,200 0,200 Z",
    territory: "A5",
    fillColor: "blue",
    xposition: 20,
    yposition: 120,
    troop: "ranged",
    population: 3,
    nearby: ["A0", "A10", "A6"],
    terrain: "plains",
  },
  {
    shape: "M 100,100 200,100 200,200 100,200 Z",
    territory: "A6",
    fillColor: "blue",
    xposition: 120,
    yposition: 120,
    troop: "melee",
    population: 1,
    nearby: ["A5", "A7", "A1", "A11"],
    terrain: "hills",
  },
  {
    shape: "M 200,100 300,100 300,200 200,200 Z",
    territory: "A7",
    fillColor: "red",
    xposition: 220,
    yposition: 120,
    troop: "melee",
    population: 6,
    nearby: ["A6", "A8", "A2", "A12"],
    terrain: "forest",
  },
  {
    shape: "M 300,100 400,100 400,200 300,200 Z",
    territory: "A8",
    fillColor: "blue",
    xposition: 320,
    yposition: 120,
    troop: "melee",
    population: 6,
    nearby: ["A7", "A9", "A3", "A13"],
    terrain: "hills",
  },
  {
    shape: "M 400,100 500,100 500,200 400,200 Z",
    territory: "A9",
    fillColor: "green",
    xposition: 420,
    yposition: 120,
    troop: "air",
    population: 3,
    nearby: ["A4", "A14", "A8"],
    terrain: "hills",
  },
  {
    shape: "M 0,200 100,200 100,300 0,300 Z",
    territory: "A10",
    fillColor: "blue",
    xposition: 20,
    yposition: 220,
    troop: "ranged",
    population: 8,
    nearby: ["A5", "A15", "A11"],
    terrain: "hills",
  },
  {
    shape: "M 100,200 200,200 200,300 100,300 Z",
    territory: "A11",
    fillColor: "blue",
    xposition: 120,
    yposition: 220,
    troop: "air",
    population: 8,
    nearby: ["A10", "A12", "A6", "A16"],
    terrain: "hills",
  },
  {
    shape: "M 200,200 300,200 300,300 200,300 Z",
    territory: "A12",
    fillColor: "blue",
    xposition: 220,
    yposition: 220,
    troop: "melee",
    population: 3,
    nearby: ["A11", "A13", "A7", "A17"],
    terrain: "forest",
  },
  {
    shape: "M 300,200 400,200 400,300 300,300 Z",
    territory: "A13",
    fillColor: "green",
    xposition: 320,
    yposition: 220,
    troop: "air",
    population: 6,
    nearby: ["A12", "A14", "A8", "A18"],
    terrain: "plains",
  },
  {
    shape: "M 400,200 500,200 500,300 400,300 Z",
    territory: "A14",
    fillColor: "red",
    xposition: 420,
    yposition: 220,
    troop: "melee",
    population: 5,
    nearby: ["A9", "A19", "A13"],
    terrain: "hills",
  },
  {
    shape: "M 0,300 100,300 100,400 0,400 Z",
    territory: "A15",
    fillColor: "green",
    xposition: 20,
    yposition: 320,
    troop: "ranged",
    population: 4,
    nearby: ["A10", "A20", "A16"],
    terrain: "forest",
  },
  {
    shape: "M 100,300 200,300 200,400 100,400 Z",
    territory: "A16",
    fillColor: "green",
    xposition: 120,
    yposition: 320,
    troop: "ranged",
    population: 8,
    nearby: ["A15", "A17", "A11", "A21"],
    terrain: "forest",
  },
  {
    shape: "M 200,300 300,300 300,400 200,400 Z",
    territory: "A17",
    fillColor: "blue",
    xposition: 220,
    yposition: 320,
    troop: "air",
    population: 8,
    nearby: ["A16", "A18", "A12", "A22"],
    terrain: "forest",
  },
  {
    shape: "M 300,300 400,300 400,400 300,400 Z",
    territory: "A18",
    fillColor: "red",
    xposition: 320,
    yposition: 320,
    troop: "ranged",
    population: 9,
    nearby: ["A17", "A19", "A13", "A23"],
    terrain: "forest",
  },
  {
    shape: "M 400,300 500,300 500,400 400,400 Z",
    territory: "A19",
    fillColor: "blue",
    xposition: 420,
    yposition: 320,
    troop: "air",
    population: 7,
    nearby: ["A14", "A24", "A18"],
    terrain: "forest",
  },
  {
    shape: "M 0,400 100,400 100,500 0,500 Z",
    territory: "A20",
    fillColor: "green",
    xposition: 20,
    yposition: 420,
    troop: "air",
    population: 1,
    nearby: ["A15", "A21"],
    terrain: "plains",
  },
  {
    shape: "M 100,400 200,400 200,500 100,500 Z",
    territory: "A21",
    fillColor: "blue",
    xposition: 120,
    yposition: 420,
    troop: "ranged",
    population: 5,
    nearby: ["A20", "A22", "A16"],
    terrain: "forest",
  },
  {
    shape: "M 200,400 300,400 300,500 200,500 Z",
    territory: "A22",
    fillColor: "green",
    xposition: 220,
    yposition: 420,
    troop: "melee",
    population: 2,
    nearby: ["A21", "A23", "A17"],
    terrain: "forest",
  },
  {
    shape: "M 300,400 400,400 400,500 300,500 Z",
    territory: "A23",
    fillColor: "blue",
    xposition: 320,
    yposition: 420,
    troop: "air",
    population: 6,
    nearby: ["A22", "A24", "A18"],
    terrain: "hills",
  },
  {
    shape: "M 400,400 500,400 500,500 400,500 Z",
    territory: "A24",
    fillColor: "blue",
    xposition: 420,
    yposition: 420,
    troop: "melee",
    population: 3,
    nearby: ["A19", "A23"],
    terrain: "forest",
  },
];

const initialTroopCosts = { melee: 1, ranged: 3, air: 2 }; //cost of melee, ranged, air

const zTroopTypes = z.enum(["melee", "ranged", "air"]);
type zTroopTypes = z.infer<typeof zTroopTypes>; // "melee", "ranged", "air"

const initialGameState: GameStateObject = {
  cells: initialCellArray,
  currentPlayer: 0,
  netWorths: [10, 10, 10],
  troopMarket: initialTroopCosts,
};

type troopAttributes = {
  health: number;
  damage: number;
};

type BattleConditions = {
  attackers: number;
  defenders: number;
  attackerAttributes: troopAttributes;
  defenderAttributes: troopAttributes;
  attackerBonus: number;
  defenderBonus: number;
};

const battle = (battleconditions: BattleConditions): number => {
  const {
    attackers,
    defenders,
    attackerAttributes,
    defenderAttributes,
    attackerBonus,
    defenderBonus,
  } = battleconditions;

  const attackerHealth = attackerAttributes.health * attackerBonus;
  const attackerDamage = attackerAttributes.damage;

  const defenderHealth = defenderAttributes.health * defenderBonus;
  const defenderDamage = defenderAttributes.damage;

  let attackerArmy = Array(attackers);
  attackerArmy.fill(attackerHealth);

  let defenderArmy = Array(defenders);
  defenderArmy.fill(defenderHealth);

  while (attackerArmy.length * defenderArmy.length !== 0) {
    const smallerArmySize = Math.min(attackerArmy.length, defenderArmy.length);

    for (let k = 0; k < smallerArmySize; k++) {
      //attacker attacks defender (attacker bonus)
      const defender = Math.floor(Math.random() * defenderArmy.length);
      defenderArmy[defender] = defenderArmy[defender] - attackerDamage;

      //defender attacks attacker
      const attacker = Math.floor(Math.random() * attackerArmy.length);
      attackerArmy[attacker] = attackerArmy[attacker] - defenderDamage;

      //remove dead troops:
      attackerArmy = attackerArmy.filter((x) => x > 0);
      defenderArmy = defenderArmy.filter((x) => x > 0);
    }

    const remainingTroops =
      Math.max(attackerArmy.length, defenderArmy.length) - smallerArmySize;

    if (attackerArmy.length > defenderArmy.length) {
      //more attackers, remaining attackers attack
      for (let k = 0; k < remainingTroops; k++) {
        //attacker attacks defender
        const defender = Math.floor(Math.random() * defenderArmy.length);
        defenderArmy[defender] = defenderArmy[defender] - attackerDamage;

        //remove dead troops:
        defenderArmy = defenderArmy.filter((x) => x > 0);
      }
    }

    if (defenderArmy.length > attackerArmy.length) {
      //more defenders, remaining defenders attack
      for (let k = 0; k < remainingTroops; k++) {
        //defender attacks attacker
        const attacker = Math.floor(Math.random() * attackerArmy.length);
        attackerArmy[attacker] = attackerArmy[attacker] - defenderDamage;

        //remove dead troops:
        attackerArmy = attackerArmy.filter((x) => x > 0);
      }
    }
  }
  //positive value: Attackers win, negative: defenders win, if both are 0, defender wins with 1 troop left
  return attackerArmy.length > 0
    ? attackerArmy.length
    : Math.min(-1, -defenderArmy.length);
};

//attributes of different troops:

const meleeAttributes: troopAttributes = {
  health: 10,
  damage: 2,
};

const rangedAttributes: troopAttributes = {
  health: 10,
  damage: 2,
};

const airAttributes: troopAttributes = {
  health: 10,
  damage: 2,
};

const rangedNearby = (location: BaseCell): string[] => {
  const doubleNearby: string[] = [];
  location.nearby.forEach((territoryName) => {
    doubleNearby.push(territoryName);
    const nearbyCell = initialCellArray.find(
      (cell) => cell.territory == territoryName
    ); //find nearby cell objects
    if (nearbyCell !== undefined) {
      nearbyCell.nearby.forEach((nearbyTerritory) => {
        if (
          !doubleNearby.includes(nearbyTerritory) &&
          nearbyTerritory !== location.territory
        ) {
          doubleNearby.push(nearbyTerritory);
        }
      });
    }
  });
  return doubleNearby;
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

      const { cells, currentPlayer, netWorths, troopMarket } = gameState;

      const currentColor = colorList[currentPlayer];
      let ccolor;
      currentColor ? (ccolor = currentColor) : (ccolor = "red");

      const selected = cells.find(
        (BaseCell) => BaseCell.territory === territory1
      );

      const cell = cells.find((BaseCell) => BaseCell.territory === territory2);

      let moved = false;

      // handle attack
      if (selected !== null) {
        if (
          cell &&
          selected &&
          cell.fillColor !== selected.fillColor &&
          cell.population >= 1 &&
          selected.population > 1
        ) {
          //now have to describe what happens for each possible interaction: melee, ranged, air
          //air attacking:
          if (
            selected.troop == "air" &&
            selected.nearby.includes(cell.territory)
          ) {
            //attacking with air
            if (cell.troop == "melee") {
              const meleeForestBonus = cell.terrain == "forest" ? 4 : 2;
              const airvsmelee: BattleConditions = {
                attackers: selected.population - 1,
                defenders: cell.population,
                attackerAttributes: airAttributes,
                defenderAttributes: meleeAttributes,
                attackerBonus: 4,
                defenderBonus: meleeForestBonus,
              };
              const battleResults = battle(airvsmelee);
              if (battleResults > 0) {
                //attackers win
                cell.fillColor = ccolor;
                cell.population = battleResults;
                selected.population = 1; //attacking cell
                cell.troop = "air"; //change troop type
              }
              if (battleResults < 0) {
                //defenders win, just change population
                cell.population = -battleResults;
                selected.population = 1; //attacking cell
              }
            }
            if (cell.troop == "ranged") {
              //in any case, ranged should be stronger:
              const rangedHillBonus = cell.terrain == "hills" ? 4 : 2;
              const airvsranged: BattleConditions = {
                attackers: selected.population - 1,
                defenders: cell.population,
                attackerAttributes: airAttributes,
                defenderAttributes: rangedAttributes,
                attackerBonus: 1,
                defenderBonus: rangedHillBonus,
              };
              const battleResults = battle(airvsranged);
              if (battleResults > 0) {
                //attackers win
                cell.fillColor = ccolor;
                cell.population = battleResults;
                selected.population = 1; //attacking cell
                cell.troop = "air"; //change troop type
              }
              if (battleResults < 0) {
                //defenders win, just change population
                cell.population = -battleResults;
                selected.population = 1; //attacking cell
              }
            }
            if (cell.troop == "air") {
              const airvsair: BattleConditions = {
                attackers: selected.population - 1,
                defenders: cell.population,
                attackerAttributes: airAttributes,
                defenderAttributes: airAttributes,
                attackerBonus: 1,
                defenderBonus: 1,
              };
              const battleResults = battle(airvsair);
              if (battleResults > 0) {
                //attackers win
                cell.fillColor = ccolor;
                cell.population = battleResults;
                selected.population = 1; //attacking cell
                cell.troop = "air"; //change troop type
              }
              if (battleResults < 0) {
                //defenders win, just change population
                cell.population = -battleResults;
                selected.population = 1; //attacking cell
              }
            }
          }
          //melee attacking
          if (
            selected.troop == "melee" &&
            selected.nearby.includes(cell.territory)
          ) {
            //get bonus if melee attacks forest cell:
            const meleeForestBonus = cell.terrain == "forest" ? 4 : 2;
            //melee vs air:
            if (cell.troop == "air") {
              const meleevsair: BattleConditions = {
                attackers: selected.population - 1,
                defenders: cell.population,
                attackerAttributes: meleeAttributes,
                defenderAttributes: airAttributes,
                attackerBonus: meleeForestBonus,
                defenderBonus: 4, //need to have this match airvsmelee...
              };
              const battleResults = battle(meleevsair);
              if (battleResults > 0) {
                //attackers win
                cell.fillColor = ccolor;
                cell.population = battleResults;
                selected.population = 1; //attacking cell
                cell.troop = "melee"; //change troop type
              }
              if (battleResults < 0) {
                //defenders win, just change population
                cell.population = -battleResults;
                selected.population = 1; //attacking cell
              }
            }
            if (cell.troop == "ranged") {
              //hills have 2x bonus, but ranged have to still be regularly weaker
              const rangedHillBonus = cell.terrain == "hills" ? 2 : 1;
              const meleevsranged: BattleConditions = {
                attackers: selected.population - 1,
                defenders: cell.population,
                attackerAttributes: meleeAttributes,
                defenderAttributes: rangedAttributes,
                attackerBonus: meleeForestBonus,
                defenderBonus: rangedHillBonus,
              };
              const battleResults = battle(meleevsranged);
              if (battleResults > 0) {
                //attackers win
                cell.fillColor = ccolor;
                cell.population = battleResults;
                selected.population = 1; //attacking cell
                cell.troop = "melee"; //change troop type
              }
              if (battleResults < 0) {
                //defenders win, just change population
                cell.population = -battleResults;
                selected.population = 1; //attacking cell
              }
            }
            if (cell.troop == "melee") {
              const meleevsmelee: BattleConditions = {
                attackers: selected.population - 1,
                defenders: cell.population,
                attackerAttributes: meleeAttributes,
                defenderAttributes: meleeAttributes,
                attackerBonus: 1,
                defenderBonus: 1,
              };
              const battleResults = battle(meleevsmelee);
              if (battleResults > 0) {
                //attackers win
                cell.fillColor = ccolor;
                cell.population = battleResults;
                selected.population = 1; //attacking cell
                cell.troop = "melee"; //change troop type
              }
              if (battleResults < 0) {
                //defenders win, just change population
                cell.population = -battleResults;
                selected.population = 1; //attacking cell
              }
            }
          }
          //additional range if on hill:
          const nearRanged =
            selected.terrain == "hills"
              ? rangedNearby(selected)
              : selected.nearby;
          //range attacking
          if (
            selected.troop == "ranged" &&
            nearRanged.includes(cell.territory)
          ) {
            //ranged attacking bonus is from the selected cell (ranged are stationary when attacking)
            const rangedHillBonus = selected.terrain == "hills" ? 4 : 2;
            //melee beat ranged:
            if (cell.troop == "melee") {
              const rangedvsmelee: BattleConditions = {
                attackers: selected.population - 1,
                defenders: cell.population,
                attackerAttributes: rangedAttributes,
                defenderAttributes: meleeAttributes,
                attackerBonus: rangedHillBonus,
                defenderBonus: 4,
              };
              const battleResults = battle(rangedvsmelee);
              if (battleResults > 0) {
                //attackers win
                cell.fillColor = ccolor;
                cell.population = battleResults;
                selected.population = 1; //attacking cell
                cell.troop = "ranged"; //change troop type
              }
              if (battleResults < 0) {
                //defenders win, just change population
                cell.population = -battleResults;
                selected.population = 1; //attacking cell
              }
            }
            if (cell.troop == "ranged") {
              const rangedDefenderHillBonus = cell.terrain == "hills" ? 4 : 2;
              const rangedvsranged: BattleConditions = {
                attackers: selected.population - 1,
                defenders: cell.population,
                attackerAttributes: rangedAttributes,
                defenderAttributes: rangedAttributes,
                attackerBonus: rangedHillBonus,
                defenderBonus: rangedDefenderHillBonus,
              };
              const battleResults = battle(rangedvsranged);
              if (battleResults > 0) {
                //attackers win
                cell.fillColor = ccolor;
                cell.population = battleResults;
                selected.population = 1; //attacking cell
                cell.troop = "ranged"; //change troop type
              }
              if (battleResults < 0) {
                //defenders win, just change population
                cell.population = -battleResults;
                selected.population = 1; //attacking cell
              }
            }
            if (cell.troop == "air") {
              const rangedvsair: BattleConditions = {
                attackers: selected.population - 1,
                defenders: cell.population,
                attackerAttributes: rangedAttributes,
                defenderAttributes: airAttributes,
                attackerBonus: rangedHillBonus,
                defenderBonus: 1,
              };
              const battleResults = battle(rangedvsair);
              if (battleResults > 0) {
                //attackers win
                cell.fillColor = ccolor;
                cell.population = battleResults;
                selected.population = 1; //attacking cell
                cell.troop = "ranged"; //change troop type
              }
              if (battleResults < 0) {
                //defenders win, just change population
                cell.population = -battleResults;
                selected.population = 1; //attacking cell
              }
            }
          }
        } //else if (cell?.fillColor === selected?.fillColor) {
        //   setSelected(cell); //just select another territory of same color
        // }
      }

      gameState = {
        cells: cells,
        currentPlayer: currentPlayer,
        netWorths: netWorths,
        troopMarket: troopMarket,
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

  nextMove: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      const game = await ctx.prisma.gameState.findFirstOrThrow({
        where: {
          id,
        },
      });

      let gameState = JSON.parse(game.game_state) as GameStateObject;

      const { cells, netWorths, troopMarket } = gameState;
      let { currentPlayer } = gameState;

      //change player index to next one (next turn):
      currentPlayer = (currentPlayer + 1) % 3;

      //update net worths
      cells.forEach((cell) => {
        const player = colorList.findIndex((color) => color == cell.fillColor);
        netWorths[player]++;
      });

      gameState = {
        cells: cells,
        currentPlayer: currentPlayer,
        netWorths: netWorths,
        troopMarket: troopMarket,
      };

      await ctx.prisma.gameState.update({
        where: {
          id,
        },
        data: {
          game_state: JSON.stringify(gameState),
        },
      });
      return true;
    }),

  tradeTroop: t.procedure
    .input(
      z.object({ id: z.string(), territory: z.string(), troop: zTroopTypes })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, territory, troop } = input;

      //gets game:
      const game = await ctx.prisma.gameState.findFirstOrThrow({
        where: {
          id,
        },
      });
      //get game state data
      let gameState = JSON.parse(game.game_state) as GameStateObject;

      const { cells, currentPlayer, netWorths, troopMarket } = gameState;

      const currentColor = colorList[currentPlayer];
      let ccolor;
      currentColor ? (ccolor = currentColor) : (ccolor = "red");

      const selected = cells.find(
        (BaseCell) => BaseCell.territory === territory
      );

      const currentNetWorth = netWorths[currentPlayer];

      if (selected && selected?.fillColor == ccolor && currentNetWorth) {
        selected.population++;
        netWorths[currentPlayer] = currentNetWorth - troopMarket[troop];
        troopMarket[troop] = troopMarket[troop] * 1.1;
      }
      //update game state
      gameState = {
        cells: cells,
        currentPlayer: currentPlayer,
        netWorths: netWorths,
        troopMarket: troopMarket,
      };

      await ctx.prisma.gameState.update({
        where: {
          id,
        },
        data: {
          game_state: JSON.stringify(gameState),
        },
      });
      return true;
    }),
});
