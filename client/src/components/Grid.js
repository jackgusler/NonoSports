// Grid.js
import React, { useState } from "react";
import ButtonGroup from "./ButtonGroup";
import GridButton from "./GridButton";

const difficultyMap = {
  easy: 5,
  medium: 7,
  hard: 10,
};

const Grid = ({ difficulty }) => {
  const gridSize = difficultyMap[difficulty] || 5;
  const [isDragging, setIsDragging] = useState(false);
  const [gridState, setGridState] = useState("checking");
  const [resetKey, setResetKey] = useState(0);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  let grid = Array(gridSize ** 2)
    .fill()
    .map((_, i) => (
      <GridButton key={`${resetKey}-${i}`} isDragging={isDragging} gridState={gridState} />
    ));

  const resetGrid = () => {
    setResetKey(prevKey => prevKey + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <ButtonGroup
        isActive={true}
        buttons={[
          {
            id: "checking",
            color: "blue",
            onClick: () => {
              setGridState("checking");
            },
            label: <i className="fa-solid fa-pen-to-square"></i>,
          },
          {
            id: "unchecking",
            color: "blue",
            onClick: () => {
              setGridState("unchecking");
            },
            label: <i className="fa-regular fa-pen-to-square"></i>,
          },
          {
            id: "marking",
            color: "red",
            onClick: () => {
              setGridState("marking");
            },
            label: <i className="fas fa-flag"></i>,
          },
          {
            id: "unmarking",
            color: "red",
            onClick: () => {
              setGridState("unmarking");
            },
            label: <i className="fa-regular fa-flag"></i>,
          },
        ]}
      />
      <div
        className={`grid grid-cols-${gridSize} my-4`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {grid}
      </div>
      <ButtonGroup
        isActive={false}
        buttons={[
          {
            id: "reset",
            color: "blue",
            onClick: () => {
              resetGrid();
            },
            label: <i className="fa-solid fa-rotate-left"></i>,
          },
          {
            id: "redo",
            color: "blue",
            onClick: () => {
              // redoMove();
            },
            label: <i className="fa-solid fa-left-long"></i>,
          },
        ]}
      />
    </div>
  );
};

export default Grid;
