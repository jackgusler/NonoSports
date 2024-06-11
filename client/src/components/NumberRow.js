import React from "react";

const NumberRow = ({ orientation, numbers }) => {
  return (
    <div
      style={{
        width: `${numbers.length * 1}rem`, // Adjust the multiplier as needed
        height: "1rem",
        position: "absolute",
        transform:
          orientation === "top"
            ?
            `rotate(90deg) translateX(calc(-${(numbers.length * 1) / 2}rem - 16px))`
            :
            `translateX(calc(-${(numbers.length * 1) / 2}rem - 12px))`
      }}
      className={"flex justify-center items-center rounded-lg"}
    >
      <div
  className={`flex items-center ${orientation === "top" ? "justify-center" : "justify-end"}`} // Apply "justify-center" if orientation is "top", else apply "justify-end"
  style={{ width: "100%" }}
>
        {numbers.map((number, index) => (
          <span
            key={index}
            style={{
              transform: orientation === "top" ? "rotate(-90deg)" : "none", // Rotate the numbers when orientation is "top"
              margin: "0 0.25rem", // Add horizontal spacing between the numbers
            }}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NumberRow;