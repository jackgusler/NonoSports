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

  // Define grid as a state variable
  const [grid, setGrid] = useState(
    Array(gridSize)
      .fill()
      .map(
        (_, row) =>
          Array(gridSize)
            .fill()
            .map((_, col) => ({ row, col, state: null })) // Store the row and col instead of the GridButton component
      )
  );

  const resetGrid = () => {
    // clear the console
    console.clear();
    const newGrid = Array(gridSize)
      .fill()
      .map(
        (_, row) =>
          Array(gridSize)
            .fill()
            .map((_, col) => ({ row, col, state: null })) // Reset the state of each button to 'default'
      );
    setGrid(newGrid);
    setTempGrid(newGrid);
    setResetKey((prevKey) => prevKey + 1); // increment the resetKey state
  };

  const handleGridButtonClick = (currentButtonState) => {
    switch (actionState) {
      case "checking":
        if (currentButtonState === null) return "checked";
        break;
      case "unchecking":
        if (currentButtonState === "checked") return null;
        break;
      case "marking":
        if (currentButtonState === null) return "marked";
        break;
      case "unmarking":
        if (currentButtonState === "marked") return null;
        break;
      case "uncheckingAndUnmarking":
        if (currentButtonState === "checked" || currentButtonState === "marked")
          return null;
        break;
      default:
        break;
    }
    return currentButtonState;
  };

  const [tempGrid, setTempGrid] = useState(grid);

  useEffect(() => {
    console.clear();
    console.table(grid);
  }, [grid]);

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
        // onMouseDown={() => setMouseDown(true)}
        // onMouseUp={() => console.log("mouseup")}
        className={`grid grid-cols-${gridSize} my-4`}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map(({ row, col }, colIndex) => (
              <GridButton
                key={`${resetKey}-${row}-${col}`}
                onMouseDown={() => {
                  setMouseDown(true);
                  const newTempGrid = [...grid];
                  newTempGrid[rowIndex][colIndex].state = handleGridButtonClick(
                    tempGrid[rowIndex][colIndex].state
                  );
                  setTempGrid(newTempGrid);
                }}
                onMouseOver={() => {
                  if (mouseDown) {
                    const newTempGrid = [...tempGrid];
                    newTempGrid[rowIndex][colIndex].state =
                      handleGridButtonClick(tempGrid[rowIndex][colIndex].state);
                    setTempGrid(newTempGrid);
                  }
                }}
                onMouseUp={() => {
                  setMouseDown(false);
                  setGrid(tempGrid);
                }}
                buttonState={tempGrid[rowIndex][colIndex].state}
              />
            ))}
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
