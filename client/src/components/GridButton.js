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
    let topShadow = col % 5 === 0 ? "0px -1px 0px 0px black" : null;
    let rightShadow =
      row % 5 === 4 || row === maxRow - 1 ? "1px 0px 0px 0px black" : null;
    let bottomShadow =
      col % 5 === 4 || col === maxCol - 1 ? "0px 1px 0px 0px black" : null;
    let leftShadow = row % 5 === 0 ? "-1px 0px 0px 0px black" : null;

    if (row === 0) {
      leftShadow = "-1px 1px 0px 1px black";
    }

    if (col === 0) {
      topShadow = "1px -1px 0px 1px black";
    }

    if (row === maxRow - 1) {
      rightShadow = "1px 0px 0px 1px black";
    }

    if (col === maxCol - 1) {
      bottomShadow = "1px 1px 0px 1px black";
    }

    if (row === 0 && col === 0) {
      topShadow = "0px 0px 0px 2px black";
    }

    if (
      !topShadow &&
      !rightShadow &&
      !leftShadow &&
      bottomShadow &&
      col !== maxCol - 1
    ) {
      leftShadow = "-1px -1px 0px 0px #BFBFBF";
    }
    if (
      !topShadow &&
      rightShadow &&
      !leftShadow &&
      bottomShadow &&
      col !== maxCol - 1
    ) {
      leftShadow = "-1px -1px 0px 0px #BFBFBF";
    }

    // Blue border conditions
    if (!topShadow) topShadow = "0px -1px 0px 0px #BFBFBF";
    if (!rightShadow) rightShadow = "1px 0px 0px 0px #BFBFBF";
    if (!bottomShadow) bottomShadow = "0px 1px 0px 0px #BFBFBF";
    if (!leftShadow) leftShadow = "-1px 0px 0px 0px #BFBFBF";

    shadows.push(topShadow, rightShadow, bottomShadow, leftShadow);

    return shadows.join(", ");
  };

  return (
    <button
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      style={{
        backgroundColor: getButtonColor(),
        width: "20px",
        height: "20px",
        boxShadow: getBoxShadow(),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {buttonState === 2 && (
        <i className="fa-solid fa-xmark" style={{ color: "#BFBFBF" }}></i>
      )}
    </button>
  );
};

export default GridButton;
