// Button.js
import React from "react";

const Button = ({ color, children, onClick }) => {
  const baseStyle =
    "font-bold py-2 px-4 border-b-4 rounded transform transition-all duration-75";
  const colorStyle = {
    black:
      "bg-gray-800 hover:bg-gray-700 text-white border-gray-700 hover:border-gray-600 active:translate-y-1 active:border-gray-900",
    white:
      "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200 hover:border-gray-300 active:translate-y-1 active:border-white",
    grey: "bg-gray-500 hover:bg-gray-400 text-white border-gray-400 hover:border-gray-300 active:translate-y-1 active:border-gray-600",
    red: "bg-red-500 hover:bg-red-400 text-white border-red-400 hover:border-red-300 active:translate-y-1 active:border-red-600",
    green:
      "bg-green-500 hover:bg-green-400 text-white border-green-400 hover:border-green-300 active:translate-y-1 active:border-green-600",
    blue: "bg-blue-500 hover:bg-blue-400 text-white border-blue-400 hover:border-blue-300 active:translate-y-1 active:border-blue-600",
  };

  const tailwindToHex = {
    "gray-800": "#111827", // This is the hex color code for Tailwind's gray-900
    "gray-100": "#ffffff", // This is the hex color code for Tailwind's gray-200
    "gray-500": "#4b5563", // This is the hex color code for Tailwind's gray-600
    "red-500": "#dc2626", // This is the hex color code for Tailwind's red-600
    "green-500": "#16a34a", // This is the hex color code for Tailwind's green-600
    "blue-500": "#2563eb", // This is the hex color code for Tailwind's blue-600
  };

  const backgroundColorClass = colorStyle[color].match(/bg-([a-z0-9-]+)/)[1];
  const backgroundColor = tailwindToHex[backgroundColorClass];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "5px",
        background: backgroundColor,
        borderRadius: "5px",
        height: "30px",
      }}
    >
      <button className={`${baseStyle} ${colorStyle[color]}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
