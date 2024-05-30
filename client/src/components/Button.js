// Button.js
import React from "react";

const Button = ({ color, children, onClick }) => {
  const baseStyle =
    "font-bold py-2 px-4 border-b-4 rounded";
  const colorStyle = {
    black: "bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white border-gray-700 hover:border-gray-600 active:border-gray-500",
    white: "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 border-gray-200 hover:border-gray-300 active:border-gray-400",
    grey: "bg-gray-500 hover:bg-gray-400 active:bg-gray-300 text-white border-gray-400 hover:border-gray-300 active:border-gray-200",
    red: "bg-red-500 hover:bg-red-400 active:bg-red-300 text-white border-red-400 hover:border-red-300 active:border-red-200",
    green: "bg-green-500 hover:bg-green-400 active:bg-green-300 text-white border-green-400 hover:border-green-300 active:border-green-200",
    blue: "bg-blue-500 hover:bg-blue-400 active:bg-blue-300 text-white border-blue-400 hover:border-blue-300 active:border-blue-200",
  };

  return (
    <button className={`${baseStyle} ${colorStyle[color]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;