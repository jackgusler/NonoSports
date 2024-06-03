import "./index.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import StartingView from "./views/StartingView";
import GameView from "./views/GameView";

function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("MLB");
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <h1 className="text-4xl font-bold mt-10">SportNogram</h1>
      <div className="flex-grow flex items-center">
        {gameStarted ? (
          <GameView category={category} difficulty={difficulty} className="fade-in" />
        ) : (
          <StartingView
            setCategory={setCategory}
            setDifficulty={setDifficulty}
            setGameStarted={setGameStarted}
            className="fade-out"
          />
        )}
      </div>
    </div>
  );
}

export default App;