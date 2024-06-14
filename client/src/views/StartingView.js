import "../index.css";
import React, { useEffect } from "react";
import ButtonGroup from "../components/ButtonGroup";

function StartingView({ setCategories, setDifficulty, setGameStarted }) {
  const handleCategoryClick = (category) => {
    // add category to categories array
    setCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  return (
    <div className="flex justify-center items-center flex-col space-y-12">
      <div className="container mx-auto flex justify-center space-x-4">
        <ButtonGroup
          isActive={true}
          multiActive={{
            MLB: true,
            NBA: true,
            NFL: true,
            NHL: true,
          }}
          buttons={[
            {
              id: "MLB",
              color: "blue",
              onClick: () => handleCategoryClick("MLB"),
              label: "MLB",
            },
            {
              id: "NBA",
              color: "red",
              onClick: () => handleCategoryClick("NBA"),
              label: "NBA",
            },
            {
              id: "NFL",
              color: "green",
              onClick: () => handleCategoryClick("NFL"),
              label: "NFL",
            },
            {
              id: "NHL",
              color: "black",
              onClick: () => handleCategoryClick("NHL"),
              label: "NHL",
            },
          ]}
        />
      </div>
      <div className="container mx-auto flex justify-center space-x-4">
        <ButtonGroup
          isActive={true}
          multiActive={{
            small: false,
            medium: false,
            large: false,
          }}
          buttons={[
            {
              id: "small",
              color: "grey",
              onClick: () => {
                setDifficulty("small");
              },
              label: "Small",
            },
            {
              id: "medium",
              color: "grey",
              onClick: () => {
                setDifficulty("medium");
              },
              label: "Medium",
            },
            {
              id: "large",
              color: "grey",
              onClick: () => {
                setDifficulty("large");
              },
              label: "Large",
            },
          ]}
        />
      </div>
      <div className="container mx-auto flex justify-center">
        <ButtonGroup
          buttons={[
            {
              color: "grey",
              onClick: () => {
                setGameStarted(true);
              },
              label: "Start",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default StartingView;
