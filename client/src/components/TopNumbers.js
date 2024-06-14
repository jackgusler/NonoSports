import React from "react";

const TopNumbers = ({ size, rowNumbers, winningGrid, userGrid }) => {
  const cellSize = 20;
  const maxColumnHeight = Math.max(...rowNumbers.map((col) => col.length));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size[0]}, ${cellSize}px)`,
        position: "absolute",
        top: `calc(-${maxColumnHeight * cellSize}px)`, // Adjusted to ensure correct positioning
        left: "50%",
        transform: "translateX(-50%)",
        boxShadow: "0px 0px 0px 2px black",
      }}
    >
      {rowNumbers.map((columnNumbers, index) => {
        // If columnNumbers is empty, treat it as if it contains "0"
        const effectiveColumnNumbers =
          columnNumbers.length === 0 ? [0] : columnNumbers;
        const emptyCellsCount = maxColumnHeight - effectiveColumnNumbers.length; // Adjust calculation for empty cells

        return (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateRows: `repeat(${maxColumnHeight}, ${cellSize}px)`,
              justifyContent: "center",
              boxShadow: "0px 0px 0px 1px black",
            }}
          >
            {/* Render empty cells first to push numbers down */}
            {Array.from({ length: emptyCellsCount }).map((_, emptyIndex) => (
              <div
                key={`empty-${emptyIndex}`}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: `${index % 2 === 0 ? "#CCCCCC" : "#BBBBBB"}`,
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
                  backgroundColor: `${index % 2 === 0 ? "#CCCCCC" : "#BBBBBB"}`,
                }}
              >
                <span>{number}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default TopNumbers;
