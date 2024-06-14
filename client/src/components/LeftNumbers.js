import React from "react";

const LeftNumbers = ({ size, colNumbers, winningGrid, userGrid }) => {
  const cellSize = 20;
  const maxRowHeight = Math.max(...colNumbers.map((row) => row.length));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${size[1]}, ${cellSize}px)`,
        position: "absolute",
        top: "50%",
        left: `calc(-${maxRowHeight * cellSize}px)`, // Adjust left position based on the maximum row height
        transform: "translateY(-50%)",
        boxShadow: "0px 0px 0px 2px black",
      }}
    >
      {colNumbers.map((rowNumbers, index) => {
        const effectiveRowNumbers = rowNumbers.length === 0 ? [0] : rowNumbers; // Treat empty rows as if they contain "0"
        const emptyCellsCount = maxRowHeight - effectiveRowNumbers.length; // Adjust calculation for empty cells
        return (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${maxRowHeight}, ${cellSize}px)`, // Create a column for each possible number/empty cell
              justifyContent: "end", // Align numbers to the right

              boxShadow: "0px 0px 0px 1px black",
            }}
          >
            {/* Render empty cells first to push numbers to the right */}
            {Array.from({ length: emptyCellsCount }).map((_, emptyIndex) => (
              <div
                key={`empty-${emptyIndex}`}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: `${index % 2 === 1 ? "#CCCCCC" : "#BBBBBB"}`, // Alternate colors
                }}
              ></div>
            ))}
            {/* Then render number cells */}
            {effectiveRowNumbers.map((number, numberIndex) => (
              <div
                key={numberIndex}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: `${index % 2 === 1 ? "#CCCCCC" : "#BBBBBB"}`, // Alternate colors
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
