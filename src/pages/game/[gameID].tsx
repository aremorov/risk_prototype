import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import Cell from "../../components/Cell";
import Form from "../../components/Form";
import { trpc } from "../../utils/trpc";

const blueButtonStyle =
  "disabled:bg-slate-400 bg-blue-600 text-white py-1 px-4 rounded-md uppercase hover:bg-blue-800";

const tnum: number[] = []; //territory number

for (let i = 0; i < 7; i++) {
  tnum.push(i);
}

type BaseCell = {
  shape: string;
  territory: string;
  fillColor: string;
  xposition: number;
  yposition: number;
  troop: string;
  population: number;
  nearby: string[];
  terrain: string;
};

const handleShare = () => {
  const gameLink = window.location.href;
  navigator.clipboard.writeText(gameLink);
};

const GamePage = () => {
  const { query } = useRouter();

  const gameStateQuery = trpc.game.getGameState.useQuery({
    id: (query?.gameID as unknown as string) || "",
  });

  const updateMoveMutation = trpc.game.updateMove.useMutation();

  const [ccolor, setCcolor] = useState<string | null>(null);
  const [selected, setSelected] = useState<BaseCell | null>(null);
  const [cells, setCells] = useState<BaseCell[]>([]);

  useEffect(() => {
    const syncPieces = () => {
      if (gameStateQuery.data) {
        setCells(gameStateQuery.data.cells);
        setCcolor(gameStateQuery.data.ccolor);
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

  // updateMoveRef.current = {selected, cellPiece}

  useEffect(() => {
    if (updateMoveRef.current !== null) {
      updateMoveMutation.mutate({
        id: query?.gameID as unknown as string,
        move: updateMoveRef.current,
      });

      updateMoveRef.current = null;
    }
  }, [updateMoveMutation, query?.gameID]);

  const handleClickMaker = (cell: BaseCell) => () => {
    // select the cell it is on, and cell color (so all territories are shown)
    if (selected === null && ccolor == cell.fillColor) {
      //setCcolor(fillColorList[index] as string); // sets color as the
      setSelected(cell);
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

        //change color to next one:
        if (ccolor === "red" && selected !== null) {
          setCcolor("green");
          setSelected(null);
        }
        if (ccolor === "green" && selected !== null) {
          setCcolor("blue");
          setSelected(null);
        }
        if (ccolor === "blue" && selected !== null) {
          setCcolor("red");
          setSelected(null);
        }
      } else if (cell.fillColor === selected.fillColor) {
        setSelected(cell); //just select another territory of same color
      }
    }
  };

  const listItems = cells.map((cell) => {
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

  return (
    <div>
      <div>Map</div>
      <svg height="500" width="500">
        {listItems}
      </svg>

      <button className={blueButtonStyle} type="button" onClick={handleShare}>
        share game link
      </button>
    </div>
  );
};

export default GamePage;
export { blueButtonStyle };
