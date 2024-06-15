// const isRowCompleted = (effectiveRowNumbers, userRow = []) => {
//   // effectiveRowNumbers can look like [13] or [13, 5, 2] or [0] or [1, 5, 1, 7]
//   // for each number in effectiveRowNumbers, check if the number is complete

//   // a number is complete if the row, from left to right or right to left, to the numbers position, is filled with 1s or 2s
//   // the amount of 1s should be equal to the number
//   // for example, if effectiveRowNumbers is [3], and the row looks like this [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], the number is complete
//   // if the row looks like this [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], the number is not complete
//   // if the row looks like this [1, 1, 1, 2, 2, 2, 0, 0, 0, 0], the number is complete
//   // if the row looks like this [1, 1, 1, 2, 2, 0, 0, 0, 0, 0], the number is complete
//   // if the row looks like this [1, 1, 1, 0, 0, 0, 0, 1, 0, 0], the number is not complete

//   // for example, if effectiveRowNumbers is [3, 2], and the row looks like this [1, 1, 1, 2, 2, 2, 0, 0, 0, 0], the numbers are not complete
//   // if the row looks like this [1, 1, 1, 2, 2, 2, 1, 1, 0, 0], the numbers are complete
//   // if the row looks like this [1, 1, 1, 2, 2, 0, 1, 1, 0, 0], the numbers are complete
//   // if the row looks like this [1, 1, 1, 2, 2, 0, 0, 1, 0, 0], the numbers are not complete

//   // for example, if effectiveRowNumbers is [0], and the row looks like this [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], the number is complete
//   // if the row looks like this [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], the number is not complete
//   // if the row looks like this [0, 0, 0, 0, 0, 2, 0, 0, 0, 0], the number is complete

//   // for example, if effectiveRowNumbers is [1, 2, 3], and the row looks like this [1, 1, 1, 2, 2, 2, 1, 1, 1, 0], the numbers are not complete
//   // if the row looks like this [1, 2, 2, 1, 1, 2, 1, 1, 1, 0], the numbers are complete
//   // if the row looks like this [1, 2, 2, 1, 1, 2, 1, 1, 1, 1], the numbers are not complete
//   // if the row looks like this [1, 2, 2, 1, 1, 2, 1, 1, 1, 2], the numbers are complete
//   // if the row looks like this [1, 0, 0, 1, 1, 0, 1, 1, 1, 0], the numbers are complete

//   // if all numbers are complete, return true, otherwise return false
// };

import React from "react";

const LeftNumbers = ({ size, colNumbers, winningGrid, userGrid }) => {
  const cellSize = 20;
  const maxRowHeight = Math.max(...colNumbers.map((row) => row.length));

  const getNumberCompletion = (effectiveRowNumbers, userRow = []) => {
    if (effectiveRowNumbers.length === 1 && effectiveRowNumbers[0] === 0) {
      return userRow.every(cell => cell.state !== 1) ? [true] : [false];
    }

    let currentIndex = 0;
    const numberCompletion = [];

    for (let number of effectiveRowNumbers) {
      let count = 0;

      // Skip markers and count the filled cells
      while (currentIndex < userRow.length && userRow[currentIndex].state !== 1) {
        currentIndex++;
      }

      while (currentIndex < userRow.length && userRow[currentIndex].state === 1) {
        count++;
        currentIndex++;
      }

      numberCompletion.push(count === number);

      // Skip over the marker cells (state === 2)
      while (currentIndex < userRow.length && userRow[currentIndex].state === 2) {
        currentIndex++;
      }
    }

    return numberCompletion;
  };

  const isRowCompleted = (numberCompletion) => {
    return numberCompletion.every(isCompleted => isCompleted);
  };

  function getRowFromTransposedGrid(grid, rowIndex) {
    return grid.map((column) => column[rowIndex]);
  }

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
        const numberCompletion = getNumberCompletion(effectiveRowNumbers, userRow);
        const rowCompleted = isRowCompleted(numberCompletion);

        return (
          <div
            key={rowIndex}
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
                  color: numberCompletion[numberIndex] ? (rowCompleted ? "white" : "#3B82F6") : (rowCompleted ? "white" : "black"),
                }}
              >
                <span>
                  {number !== null && number !== undefined ? number : "0"}
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

