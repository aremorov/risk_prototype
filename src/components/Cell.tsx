import React from "react";
import Sword from "./Sword";
import Ranged from "./Ranged";
import Air from "./Air";

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
  age: number;
};

type CellProps = {
  cell: BaseCell;
  selectedFull: boolean;
  selected: boolean;
  handleClick: () => void;
  allCells: BaseCell[];
  ccolor: string | null;
};

const Cell: React.FC<CellProps> = ({
  cell,
  selectedFull,
  selected,
  handleClick,
  allCells,
  ccolor,
}) => {
  let opacityLevel = 0.2;
  if (selectedFull) {
    opacityLevel = 1;
  }

  let nearbyCurrentColor = false;

  cell.nearby.forEach((territoryName) => {
    const nearbyCell = allCells.find((cell) => cell.territory == territoryName); //find nearby cell objects
    if (nearbyCell && nearbyCell.fillColor == ccolor) {
      nearbyCurrentColor = true;
    }
  });

  if (!selectedFull && nearbyCurrentColor) {
    opacityLevel = 0.5;
  }

  let icon = <Sword xcenter={cell.xposition} ycenter={cell.yposition}></Sword>;

  if (cell.troop == "ranged") {
    icon = (
      <Ranged xcenter={cell.xposition} ycenter={cell.yposition + 10}></Ranged>
    );
  }

  if (cell.troop == "air") {
    icon = <Air xcenter={cell.xposition} ycenter={cell.yposition + 10}></Air>;
  }

  return (
    <>
      {/* <rect
        onClick={handleClick}
        width={cell.cellWidth}
        height={cell.cellHeight}
        x={cell.xposition}
        y={cell.yposition}
        fill={cell.fillColor}
        stroke={selected ? "magenta" : "black"}
        stroke-width={selectedFull ? 10 : 0}
      /> */}
      <path
        d={cell.shape}
        onClick={handleClick}
        x={cell.xposition}
        y={cell.yposition}
        fill={cell.fillColor}
        stroke={selected ? "magenta" : "black"}
        stroke-width={selectedFull ? 10 : 0}
        opacity={opacityLevel}
      />
      <text
        x={cell.xposition + 25}
        y={cell.yposition + 10}
        fill="black"
        opacity={opacityLevel}
      >
        {cell.territory}
      </text>
      <text
        x={cell.xposition + 25}
        y={cell.yposition + 25}
        fill="black"
        opacity={opacityLevel}
      >
        {cell.terrain}
      </text>
      <text
        x={cell.xposition}
        y={cell.yposition + 40}
        fill="black"
        opacity={opacityLevel}
      >
        {cell.troop + " " + cell.population.toString()}
      </text>
      <text
        x={cell.xposition}
        y={cell.yposition + 55}
        fill="black"
        opacity={opacityLevel}
      >
        {"Age: " + cell.age}
      </text>
      {icon}
    </>
  );
};

export default Cell;
