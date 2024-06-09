import React, { useState, useEffect } from "react";
import ButtonGroup from "./ButtonGroup";
import GridButton from "./GridButton";

const difficultyMap = {
  easy: 5,
  medium: 7,
  hard: 10,
};

const Grid = ({ difficulty }) => {
  const [gridSize, setGridSize] = useState(difficultyMap[difficulty] || 5);
  const [modalState, setModalState] = useState(false);
  const [actionState, setActionState] = useState("checking");
  const [resetKey, setResetKey] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  const createEmptyGrid = () =>
    Array(gridSize)
      .fill()
      .map((_, row) =>
        Array(gridSize)
          .fill()
          .map((_, col) => ({ row, col, state: null }))
      );

  const [grid, setGrid] = useState(createEmptyGrid);
  const [history, setHistory] = useState([createEmptyGrid()]);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    const handleMouseUp = () => {
      setMouseDown(false);
      if (!gridsAreEqual(grid, history[historyIndex])) {
        updateGrid(grid);
      }
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [grid, history, historyIndex]);

  const handleMouseLeave = () => {
    if (mouseDown) {
      setMouseDown(false);
      if (!gridsAreEqual(grid, history[historyIndex])) {
        updateGrid(grid);
      }
    }
  };

  const resetGrid = () => {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    setHistory([newGrid]);
    setHistoryIndex(0);
    setResetKey((prevKey) => prevKey + 1);
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

  const gridsAreEqual = (grid1, grid2) => {
    for (let i = 0; i < grid1.length; i++) {
      for (let j = 0; j < grid1[i].length; j++) {
        if (grid1[i][j].state !== grid2[i][j].state) {
          return false;
        }
      }
    }
    return true;
  };

  const updateGrid = (newGrid) => {
    setGrid(newGrid);
    setHistory((currentHistory) => {
      const newHistory = [
        ...currentHistory.slice(0, historyIndex + 1),
        newGrid,
      ];
      return newHistory;
    });
    setHistoryIndex((currentIndex) => currentIndex + 1);
  };

  const undoMove = () => {
    if (historyIndex > 0) {
      const newHistoryIndex = historyIndex - 1;
      setHistoryIndex(newHistoryIndex);
      const newGrid = history[newHistoryIndex];
      setGrid(newGrid);
    }
  };

  const redoMove = () => {
    if (historyIndex < history.length - 1) {
      const newHistoryIndex = historyIndex + 1;
      setHistoryIndex(newHistoryIndex);
      const newGrid = history[newHistoryIndex];
      setGrid(newGrid);
    }
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
        className="grid my-4"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
        onMouseLeave={handleMouseLeave} // Attach handleMouseLeave here
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map(({ row, col }, colIndex) => (
              <GridButton
                key={`${resetKey}-${row}-${col}`}
                onMouseDown={() => {
                  setMouseDown(true);
                  const newGrid = grid.map((row) =>
                    row.map((cell) => ({ ...cell }))
                  );
                  newGrid[rowIndex][colIndex].state = handleGridButtonClick(
                    newGrid[rowIndex][colIndex].state
                  );
                  setGrid(newGrid);
                }}
                onMouseOver={() => {
                  if (mouseDown) {
                    const newGrid = grid.map((row) =>
                      row.map((cell) => ({ ...cell }))
                    );
                    newGrid[rowIndex][colIndex].state = handleGridButtonClick(
                      newGrid[rowIndex][colIndex].state
                    );
                    setGrid(newGrid);
                  }
                }}
                buttonState={grid[rowIndex][colIndex].state}
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
              setModalState(true);
            },
            disabled: history.length <= 1 && historyIndex === 0,
            modal: {
              title: "Reset grid",
              message:
                "Are you sure you want to reset? This resets the grid and clears the history.",
              onConfirm: () => {
                resetGrid();
                setModalState(false);
              },
              onCancel: () => setModalState(false),
              modalState: modalState,
            },
            label: <i className="fa-solid fa-rotate-left"></i>,
          },
          {
            id: "undo",
            color: "blue",
            onClick: () => {
              undoMove();
            },
            disabled: historyIndex === 0,
            label: <i className="fa-solid fa-left-long"></i>,
          },
          {
            id: "redo",
            color: "blue",
            onClick: () => {
              redoMove();
            },
            disabled: historyIndex === history.length - 1,
            label: <i className="fa-solid fa-right-long"></i>,
          },
        ]}
      />
    </div>
  );
};

export default Grid;
