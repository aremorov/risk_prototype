import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect, useState, useRef } from "react";
import Cell from "./cells";
import Form from "./form";
import { trpc } from "../utils/trpc";

const tnum: number[] = []; //territory number

for (let i = 0; i < 7; i++) {
  tnum.push(i);
}

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

const CellArray: BaseCell[] = [
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

// const cellWidthList: number[] = [100, 100, 100, 300, 200, 100]; //territory number
// const cellHeightList: number[] = [100, 100, 100, 100, 100, 100]; //territory number
// const fillColorList: string[] = ["red", "green", "red", "blue", "green", "red"];
// const xPositionList: number[] = [0, 100, 200, 0, 0, 200];
// const yPositionList: number[] = [0, 0, 0, 100, 200, 200];
// const populationList: number[] = [1, 3, 4, 9, 2, 3]; //I thought values are reassigned...

const adjMatrix: number[][] = [
  //6x6 matrix representing adjacency
  [0, 1, 0, 1, 0, 0], //neighbouring first territory
  [1, 0, 1, 1, 0, 0],
  [0, 1, 0, 1, 0, 0],
  [1, 1, 1, 0, 1, 1],
  [0, 0, 0, 1, 0, 1],
  [0, 0, 0, 1, 1, 0],
];

const HomePage = () => {
  const [ccolor, setCcolor] = useState<string | null>(null);
  const [selected, setSelected] = useState<BaseCell | null>(null);

  if (ccolor === null) {
    //set color in the beginning
    setCcolor("red");
  }

  const handleClickMaker = (cell: BaseCell) => () => {
    // select the cell it is on, and cell color (so all territories are shown)
    if (selected === null && ccolor == cell.fillColor) {
      //setCcolor(fillColorList[index] as string); // sets color as the
      setSelected(cell);
    }
    //move, if selected:
    if (selected !== null) {
      //set the necessary UI to visible here
      if (
        cell.fillColor !== selected.fillColor &&
        selected.nearby.includes(cell.territory) &&
        selected.population > 0 &&
        cell.population > 0
      ) {
        cell.population -= 1;
        selected.population -= 1;

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

  //CHANGE TO CELL OBJECT INSTEAD OF DISTINCT LISTS
  // const listItems = tnum.map((i) => {
  //   if (!cellWidthList[i]) {
  //     return null;
  //   }
  //   return (
  //     <Cell
  //       key={i}
  //       cellWidth={cellWidthList[i]}
  //       cellHeight={cellHeightList[i]}
  //       xposition={xPositionList[i]}
  //       yposition={yPositionList[i]}
  //       fillColor={fillColorList[i]}
  //       population={populationList[i]}
  //       handleClick={handleClickMaker(i)}
  //       selectedFull={fillColorList[i] === ccolor}
  //       selected={selected === i}
  //     />
  //   );
  // });

  const listItems = CellArray.map((cell) => {
    return (
      <Cell
        key={1}
        territory={cell.territory}
        cellWidth={cell.cellWidth}
        cellHeight={cell.cellHeight}
        xposition={cell.xposition}
        yposition={cell.yposition}
        fillColor={cell.fillColor}
        population={cell.population}
        handleClick={handleClickMaker(cell)}
        selectedFull={cell.fillColor === ccolor}
        selected={selected === cell}
      />
    );
  });

  return (
    <div>
      <div>Map</div>
      <svg height="500" width="500">
        {listItems}
      </svg>
    </div>
  );
};

export default HomePage;
