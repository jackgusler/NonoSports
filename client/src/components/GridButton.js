// GridButton.js
import React, { useState, useEffect } from "react";

const GridButton = ({ isDragging, gridState, resetKey }) => {
  const [buttonState, setButtonState] = useState(null);

  useEffect(() => {
    // Reset button state when resetKey changes
    setButtonState(null);
  }, [resetKey]);

  const handleMouseOver = () => {
    if (isDragging) {
      switch (gridState) {
        case "checking":
          if (buttonState === null) setButtonState("checked");
          break;
        case "unchecking":
          if (buttonState === "checked") setButtonState(null);
          break;
        case "marking":
          if (buttonState === null) setButtonState("marked");
          break;
        case "unmarking":
          if (buttonState === "marked") setButtonState(null);
          break;
        default:
          break;
      }
    }
  };

  const getButtonColor = () => {
    switch (buttonState) {
      case "checked":
        return "#93C5FD";
      case "marked":
        return "red";
      default:
        return "white";
    }
  };

  return (
    <button
      onMouseOver={handleMouseOver}
      style={{
        backgroundColor: getButtonColor(),
        width: "50px",
        height: "50px",
        border: "1px solid #446BA2",
      }}
    ></button>
  );
};

export default GridButton;
