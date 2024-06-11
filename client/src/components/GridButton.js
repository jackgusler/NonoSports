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

  const getBorderColor = (side) => {
    const { row, col } = position;
    const { maxRow, maxCol } = max;
    let color = "#446BA2";

    if (
      (side === "top" && col % 3 === 0) ||
      (side === "right" && (row % 3 === 2 || row === maxRow - 1)) ||
      (side === "bottom" && (col % 3 === 2 || col === maxCol - 1)) ||
      (side === "left" && row % 3 === 0)
    ) {
      color = "black";
    }

    return color;
  };

  return (
    <button
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      style={{
        backgroundColor: getButtonColor(),
        width: "25px",
        height: "25px",
        borderTop: `1px solid ${getBorderColor("top")}`,
        borderRight: `1px solid ${getBorderColor("right")}`,
        borderBottom: `1px solid ${getBorderColor("bottom")}`,
        borderLeft: `1px solid ${getBorderColor("left")}`,
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
