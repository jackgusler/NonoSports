import React from "react";

const GridButton = ({
  onMouseDown,
  onMouseOver,
  buttonState,
  position,
  max,
}) => {
  const getButtonColor = () => {
    switch (buttonState) {
      case 0:
        return "white";
      case 1:
        return "#93C5FD";
      case 2:
        return "white";
      default:
        return "white";
    }
  };

  const getBoxShadow = () => {
    const { row, col } = position;
    const { maxRow, maxCol } = max;
    let shadows = [];

    // Black border conditions
    let topShadow = col % 3 === 0 ? "0px -1px 0px 0px black" : null;
    let rightShadow =
      row % 3 === 2 || row === maxRow - 1 ? "1px 0px 0px 0px black" : null;
    let bottomShadow =
      col % 3 === 2 || col === maxCol - 1 ? "0px 1px 0px 0px black" : null;
    let leftShadow = row % 3 === 0 ? "-1px 0px 0px 0px black" : null;

    if ((row === 0 && col === 0) || (row === maxRow - 1 && col === 0)) {
      topShadow = "0px 0px 0px 1px black";
    }

    if (
      (row === 0 && col === maxCol - 1) ||
      (row === maxRow - 1 && col === maxCol - 1)
    ) {
      bottomShadow = "0px 0px 0px 1px black";
    }

    if (
      !topShadow &&
      !rightShadow &&
      !leftShadow &&
      bottomShadow &&
      col !== maxCol - 1
    ) {
      leftShadow = "-1px -1px 0px 0px #93add2";
    }
    if (
      !topShadow &&
      rightShadow &&
      !leftShadow &&
      bottomShadow &&
      col !== maxCol - 1
    ) {
      leftShadow = "-1px -1px 0px 0px #93add2";
    }

    // Blue border conditions
    if (!topShadow) topShadow = "0px -1px 0px 0px #93add2";
    if (!rightShadow) rightShadow = "1px 0px 0px 0px #93add2";
    if (!bottomShadow) bottomShadow = "0px 1px 0px 0px #93add2";
    if (!leftShadow) leftShadow = "-1px 0px 0px 0px #93add2";

    shadows.push(topShadow, rightShadow, bottomShadow, leftShadow);

    return shadows.join(", ");
  };

  return (
    <button
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      style={{
        backgroundColor: getButtonColor(),
        width: "25px",
        height: "25px",
        boxShadow: getBoxShadow(),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "none", // Remove default borders
      }}
    >
      {buttonState === 2 && (
        <i className="fa-solid fa-xmark" style={{ color: "#BFBFBF" }}></i>
      )}
    </button>
  );
};

export default GridButton;
