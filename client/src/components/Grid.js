import React, { useState, useEffect } from "react";
import ButtonGroup from "./ButtonGroup";
import GridButton from "./GridButton";
import TopNumbers from "./TopNumbers";
import LeftNumbers from "./LeftNumbers";
import Modal from "./Modal";

const Grid = ({
  size,
  title,
  imagePath,
  winningGrid,
  getNewImage,
  onGoBack,
}) => {
  // for testing, make winningGrid just 1x1
  // size = [1, 1];
  // winningGrid = [[1]];
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

  const rowNumbers = calculateRowNumbers(winningGrid);
  const colNumbers = calculateColNumbers(winningGrid);

  const [modalState, setModalState] = useState(false);
  const [actionState, setActionState] = useState("checking");
  const [currentAction, setCurrentAction] = useState(null); // New state for current action
  const [resetKey, setResetKey] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [won, setWon] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const createEmptyGrid = () =>
    Array(size[0])
      .fill()
      .map((_, row) =>
        Array(size[1])
          .fill()
          .map((_, col) => ({ state: 0 }))
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

  const didYouWin = (grid, winningGrid) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].state === 1 && winningGrid[i][j] === 0) {
          return false;
        }
        if (grid[i][j].state === 0 && winningGrid[i][j] === 1) {
          return false;
        }
      }
    }
    return true;
  };

  useEffect(() => {
    if (didYouWin(grid, winningGrid)) {
      setWon(true);
      setFadeOut(true);
    }
  }, [grid, winningGrid]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "90vh",
          alignItems: "center",
        }}
      >
        <ButtonGroup
          isActive={false}
          buttons={[
            {
              id: "back",
              color: "grey",
              onClick: onGoBack,
              label: "Back",
            },
          ]}
        />

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        >
          <div
            className="grid my-4 mb-8"
            style={{
              width: "fit-content",
              gridTemplateColumns: `repeat(${size[0]}, minmax(0, 20px))`, // Change the column count to match the grid size
              position: "relative",
            }}
            onMouseLeave={handleMouseLeave}
          >
            <TopNumbers
              size={size}
              rowNumbers={rowNumbers}
              winningGrid={winningGrid}
              userGrid={grid}
            />
            <LeftNumbers
              size={size}
              colNumbers={colNumbers}
              winningGrid={winningGrid}
              userGrid={grid}
            />
            {Array.from({ length: size[0] }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid-row">
                {Array.from({ length: size[1] }).map((_, colIndex) => (
                  <div
                    key={`${resetKey}-${rowIndex}-${colIndex}`}
                    className="grid-cell"
                  >
                    <GridButton
                      onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                      onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
                      buttonState={grid[rowIndex][colIndex].state}
                      position={{ row: rowIndex, col: colIndex }}
                      max={{ maxRow: size[0], maxCol: size[1] }}
                    />
                  </div>
                ))}
              </div>
            ))}
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 5px)",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <i
                className="fa-solid fa-arrow-left-long"
                style={{ marginRight: "5px" }}
              ></i>
              <div>{size[0]}</div>
              <i
                className="fa-solid fa-arrow-right-long"
                style={{ marginLeft: "5px" }}
              ></i>
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "calc(100% + 10px)",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <i
                className="fa-solid fa-arrow-up-long"
                style={{ marginBottom: "5px" }}
              ></i>
              <div>{size[1]}</div>
              <i
                className="fa-solid fa-arrow-down-long"
                style={{ marginTop: "5px" }}
              ></i>
            </div>
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
                label: <i className="fa-solid fa-xmark"></i>,
              },
            ]}
          />
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
              disabled: (history.length <= 1 && historyIndex === 0) || won,
              modal: {
                title: "Reset grid",
                message:
                  "Are you sure you want to reset? This resets the grid and clears the history.",
                firstOp: () => {
                  resetGrid();
                  setModalState(false);
                },
                secondOp: () => setModalState(false),
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
              disabled: historyIndex === 0 || won,
              label: <i className="fa-solid fa-left-long"></i>,
            },
            {
              id: "redo",
              color: "blue",
              onClick: () => {
                redoMove();
              },
              disabled: historyIndex === history.length - 1 || won,
              label: <i className="fa-solid fa-right-long"></i>,
            },
          ]}
        />
      </div>
      {won && (
        <div className="fade-in">
          <Modal
            title="You Won!"
            image={imagePath}
            message={title}
            firstOp={() => {
              setFadeOut(false);
              setWon(false);
              resetGrid();
              getNewImage();
            }}
            secondOp={() => {
              onGoBack();
            }}
          />
        </div>
      )}
    </>
  );
};

export default Grid;
