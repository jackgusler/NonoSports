// Button.js
import React from "react";
import { darken } from "polished";

const Button = ({ color, children, onClick }) => {
  const baseStyle = "font-bold py-2 px-4 border-b-4 rounded transform transition-all duration-150";
  const colorStyle = {
    black:
      "bg-gray-800 hover:bg-gray-700 text-white border-gray-700 hover:border-gray-600 active:translate-y-1 active:border-white",
    white:
      "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200 hover:border-gray-300 active:translate-y-1 active:border-white",
    grey: "bg-gray-500 hover:bg-gray-400 text-white border-gray-400 hover:border-gray-300 active:translate-y-1 active:border-white",
    red: "bg-red-500 hover:bg-red-400 text-white border-red-400 hover:border-red-300 active:translate-y-1 active:border-white",
    green:
      "bg-green-500 hover:bg-green-400 text-white border-green-400 hover:border-green-300 active:translate-y-1 active:border-white",
    blue: "bg-blue-500 hover:bg-blue-400 text-white border-blue-400 hover:border-blue-300 active:translate-y-1 active:border-white",
  };

  const tailwindToHex = {
    'gray-800': '#2D3748',
    'gray-100': '#F7FAFC',
    'gray-500': '#A0AEC0',
    'red-500': '#F56565',
    'green-500': '#48BB78',
    'blue-500': '#4299E1',
    // ... add other colors as needed
  };

  const backgroundColorClass = colorStyle[color].match(/bg-([a-z0-9-]+)/)[1];
  const backgroundColor = tailwindToHex[backgroundColorClass];
  const darkerBackgroundColor = darken(0.1, backgroundColor);

  return (
    <div style={{ 
      display: 'inline-block', 
      padding: '5px', 
      backgroundColor: darkerBackgroundColor, 
      borderRadius: '5px', 
      boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' 
    }}>
      <button className={`${baseStyle} ${colorStyle[color]}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;