// game view, where the game is played and needs:
// difficulty and category props from App.js
// based on difficulty, set the grid size
// get the image based on the category

// GameView.js
// GameView.js
import React from 'react';
import Grid from '../components/Grid';
import Converter from '../components/Converter';

const handleEmittedData = (data) => {
  console.log(data);
};

const GameView = ({ categories, difficulty }) => {
  return (
    <div>
      <Converter difficulty={difficulty} categories={categories} onEmitData={handleEmittedData} />
      <Grid difficulty={difficulty} />
    </div>
  );
}

export default GameView;