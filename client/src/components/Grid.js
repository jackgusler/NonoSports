import React, { useState, useEffect } from "react";
import ButtonGroup from "./ButtonGroup";
import GridButton from "./GridButton";
import NumberRow from "./NumberRow";

const Grid = ({ size, title, imagePath, winningGrid }) => {
  const calculateRowNumbers = (winningGrid) => {
    const rowNumbers = winningGrid.map((row) => {
      let numbers = [];
      let count = 0;
      row.forEach((cell) => {
        if (cell === 1) {
          count++;
        } else if (count > 0) {
          numbers.push(count);
          count = 0;
        }
      });
      if (count > 0) {
        numbers.push(count);
      }
      return numbers;
    });
    return rowNumbers;
  };

  const calculateColNumbers = (winningGrid) => {
    const transposedGrid = winningGrid[0].map((col, i) =>
      winningGrid.map((row) => row[i])
    );
    return calculateRowNumbers(transposedGrid);
  };

  // Inside your Grid component
  const rowNumbers = calculateRowNumbers(winningGrid);
  const colNumbers = calculateColNumbers(winningGrid);

  const [modalState, setModalState] = useState(false);
  const [actionState, setActionState] = useState("checking");
  const [currentAction, setCurrentAction] = useState(null); // New state for current action
  const [resetKey, setResetKey] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  const createEmptyGrid = () =>
    Array(size[0])
      .fill()
      .map((_, row) =>
        Array(size[1])
          .fill()
          .map((_, col) => ({ row, col, state: 0 }))
      );

  const [grid, setGrid] = useState(createEmptyGrid);
  const [history, setHistory] = useState([createEmptyGrid()]);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    const handleMouseUp = () => {
      setMouseDown(false);
      setCurrentAction(null); // Clear current action on mouse up
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
      setCurrentAction(null); // Clear current action on mouse leave
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

  const handleGridButtonClick = (currentButtonState, action) => {
    switch (action) {
      case "checking":
        return currentButtonState === 0 ? 1 : currentButtonState;
      case "unchecking":
        return currentButtonState === 1 ? 0 : currentButtonState;
      case "marking":
        return currentButtonState === 0 ? 2 : currentButtonState;
      case "unmarking":
        return currentButtonState === 2 ? 0 : currentButtonState;
      default:
        return currentButtonState;
    }
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

  const handleMouseDown = (rowIndex, colIndex) => {
    setMouseDown(true);

    // Determine the current action based on the state of the first cell clicked
    const firstCellState = grid[rowIndex][colIndex].state;
    let newAction;
    if (actionState === "checking") {
      newAction = firstCellState === 0 ? "checking" : "unchecking";
    } else if (actionState === "marking") {
      newAction = firstCellState === 0 ? "marking" : "unmarking";
    }
    setCurrentAction(newAction);

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    newGrid[rowIndex][colIndex].state = handleGridButtonClick(
      newGrid[rowIndex][colIndex].state,
      newAction
    );
    setGrid(newGrid);
  };

  const handleMouseOver = (rowIndex, colIndex) => {
    if (mouseDown) {
      const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
      newGrid[rowIndex][colIndex].state = handleGridButtonClick(
        newGrid[rowIndex][colIndex].state,
        currentAction
      );
      setGrid(newGrid);
    }
  };

  return (
    <div className="flex flex-col items-center">
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
      <div
        className="grid my-4"
        style={{
          gridTemplateColumns: `repeat(${size[0]}, minmax(0, 1fr))`,
        }}
        onMouseLeave={handleMouseLeave} // Attach handleMouseLeave here
      >
        {Array.from({ length: size[0] }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {Array.from({ length: size[1] }).map((_, colIndex) => (
              <div
                key={`${resetKey}-${rowIndex}-${colIndex}`}
                className="grid-cell"
              >
                {rowIndex === 0 && (
                  <NumberRow
                    orientation="left"
                    numbers={colNumbers[colIndex]}
                  />
                )}
                {colIndex === 0 && (
                  <NumberRow orientation="top" numbers={rowNumbers[rowIndex]} />
                )}
                <GridButton
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
                  buttonState={grid[rowIndex][colIndex].state}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div
        className="grid my-4"
        style={{
          gridTemplateColumns: `repeat(${size[0]}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: size[0] }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {Array.from({ length: size[1] }).map((_, colIndex) => (
              <div
              key={`${resetKey}-${rowIndex}-${colIndex}`}
              className="grid-cell"
            >
              {rowIndex === 0 && (
                <NumberRow
                  orientation="left"
                  numbers={colNumbers[colIndex]}
                />
              )}
              {colIndex === 0 && (
                <NumberRow orientation="top" numbers={rowNumbers[rowIndex]} />
              )}
                <GridButton buttonState={winningGrid[rowIndex][colIndex]} />
              </div>
            ))}
          </div>
        ))}
      </div>

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
            label: <i className="fa-solid fa-marker"></i>,
          },
          {
            id: "marking",
            color: "red",
            onClick: () => {
              setActionState("marking");
            },
            label: <i class="fa-solid fa-xmark"></i>,
          },
        ]}
      />

      {/* display the image from imagePath */}
      <img
        src={imagePath}
        alt={title}
        style={{ width: "200px", height: "200px" }}
      />
    </div>
  );
};

export default Grid;
