// GridButton.js
import React from "react";

const GridButton = ({ onMouseDown, onMouseOver, buttonState }) => {
  const getButtonColor = () => {
    switch (buttonState) {
      case 0:
        return "white";
      case 1:
        return "#93C5FD";
      case 2:
        return "white";
    }
  };

  return (
    <button
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      style={{
        backgroundColor: getButtonColor(),
        width: "25px",
        height: "25px",
        border: "1px solid #446BA2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {buttonState === 2 && (
        <i className="fas fa-flag" style={{ color: "#446BA2" }}></i>
      )}
    </button>
  );
};

export default GridButton;
