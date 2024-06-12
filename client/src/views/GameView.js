// GameView.js
import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import Converter from "../components/Converter";

const difficultyMap = {
  easy: 15,
  medium: 20,
  hard: 25,
};


const GameView = ({ categories, difficulty }) => {
  const [size, setSize] = useState([0, 0]);
  const [title, setTitle] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [winningGrid, setWinningGrid] = useState([]);
  const [dataEmitted, setDataEmitted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleEmittedData = (data) => {
    setSize(data.size);
    setTitle(data.title);
    setImagePath(data.imagePath);
    setWinningGrid(data.winningGrid);
    setDataEmitted(true);
    setGameStarted(true);
  };

  return (
    <div>
      <Converter
        difficulty={difficultyMap[difficulty]}
        categories={categories}
        onEmitData={handleEmittedData}
      />
      <div className={gameStarted ? "fade-in" : ""}>
        {dataEmitted && (
          <Grid
            size={size}
            title={title}
            imagePath={imagePath}
            winningGrid={winningGrid}
          />
        )}
      </div>
    </div>
  );
};

export default GameView;
