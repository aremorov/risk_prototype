import React from "react";

type CellProps = {
  cellWidth: number;
  cellHeight: number;
  fillColor: string;
  xposition: number;
  yposition: number;
  population: number;
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
        stroke="#000"
        stroke-width={selected ? 10 : 0}
      />
      <text x={xposition + 45} y={yposition + 50} fill="black">
        {population}
      </text>
    </>
  );
};

export default Cell;
