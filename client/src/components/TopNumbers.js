import React from "react";

const TopNumbers = ({ size, rowNumbers, userGrid, fillEmptyCells }) => {
  const cellSize = 20;
  const maxColumnHeight = Math.max(...rowNumbers.map((col) => col.length));

  const getNumberCompletion = (effectiveColumnNumbers, userColumn = []) => {
    const completionStatus = new Array(effectiveColumnNumbers.length).fill(
      false
    );
    let usedCells = [];

    const validateSingleNumber = (number) => {
      let count = 0;
      let consecutiveCount = 0;
      for (let i = 0; i < userColumn.length; i++) {
        if (userColumn[i].state === 1) {
          consecutiveCount++;
          count++;
        }

        if (
          consecutiveCount > 0 &&
          consecutiveCount < number &&
          userColumn[i].state !== 1
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
      for (let i = 0; i < userColumn.length; i++) {
        if (userColumn[i].state === 0) {
          isValid = false;
          break;
        }

        if (userColumn[i].state === 1) {
          consecutiveCount++;
          usedCellsHere.push(i);
        }

        if (
          consecutiveCount > 0 &&
          consecutiveCount < number &&
          userColumn[i].state !== 1
        ) {
          break;
        }

        if (
          (consecutiveCount === number &&
            userColumn[i + 1] &&
            userColumn[i + 1].state !== 1) ||
          (consecutiveCount === number && userColumn[i + 1] === undefined)
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
      for (let i = userColumn.length - 1; i >= 0; i--) {
        if (userColumn[i].state === 0) {
          isValid = false;
          break;
        }

        if (userColumn[i].state === 1) {
          consecutiveCount++;
          usedCellsHere.push(i);
        }

        if (
          consecutiveCount > 0 &&
          consecutiveCount < number &&
          userColumn[i].state !== 1
        ) {
          break;
        }

        if (
          (consecutiveCount === number &&
            userColumn[i - 1] &&
            userColumn[i - 1].state !== 1) ||
          (consecutiveCount === number && userColumn[i - 1] === undefined)
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

        for (let i = 0; i < userColumn.length; i++) {
          if (userColumn[i].state === 0) {
            return false;
          }

          if (userColumn[i].state === 1) {
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
            userColumn[i].state !== 1
          ) {
            break;
          }

          if (
            (consecutiveCount === number &&
              userColumn[i + 1] &&
              userColumn[i + 1].state !== 1) ||
            (consecutiveCount === number && userColumn[i + 1] === undefined)
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

        for (let i = userColumn.length - 1; i >= 0; i--) {
          if (userColumn[i].state === 0) {
            return false;
          }

          if (userColumn[i].state === 1) {
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
            userColumn[i].state !== 1
          ) {
            break;
          }

          if (
            (consecutiveCount === number &&
              userColumn[i - 1] &&
              userColumn[i - 1].state !== 1) ||
            (consecutiveCount === number && userColumn[i - 1] === undefined)
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

    if (effectiveColumnNumbers.length === 1) {
      validateSingleNumber(effectiveColumnNumbers[0]);
    } else if (effectiveColumnNumbers.length > 1) {
      validateLeft(effectiveColumnNumbers[0], 0);
      validateRight(
        effectiveColumnNumbers[effectiveColumnNumbers.length - 1],
        effectiveColumnNumbers.length - 1
      );
      for (let i = 1; i < effectiveColumnNumbers.length - 1; i++) {
        validateMiddle(
          effectiveColumnNumbers[i],
          i,
          effectiveColumnNumbers.length
        );
      }
    }

    return completionStatus;
  };

  const isColumnCompleted = (effectiveColumnNumbers, userColumn) => {
    const columnCheck = (effectiveColumnNumbers, userColumn) => {
      let currentIndex = 0;
      for (let number of effectiveColumnNumbers) {
        let count = 0;

        while (
          currentIndex < userColumn.length &&
          userColumn[currentIndex].state !== 1
        ) {
          currentIndex++;
        }

        while (
          currentIndex < userColumn.length &&
          userColumn[currentIndex].state === 1
        ) {
          count++;
          currentIndex++;
        }

        if (count !== number) {
          return false;
        }

        while (
          currentIndex < userColumn.length &&
          userColumn[currentIndex].state === 2
        ) {
          currentIndex++;
        }
      }

      while (currentIndex < userColumn.length) {
        if (userColumn[currentIndex].state === 1) {
          return false;
        }
        currentIndex++;
      }

      return true;
    };

    const numberCompletion = getNumberCompletion(
      effectiveColumnNumbers,
      userColumn
    );

    const columnCompleted = columnCheck(effectiveColumnNumbers, userColumn);

    return (
      numberCompletion.every((isCompleted) => isCompleted) || columnCompleted
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size[0]}, ${cellSize}px)`,
        position: "absolute",
        top: `calc(-${maxColumnHeight * cellSize}px)`,
        left: "50%",
        transform: "translateX(-50%)",
        boxShadow: "0px 0px 0px 2px black",
      }}
    >
      {rowNumbers.map((columnNumbers, columnIndex) => {
        const effectiveColumnNumbers =
          columnNumbers.length === 0 ? [0] : columnNumbers;
        const emptyCellsCount = maxColumnHeight - effectiveColumnNumbers.length;
        const numberCompletion = getNumberCompletion(
          effectiveColumnNumbers,
          userGrid[columnIndex]
        );
        const columnCompleted = isColumnCompleted(
          effectiveColumnNumbers,
          userGrid[columnIndex]
        );

        const handleDoubleClick = () => {
          if (columnCompleted) {
            fillEmptyCells(columnIndex, 2);
          }
        };

        return (
          <div
            key={columnIndex}
            onDoubleClick={handleDoubleClick}
            style={{
              display: "grid",
              gridTemplateRows: `repeat(${maxColumnHeight}, ${cellSize}px)`,
              justifyContent: "center",
              boxShadow: "0px 0px 0px 1px black",
              backgroundColor: columnCompleted ? "#3B82F6" : "transparent",
              color: columnCompleted ? "white" : "black",
            }}
          >
            {/* Render empty cells first to push numbers down */}
            {Array.from({ length: emptyCellsCount }).map((_, emptyIndex) => (
              <div
                key={`empty-${emptyIndex}`}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: columnCompleted
                    ? "#3B82F6"
                    : columnIndex % 2 === 1
                    ? "#CCCCCC"
                    : "#BBBBBB",
                }}
              ></div>
            ))}
            {/* Then render number cells, including "0" for empty columns */}
            {effectiveColumnNumbers.map((number, numberIndex) => (
              <div
                key={numberIndex}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: columnCompleted
                    ? "#3B82F6"
                    : columnIndex % 2 === 1
                    ? "#CCCCCC"
                    : "#BBBBBB",
                  color: numberCompletion[numberIndex]
                    ? columnCompleted
                      ? "white"
                      : "#3B82F6"
                    : columnCompleted
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

export default TopNumbers;
