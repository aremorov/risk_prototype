import React from "react";

type BaseCell = {
  shape: string;
  territory: string;
  fillColor: string;
  xposition: number;
  yposition: number;
  troop: string;
  population: number;
  nearby: string[];
  biome: string;
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
  let opacityLevel = 0.01;
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
        y={cell.yposition + 20}
        fill="black"
        opacity={opacityLevel}
      >
        {cell.territory}
      </text>
      <text
        x={cell.xposition + 25}
        y={cell.yposition + 35}
        fill="black"
        opacity={opacityLevel}
      >
        {cell.biome}
      </text>
      <text
        x={cell.xposition}
        y={cell.yposition + 55}
        fill="black"
        opacity={opacityLevel}
      >
        {cell.troop + " " + cell.population.toString()}
      </text>
    </>
  );
};

export default Cell;
