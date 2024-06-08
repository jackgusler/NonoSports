import React, { useState } from "react";
import Button from "./Button";

function ButtonGroup({ isActive, multiActive = {}, buttons }) {
  const [activeButtons, setActiveButtons] = useState(
    isActive && buttons.length > 0 ? [buttons[0].id] : []
  );

  const handleClick = (button) => {
    if (activeButtons.includes(button.id)) {
      // Prevent deactivation if this is the last active button and isActive is true
      if (isActive && activeButtons.length === 1) {
        return;
      }
      setActiveButtons(activeButtons.filter((id) => id !== button.id));
    } else {
      if (multiActive[button.id]) {
        setActiveButtons((prevActiveButtons) => {
          const filteredActiveButtons = prevActiveButtons.filter(
            (id) => multiActive[id]
          );
          return [...filteredActiveButtons, button.id];
        });
      } else {
        setActiveButtons([button.id]);
      }
    }

    button.onClick(activeButtons);
  };

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
              onClick={() => handleClick(button)}
              active={isActive && activeButtons.includes(button.id)}
              disabled={button.disabled}
              modal={button.modal}
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
