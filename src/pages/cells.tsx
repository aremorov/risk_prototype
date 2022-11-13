import React from "react";

type CellProps = {
  territory: string;
  cellWidth: number;
  cellHeight: number;
  fillColor: string;
  xposition: number;
  yposition: number;
  population: number;
  selectedFull: boolean;
  selected: boolean;
  handleClick: () => void;
};

const Cell: React.FC<CellProps> = ({
  territory,
  cellWidth,
  cellHeight,
  xposition,
  yposition,
  fillColor,
  population,
  selectedFull,
  selected,
  handleClick,
}) => {
  return (
    <>
      <rect
        onClick={handleClick}
        width={cellWidth}
        height={cellHeight}
        x={xposition}
        y={yposition}
        fill={fillColor}
        stroke={selected ? "magenta" : "black"}
        stroke-width={selectedFull ? 10 : 0}
      />
      <text x={xposition + 25} y={yposition + 40} fill="black">
        {territory}
      </text>
      <text x={xposition + 45} y={yposition + 55} fill="black">
        {population}
      </text>
    </>
  );
};

export default Cell;
