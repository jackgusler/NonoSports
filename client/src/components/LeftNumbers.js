import React from "react";

const LeftNumbers = ({ size, colNumbers, userGrid, fillEmptyCells }) => {
  const cellSize = 20;
  const maxRowHeight = Math.max(...colNumbers.map((row) => row.length));

  const getNumberCompletion = (effectiveRowNumbers, userRow = []) => {
    const completionStatus = new Array(effectiveRowNumbers.length).fill(false);
    let usedCells = [];

    const validateSingleNumber = (number) => {
      let count = 0;
      let consecutiveCount = 0;
      for (let i = 0; i < userRow.length; i++) {
        if (userRow[i].state === 1) {
          consecutiveCount++;
          count++;
        }

        if (
          consecutiveCount > 0 &&
          consecutiveCount < number &&
          userRow[i].state !== 1
        ) {
          consecutiveCount = 0;
        }
      }

      if (consecutiveCount === number && count === number) {
        completionStatus[0] = true;
      } else {
        completionStatus[0] = false;
      }
    };

    const validateLeft = (number, index) => {
      let consecutiveCount = 0;
      let isValid = false;
      let usedCellsHere = [];
      for (let i = 0; i < userRow.length; i++) {
        if (userRow[i].state === 0) {
          isValid = false;
          break;
        }

        if (userRow[i].state === 1) {
          consecutiveCount++;
          usedCellsHere.push(i);
        }

        if (
          consecutiveCount > 0 &&
          consecutiveCount < number &&
          userRow[i].state !== 1
        ) {
          break;
        }

        if (
          (consecutiveCount === number &&
            userRow[i + 1] &&
            userRow[i + 1].state !== 1) ||
          (consecutiveCount === number && userRow[i + 1] === undefined)
        ) {
          isValid = true;
          break;
        }
      }

      if (isValid) {
        for (let i = 0; i < usedCellsHere.length; i++) {
          if (usedCells.includes(usedCellsHere[i])) {
            isValid = false;
          } else {
            usedCells.push(usedCellsHere[i]);
          }
        }
      }

      completionStatus[index] = isValid;
    };

    const validateRight = (number, index) => {
      let consecutiveCount = 0;
      let isValid = false;
      let usedCellsHere = [];
      for (let i = userRow.length - 1; i >= 0; i--) {
        if (userRow[i].state === 0) {
          isValid = false;
          break;
        }

        if (userRow[i].state === 1) {
          consecutiveCount++;
          usedCellsHere.push(i);
        }

        if (
          consecutiveCount > 0 &&
          consecutiveCount < number &&
          userRow[i].state !== 1
        ) {
          break;
        }

        if (
          (consecutiveCount === number &&
            userRow[i - 1] &&
            userRow[i - 1].state !== 1) ||
          (consecutiveCount === number && userRow[i - 1] === undefined)
        ) {
          isValid = true;
          break;
        }
      }

      if (isValid) {
        for (let i = 0; i < usedCellsHere.length; i++) {
          if (usedCells.includes(usedCellsHere[i])) {
            isValid = false;
          } else {
            usedCells.push(usedCellsHere[i]);
          }
        }
      }

      completionStatus[index] = isValid;
    };

    const validateMiddle = (number, index, total) => {
      let consecutiveCount = 0;
      let usedCellsHere = [];
      let onesCount = 0;
      let inOnes = false;

      const validateMiddleLeft = (number, index) => {
        for (let i = 0; i < index; i++) {
          if (!completionStatus[i]) {
            return false;
          }
        }

        consecutiveCount = 0;
        usedCellsHere = [];
        onesCount = 0;
        inOnes = false;

        for (let i = 0; i < userRow.length; i++) {
          if (userRow[i].state === 0) {
            return false;
          }

          if (userRow[i].state === 1) {
            if (!inOnes) {
              inOnes = true;
              onesCount++;
            }
            if (onesCount > index) {
              consecutiveCount++;
              usedCellsHere.push(i);
            }
          } else {
            inOnes = false;
          }

          if (
            consecutiveCount > 0 &&
            consecutiveCount < number &&
            userRow[i].state !== 1
          ) {
            break;
          }

          if (
            (consecutiveCount === number &&
              userRow[i + 1] &&
              userRow[i + 1].state !== 1) ||
            (consecutiveCount === number && userRow[i + 1] === undefined)
          ) {
            return true;
          }
        }
      };

      const validateMiddleRight = (number, index, total) => {
        consecutiveCount = 0;
        usedCellsHere = [];
        onesCount = 0;
        inOnes = false;

        for (let i = userRow.length - 1; i >= 0; i--) {
          if (userRow[i].state === 0) {
            return false;
          }

          if (userRow[i].state === 1) {
            if (!inOnes) {
              inOnes = true;
              onesCount++;
            }
            if (onesCount > total - index - 1) {
              consecutiveCount++;
              usedCellsHere.push(i);
            }
          } else {
            inOnes = false;
          }

          if (
            consecutiveCount > 0 &&
            consecutiveCount < number &&
            userRow[i].state !== 1
          ) {
            break;
          }

          if (
            (consecutiveCount === number &&
              userRow[i - 1] &&
              userRow[i - 1].state !== 1) ||
            (consecutiveCount === number && userRow[i - 1] === undefined)
          ) {
            return true;
          }
        }
      };

      let isValid = false;
      isValid = validateMiddleLeft(number, index);
      if (!isValid) {
        isValid = validateMiddleRight(number, index, total);
      }

      if (isValid) {
        for (let i = 0; i < usedCellsHere.length; i++) {
          if (usedCells.includes(usedCellsHere[i])) {
            isValid = false;
          } else {
            usedCells.push(usedCellsHere[i]);
          }
        }
      }

      completionStatus[index] = isValid;
    };

    if (effectiveRowNumbers.length === 1) {
      validateSingleNumber(effectiveRowNumbers[0]);
    } else if (effectiveRowNumbers.length > 1) {
      validateLeft(effectiveRowNumbers[0], 0);
      validateRight(
        effectiveRowNumbers[effectiveRowNumbers.length - 1],
        effectiveRowNumbers.length - 1
      );
      for (let i = 1; i < effectiveRowNumbers.length - 1; i++) {
        validateMiddle(effectiveRowNumbers[i], i, effectiveRowNumbers.length);
      }
    }

    return completionStatus;
  };

  const isRowCompleted = (effectiveRowNumbers, userRow) => {
    const rowCheck = (effectiveRowNumbers, userRow) => {
      let currentIndex = 0;
      for (let number of effectiveRowNumbers) {
        let count = 0;

        while (
          currentIndex < userRow.length &&
          userRow[currentIndex].state !== 1
        ) {
          currentIndex++;
        }

        while (
          currentIndex < userRow.length &&
          userRow[currentIndex].state === 1
        ) {
          count++;
          currentIndex++;
        }

        if (count !== number) {
          return false;
        }

        while (
          currentIndex < userRow.length &&
          userRow[currentIndex].state === 2
        ) {
          currentIndex++;
        }
      }

      while (currentIndex < userRow.length) {
        if (userRow[currentIndex].state === 1) {
          return false;
        }
        currentIndex++;
      }

      return true;
    };

    const numberCompletion = getNumberCompletion(effectiveRowNumbers, userRow);

    const rowCompleted = rowCheck(effectiveRowNumbers, userRow);

    return rowCompleted;
  };

  function getRowFromTransposedGrid(grid, rowIndex) {
    return grid.map((column) => column[rowIndex]);
  }

  // Assuming you have a state management setup at a higher level that can handle the update
  // Add a new prop to LeftNumbers component for handling cell updates: onUpdateCell

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${size[1]}, ${cellSize}px)`,
        position: "absolute",
        top: "50%",
        left: `calc(-${maxRowHeight * cellSize}px)`,
        transform: "translateY(-50%)",
        boxShadow: "0px 0px 0px 2px black",
      }}
    >
      {colNumbers.map((rowNumbers, rowIndex) => {
        const effectiveRowNumbers = rowNumbers.length === 0 ? [0] : rowNumbers;
        const emptyCellsCount = maxRowHeight - effectiveRowNumbers.length;
        const userRow = getRowFromTransposedGrid(userGrid, rowIndex);
        const numberCompletion = getNumberCompletion(
          effectiveRowNumbers,
          userRow
        );
        const rowCompleted = isRowCompleted(effectiveRowNumbers, userRow);

        const handleDoubleClick = () => {
          if (rowCompleted) {
            fillEmptyCells(rowIndex, 2);
          }
        };

        return (
          <div
            key={rowIndex}
            onDoubleClick={handleDoubleClick}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${maxRowHeight}, ${cellSize}px)`,
              justifyContent: "end",
              boxShadow: "0px 0px 0px 1px black",
              backgroundColor: rowCompleted ? "#3B82F6" : "transparent",
              color: rowCompleted ? "white" : "black",
            }}
          >
            {Array.from({ length: emptyCellsCount }).map((_, emptyIndex) => (
              <div
                key={`empty-${emptyIndex}`}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: rowCompleted
                    ? "#3B82F6"
                    : rowIndex % 2 === 1
                    ? "#CCCCCC"
                    : "#BBBBBB",
                }}
              ></div>
            ))}
            {effectiveRowNumbers.map((number, numberIndex) => (
              <div
                key={numberIndex}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: rowCompleted
                    ? "#3B82F6"
                    : rowIndex % 2 === 1
                    ? "#CCCCCC"
                    : "#BBBBBB",
                  color: numberCompletion[numberIndex]
                    ? rowCompleted
                      ? "white"
                      : "#3B82F6"
                    : rowCompleted
                    ? "white"
                    : "black",
                }}
              >
                <span
                  style={{
                    userSelect: "none",
                  }}
                >
                  {number}
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default LeftNumbers;
