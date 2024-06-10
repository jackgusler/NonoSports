// GameView.js
import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import Converter from "../components/Converter";

const GameView = ({ categories, difficulty }) => {
  const [size, setSize] = useState([0, 0]);
  const [title, setTitle] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [winningGrid, setWinningGrid] = useState([]);
  const [dataEmitted, setDataEmitted] = useState(false);

  const handleEmittedData = (data) => {
    setSize(data.size);
    setTitle(data.title);
    setImagePath(data.imagePath);
    setWinningGrid(data.winningGrid);
    setDataEmitted(true);
  };

  return (
    <div>
      <Converter
        difficulty={difficulty}
        categories={categories}
        onEmitData={handleEmittedData}
      />
      {dataEmitted && (
        <Grid
          size={size}
          title={title}
          imagePath={imagePath}
          winningGrid={winningGrid}
        />
      )}
    </div>
  );
};

export default GameView;
