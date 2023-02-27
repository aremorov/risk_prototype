import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import Cell from "../../components/Cell";
import { trpc } from "../../utils/trpc";

const blueButtonStyle =
  "disabled:bg-slate-400 bg-blue-600 text-white py-1 px-4 rounded-md uppercase hover:bg-blue-800";

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
  const [nextMove, setNextMove] = useState<boolean>(false);
  const [tradingTroop, setTradingTroop] = useState<boolean>(false);

  useEffect(() => {
    const syncPieces = () => {
      if (gameStateQuery.data) {
        setCells(gameStateQuery.data.cells);
        setCurrentPlayer(gameStateQuery.data.currentPlayer);
        setNetWorths(gameStateQuery.data.netWorths);
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

  const tradeTroop = () => {
    setTradingTroop(true);
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
        });
        updateTradingTroop.current = null;
      }
      setTradingTroop(false);
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
    <div>
      <div>Map</div>
      <div>{"Red net worth: " + netWorths[0]}</div>
      <div>{"Green net worth: " + netWorths[1]}</div>
      <div>{"Blue net worth: " + netWorths[2]}</div>

      <svg height="500" width="500">
        {listItems}
      </svg>

      <button className={blueButtonStyle} type="button" onClick={handleShare}>
        share game link
      </button>
      <button className={blueButtonStyle} type="button" onClick={endMove}>
        End Move
      </button>
      <div>{"Melee Cost: 1, Ranged Cost: 3, Air Cost: 2"}</div>

      <button className={blueButtonStyle} type="button" onClick={tradeTroop}>
        Buy Troop
      </button>
    </div>
  );
};

export default GamePage;
export { blueButtonStyle };
