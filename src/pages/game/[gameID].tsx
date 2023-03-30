import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import Cell from "../../components/Cell";
import { trpc } from "../../utils/trpc";

const blueButtonStyle =
  "disabled:bg-slate-400 bg-blue-600 text-white py-1 px-4 rounded-md uppercase hover:bg-blue-800";

type TroopType = "melee" | "ranged" | "air";

type TradeType = "buy" | "sell" | null;

type TroopMarket = {
  melee: number;
  ranged: number;
  air: number;
};
const initialTroopCosts = { melee: 1, ranged: 3, air: 2 }; //cost of melee, ranged, air

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
  age: number;
};

const colorList = ["red", "green", "blue"];

const handleShare = () => {
  const gameLink = window.location.href;
  navigator.clipboard.writeText(gameLink);
};

const GamePage = () => {
  const { query } = useRouter();

  const gameStateQuery = trpc.game.getGameState.useQuery({
    id: (query?.gameID as unknown as string) || "",
  });

  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [selected, setSelected] = useState<BaseCell | null>(null);
  const [cells, setCells] = useState<BaseCell[]>([]);
  const [netWorths, setNetWorths] = useState<number[]>([]);
  const [troopMarketPrices, setTroopMarketPrices] =
    useState<TroopMarket>(initialTroopCosts);
  const [nextMove, setNextMove] = useState<boolean>(false);
  const [tradingTroop, setTradingTroop] = useState<TradeType>(null);

  useEffect(() => {
    const syncPieces = () => {
      if (gameStateQuery.data) {
        setCells(gameStateQuery.data.cells);
        setCurrentPlayer(gameStateQuery.data.currentPlayer);
        setNetWorths(gameStateQuery.data.netWorths);
        setTroopMarketPrices(gameStateQuery.data.troopMarket);
      }
    };
    syncPieces();
  }, [gameStateQuery.data]);

  useEffect(() => {
    const interval = setInterval(gameStateQuery.refetch, 2000);

    return () => clearInterval(interval);
  }, [gameStateQuery.refetch]);

  type UpdateMoveRef = null | {
    territory1: string;
    territory2: string;
  };

  const updateMoveRef = useRef<UpdateMoveRef>(null);
  const updateMoveMutation = trpc.game.updateMove.useMutation();

  useEffect(() => {
    if (updateMoveRef.current !== null) {
      updateMoveMutation.mutate({
        id: query?.gameID as unknown as string,
        move: updateMoveRef.current,
      });
      updateMoveRef.current = null;
    }
  }, [updateMoveMutation, query?.gameID]);

  //have to do this for next move update, do useEffect to prevent nextMoveMutation from happening endlessly...
  const endMove = () => {
    setNextMove(true);
  };
  const nextMoveMutation = trpc.game.nextMove.useMutation();

  useEffect(() => {
    if (nextMove == true) {
      nextMoveMutation.mutate({
        id: query?.gameID as unknown as string,
      });
      setNextMove(false);
      setSelected(null);
    }
  }, [nextMove, nextMoveMutation, query?.gameID]);

  const tradeTroop = (tradeType: TradeType) => {
    setTradingTroop(tradeType);
  };

  type UpdateTradingTroop = null | {
    territory: string;
    troop: TroopType;
  };

  const tradeTroopMutation = trpc.game.tradeTroop.useMutation();
  const updateTradingTroop = useRef<UpdateTradingTroop>(null);

  useEffect(() => {
    if (tradingTroop) {
      if (updateTradingTroop.current !== null) {
        tradeTroopMutation.mutate({
          id: query?.gameID as unknown as string,
          territory: updateTradingTroop.current.territory,
          troop: updateTradingTroop.current.troop,
          tradeType: tradingTroop,
        });
        updateTradingTroop.current = null;
      }
      setTradingTroop(null);
    }
  }, [tradingTroop, tradeTroopMutation, query?.gameID]);

  const handleClickMaker = (cell: BaseCell) => () => {
    //define current color:
    const currentColor = colorList[currentPlayer];
    let ccolor;
    currentColor ? (ccolor = currentColor) : (ccolor = "red");

    // select the cell it is on, and cell color (so all territories are shown)
    if (selected === null && ccolor == cell.fillColor) {
      //setCcolor(fillColorList[index] as string); // sets color as the
      setSelected(cell);
    }

    if (cell) {
      updateTradingTroop.current = {
        territory: cell.territory,
        troop: cell.troop,
      };
    }
    if (selected) {
      updateMoveRef.current = {
        territory1: selected.territory,
        territory2: cell.territory,
      };

      setSelected(null);
    }
    //move, if selected:
    if (selected !== null) {
      //set the necessary UI to visible here
      if (
        cell &&
        selected &&
        cell.fillColor &&
        ccolor &&
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
      } else if (cell.fillColor === selected.fillColor) {
        setSelected(cell); //just select another territory of same color
      }
    }
  };

  const listItems = cells.map((cell) => {
    const currentColor = colorList[currentPlayer];
    let ccolor;
    currentColor ? (ccolor = currentColor) : (ccolor = "red");

    return (
      //NEED TO ADD IN DATA FROM ALL CELLS, SO CAN SHOW WHICH CELLS ARE NEARBY/ATTACKABLE
      <Cell
        key={cell.territory}
        {...{ cell }}
        selectedFull={cell.fillColor === ccolor}
        selected={selected === cell}
        handleClick={handleClickMaker(cell)}
        allCells={cells}
        {...{ ccolor }}
      />
    );
  });
  //console.log(selected == null);
  return (
    <main className="grid grid-cols-2 gap-4 p-8">
      <svg height="500" width="500">
        {listItems}
      </svg>

      <div className="flex flex-col gap-3 md:px-12">
        <div className="flex flex-col gap-1">
          <div>{`Net worths: [Red: ${Math.round(
            1000 * netWorths[0]
          )}] [Green: ${Math.round(1000 * netWorths[1])}] [Blue: ${Math.round(
            1000 * netWorths[2]
          )}]`}</div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <button
            className={blueButtonStyle}
            type="button"
            onClick={handleShare}
          >
            share game link
          </button>
          <button className={blueButtonStyle} type="button" onClick={endMove}>
            End Move
          </button>
        </div>

        <div>
          {"Melee Buy Price: " +
            Number((1.1 * 1000 * troopMarketPrices["melee"]).toFixed(2)) +
            ", Ranged Buy Price: " +
            Number((1.1 * 1000 * troopMarketPrices["ranged"]).toFixed(2)) +
            ", Air Buy Price: " +
            Number((1.1 * 1000 * troopMarketPrices["air"]).toFixed(2))}
        </div>

        <div>
          {"Melee Sell Price: " +
            Number((0.8 * 1000 * troopMarketPrices["melee"]).toFixed(2)) +
            ", Ranged Sell Price: " +
            Number((0.8 * 1000 * troopMarketPrices["ranged"]).toFixed(2)) +
            ", Air Sell Price: " +
            Number((0.8 * 1000 * troopMarketPrices["air"]).toFixed(2))}
        </div>

        <div className="flex flex-row items-center gap-2">
          <button
            className={blueButtonStyle}
            type="button"
            onClick={() => tradeTroop("buy")}
          >
            Buy Troop
          </button>
          <button
            className={blueButtonStyle}
            type="button"
            onClick={() => tradeTroop("sell")}
          >
            Sell Troop
          </button>
        </div>
      </div>
    </main>
  );
};

export default GamePage;
export { blueButtonStyle };
