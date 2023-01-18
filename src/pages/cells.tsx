import React from "react";

type BaseCell = {
  shape: string;
  territory: string;
  fillColor: string;
  xposition: number;
  yposition: number;
  population: number;
  nearby: string[];
};

type CellProps = {
  cell: BaseCell;
  selectedFull: boolean;
  selected: boolean;
  handleClick: () => void;
};

const Cell: React.FC<CellProps> = ({
  cell,
  selectedFull,
  selected,
  handleClick,
}) => {
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
      />

      <text x={cell.xposition + 25} y={cell.yposition + 40} fill="black">
        {cell.territory}
      </text>
      <text x={cell.xposition + 45} y={cell.yposition + 55} fill="black">
        {cell.population}
      </text>
    </>
  );
};

export default Cell;
