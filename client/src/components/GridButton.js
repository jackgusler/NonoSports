// GridButton.js
import React, { useState, useEffect } from "react";

const GridButton = ({ actionState, resetKey, mouseDown}) => {
  const [buttonState, setButtonState] = useState(null);

  useEffect(() => {
    setButtonState(null);
  }, [resetKey]);

  const handleMouseClick = () => {
    switch (actionState) {
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
      case "uncheckingAndUnmarking":
        if (buttonState === "checked" || buttonState === "marked")
          setButtonState(null);
        break;
      default:
        break;
    }
  };

  const getButtonColor = () => {
    switch (buttonState) {
      case "checked":
        return "#93C5FD";
      case "marked":
        return "white";
      default:
        return "white";
    }
  };

  return (
    <button
      onMouseDown={() => {
        handleMouseClick();
      }}
      onMouseEnter={() => {
        if (mouseDown) {
          handleMouseClick();
        }
      }}
      style={{
        backgroundColor: getButtonColor(),
        width: "50px",
        height: "50px",
        border: "1px solid #446BA2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {buttonState === "marked" && (
        <i className="fas fa-flag fa-2x" style={{ color: "#446BA2", width: "24px", height: "24px" }}></i>
      )}
    </button>
  );
};

export default GridButton;