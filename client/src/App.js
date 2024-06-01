import "./index.css";
import React, { useState } from "react";
import Button from "./components/Button";

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [category, setCategory] = useState(null);

  return (
    <div className="flex justify-center items-center min-h-screen flex-col space-y-12">
      <div className="container mx-auto flex justify-center space-x-4">
        <Button color="blue" onClick={() => setCategory("MLB")}>
          MLB
        </Button>
        <Button color="red" onClick={() => setCategory("NBA")}>
          NBA
        </Button>
        <Button color="green" onClick={() => setCategory("NFL")}>
          NFL
        </Button>
        <Button color="black" onClick={() => setCategory("NHL")}>
          NHL
        </Button>
      </div>
      <div className="container mx-auto flex justify-center space-x-4">
        <Button color="grey" onClick={() => setDifficulty("easy")}>
          Easy
        </Button>
        <Button color="grey" onClick={() => setDifficulty("medium")}>
          Medium
        </Button>
        <Button color="grey" onClick={() => setDifficulty("hard")}>
          Hard
        </Button>
      </div>
    </div>
  );
}

export default App;
