import React from "react";

type CellProps = {
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
        stroke={selected ? "#510" : "#000"}
        stroke-width={selectedFull ? 10 : 0}
      />
      <text x={xposition + 45} y={yposition + 50} fill="black">
        {population}
      </text>
    </>
  );
};

export default Cell;
