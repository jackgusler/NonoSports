import "../index.css";
import React from "react";
import ButtonGroup from "../components/ButtonGroup";

function StartingView({ setCategory, setDifficulty, setGameStarted }) {
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
              onClick: () => {
                setCategory("MLB");
              },
              label: "MLB",
            },
            {
              id: "NBA",
              color: "red",
              onClick: () => {
                setCategory("NBA");
              },
              label: "NBA",
            },
            {
              id: "NFL",
              color: "green",
              onClick: () => {
                setCategory("NFL");
              },
              label: "NFL",
            },
            {
              id: "NHL",
              color: "black",
              onClick: () => {
                setCategory("NHL");
              },
              label: "NHL",
            },
          ]}
        />
      </div>
      <div className="container mx-auto flex justify-center space-x-4">
        <ButtonGroup
          isActive={true}
          multiActive={{
            easy: false,
            medium: false,
            hard: false,
          }}
          buttons={[
            {
              id: "easy",
              color: "grey",
              onClick: () => {
                setDifficulty("easy");
              },
              label: "Easy",
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
              id: "hard",
              color: "grey",
              onClick: () => {
                setDifficulty("hard");
              },
              label: "Hard",
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
