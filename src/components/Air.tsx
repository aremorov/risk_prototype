import React from "react";

import type { CellGeometry } from "../types";

const Air: React.FC<CellGeometry> = ({ xcenter, ycenter }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="20"
      height="20"
      x={xcenter}
      y={ycenter}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M8 12H14M5 9H16.5C17.8807 9 19 7.88071 19 6.5C19 5.11929 17.8807 4 16.5 4M4 15H17C18.1046 15 19 15.8954 19 17C19 18.1046 18.1046 19 17 19"
          stroke="#000000"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default Air;
