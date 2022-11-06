import React, { FC, ReactNode, useEffect, useState, useRef } from "react";
import Cell from "./cells";

//next: make for loop

const tnum: number[] = []; //territory number

for (let i = 0; i < 7; i++) {
  tnum.push(i);
}

const cellWidthList: number[] = [100, 100, 100, 300, 200, 100]; //territory number
const cellHeightList: number[] = [100, 100, 100, 100, 100, 100]; //territory number
const xPositionList: number[] = [0, 100, 200, 0, 0, 200];
const yPositionList: number[] = [0, 0, 0, 100, 200, 200];
const fillColorList: string[] = ["red", "green", "red", "blue", "green", "red"];
const populationList: number[] = [1, 3, 4, 9, 2, 3]; //I thought values are reassigned...

const HomePage = () => {
  const [ccolor, setCcolor] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleClickMaker = (index: number) => () => {
    // select the cell it is on, and cell color (so all territories are shown)
    if (selected === null) {
      setCcolor(fillColorList[index] as string); // sets color as the
      setSelected(index);
      console.log(1);
    }
    //move, if selected:
    if (selected !== null) {
      if (fillColorList[index] !== fillColorList[selected]) {
        populationList[index] -= 1;
        populationList[selected] -= 1;
        setSelected(null);
        setCcolor(null);
      } else {
        setSelected(index);
      }
    }
  };

  const listItems = tnum.map((i) => (
    <Cell
      key={i}
      cellWidth={cellWidthList[i] as number}
      cellHeight={cellHeightList[i] as number}
      xposition={xPositionList[i] as number}
      yposition={yPositionList[i] as number}
      fillColor={fillColorList[i] as string}
      population={populationList[i] as number}
      handleClick={handleClickMaker(i)}
      selectedFull={fillColorList[i] === ccolor}
      selected={selected === i}
    />
  ));

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
