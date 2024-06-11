import React from "react";

const NumberRow = ({ orientation, numbers, winningGrid, userGrid }) => {
  return (
    <div
      style={{
        width: `${numbers.length * 1}rem`,
        height: "1rem",
        position: "absolute",
        transform:
          orientation === "top"
            ? `rotate(90deg) translateX(calc(-${
                (numbers.length * 1) / 2
              }rem - 16px))`
            : `translateX(calc(-${(numbers.length * 1) / 2}rem - 12px))`,
      }}
      className={"flex justify-center items-center rounded-lg"}
    >
      <div
        className={`flex items-center ${
          orientation === "top" ? "justify-center" : "justify-end"
        }`}
        style={{ width: "100%" }}
      >
        {numbers.length > 0 ? (
          numbers.map((number, index) => (
            <div
              key={index}
              style={{
                width: orientation === "top" ? '1rem' : 'auto', // Apply the fixed width only when the orientation is "top"
                height: orientation === "top" ? '1rem' : 'auto', // Apply the fixed height only when the orientation is "top"
                display: 'flex', // Use flexbox to center the number
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  transform: orientation === "top" ? "rotate(-90deg)" : "none",
                  margin: "0 0.25rem",
                }}
              >
                {number}
              </span>
            </div>
          ))
        ) : (
          <span
            style={{
              position: "absolute",
              transform:
                orientation === "top"
                  ? "rotate(-90deg) translateY(-8px)"
                  : "none",
              margin: "0 0.25rem",
            }}
          >
            0
          </span>
        )}
      </div>
    </div>
  );
};

export default NumberRow;