import React, { useState } from "react";
import Button from "./Button";

function ButtonGroup({ isActive, buttons }) {
  const [activeButton, setActiveButton] = useState(buttons.length > 1 ? buttons[0].id : null);
  return (
    <div className="container mx-auto flex justify-center">
      <div
        style={{ backgroundColor: "#446ba2" }}
        className="p-4 rounded-lg flex space-x-4"
      >
        {buttons.map((button, index) => (
          <div key={index} className="mt-4">
            <Button
              color={button.color}
              onClick={() => {
                button.onClick();
                setActiveButton(button.id);
              }}
              active={isActive && activeButton === button.id}
            >
              {button.label}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ButtonGroup;