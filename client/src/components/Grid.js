// Grid.js
import React, { useState, useEffect } from "react";
import ButtonGroup from "./ButtonGroup";
import GridButton from "./GridButton";

const difficultyMap = {
  easy: 5,
  medium: 7,
  hard: 10,
};

const Grid = ({ difficulty }) => {
  const gridSize = difficultyMap[difficulty] || 5;
  const [actionState, setActionState] = useState("checking");
  const [resetKey, setResetKey] = useState(0);

  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  let grid = Array(gridSize)
    .fill()
    .map((_, row) =>
      Array(gridSize)
        .fill()
        .map((_, col) => (
          <GridButton
            key={`${resetKey}-${row}-${col}`}
            id={`${row}-${col}`}
            actionState={actionState}
            mouseDown={mouseDown}
          />
        ))
    );

  const resetGrid = () => {
    setResetKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <ButtonGroup
        isActive={true}
        multiActive={{
          checking: false,
          unchecking: true,
          marking: false,
          unmarking: true,
        }}
        buttons={[
          {
            id: "checking",
            color: "blue",
            onClick: () => {
              setActionState("checking");
            },
            label: <i className="fa-solid fa-pen-to-square"></i>,
          },
          {
            id: "unchecking",
            color: "blue",
            onClick: (activeButtons) => {
              if (activeButtons.includes("unmarking")) {
                setActionState("uncheckingAndUnmarking");
              } else {
                setActionState("unchecking");
              }
            },
            label: <i className="fa-regular fa-pen-to-square"></i>,
          },
          {
            id: "marking",
            color: "red",
            onClick: () => {
              setActionState("marking");
            },
            label: <i className="fas fa-flag"></i>,
          },
          {
            id: "unmarking",
            color: "red",
            onClick: (activeButtons) => {
              if (activeButtons.includes("unchecking")) {
                setActionState("uncheckingAndUnmarking");
              } else {
                setActionState("unmarking");
              }
            },
            label: <i className="fa-regular fa-flag"></i>,
          },
        ]}
      />
      <div
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => console.log("mouseup")}
        className={`grid grid-cols-${gridSize} my-4`}
      >
        {grid.map((row, i) => (
          <div key={i} className="grid-row">
            {row.map((cell) => cell)}
          </div>
        ))}
      </div>
      <ButtonGroup
        isActive={false}
        multiActive={{
          reset: false,
          undo: false,
          redo: false,
        }}
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
            id: "undo",
            color: "blue",
            onClick: () => {
              // undoMove();
            },
            label: <i className="fa-solid fa-left-long"></i>,
          },
          {
            id: "redo",
            color: "blue",
            onClick: () => {
              // redoMove();
            },
            disabled: true,
            label: <i className="fa-solid fa-right-long"></i>,
          },
        ]}
      />
    </div>
  );
};

export default Grid;
