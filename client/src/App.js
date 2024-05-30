import "./index.css";
import React from "react";
import Button from "./components/Button";

function App() {
  let diffuculty;
  let category;

  return (
    // <div className="flex justify-center items-center min-h-screen">
    //   <div className="container mx-auto flex">
    //     <div className="w-1/2 flex justify-center items-center">
    //       <img src="" alt="Random" />
    //     </div>
    //     <div className="w-1/2 flex justify-center items-center">

    //     </div>
    //   </div>
    // </div>

    <div className="flex justify-center items-center min-h-screen">
      <div className="container mx-auto flex justify-center space-x-4">
        <Button
          color="blue"
          onClick={() => diffuculty = "easy"}
        >
          Easy
        </Button>
        <Button
          color="blue"
          onClick={() => diffuculty = "medium"}
        >
          Medium
        </Button>
        <Button
          color="blue"
          onClick={() => diffuculty = "hard"}
        >
          Hard
        </Button>
      </div>
      <div className="container mx-auto flex justify-center space-x-4">
        <Button
          color="green"
          onClick={() => diffuculty = "easy"}
        >
          Easy
        </Button>
        <Button
          color="green"
          onClick={() => diffuculty = "medium"}
        >
          Medium
        </Button>
        <Button
          color="green"
          onClick={() => diffuculty = "hard"}
        >
          Hard
        </Button>
      </div>
      <div className="container mx-auto flex justify-center space-x-4">
        <Button
          color="red"
          onClick={() => diffuculty = "easy"}
        >
          Easy
        </Button>
        <Button
          color="red"
          onClick={() => diffuculty = "medium"}
        >
          Medium
        </Button>
        <Button
          color="red"
          onClick={() => diffuculty = "hard"}
        >
          Hard
        </Button>
      </div>
      <div className="container mx-auto flex justify-center space-x-4">
        <Button
          color="black"
          onClick={() => diffuculty = "easy"}
        >
          Easy
        </Button>
        <Button
          color="black"
          onClick={() => diffuculty = "medium"}
        >
          Medium
        </Button>
        <Button
          color="black"
          onClick={() => diffuculty = "hard"}
        >
          Hard
        </Button>
      </div>
      <div className="container mx-auto flex justify-center space-x-4">
        <Button
          color="white"
          onClick={() => diffuculty = "easy"}
        >
          Easy
        </Button>
        <Button
          color="white"
          onClick={() => diffuculty = "medium"}
        >
          Medium
        </Button>
        <Button
          color="white"
          onClick={() => diffuculty = "hard"}
        >
          Hard
        </Button>
      </div>
      <div className="container mx-auto flex justify-center space-x-4">
        <Button
          color="grey"
          onClick={() => diffuculty = "easy"}
        >
          Easy
        </Button>
        <Button
          color="grey"
          onClick={() => diffuculty = "medium"}
        >
          Medium
        </Button>
        <Button
          color="grey"
          onClick={() => diffuculty = "hard"}
        >
          Hard
        </Button>
      </div>
    </div>
  );
}

export default App;
