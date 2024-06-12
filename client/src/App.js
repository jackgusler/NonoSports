import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect } from "react";
import StartingView from "./views/StartingView";
import GameView from "./views/GameView";

function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [categories, setCategories] = useState(["MLB"]); // Change to array
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <h1 className="text-4xl font-bold mt-10">SportNogram</h1>
      <div className="flex-grow flex items-center">
        {!gameStarted && (
          <StartingView
            setCategories={setCategories}
            setDifficulty={setDifficulty}
            setGameStarted={setGameStarted}
          />
        )}
        {gameStarted && (
          <GameView
            categories={categories}
            difficulty={difficulty}
            onGoBack={() => {
              setGameStarted(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
