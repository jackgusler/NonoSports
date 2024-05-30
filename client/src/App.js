import React, { useState } from "react";
import Nono from "./p5/sketch";
import "./index.css";

function App() {
  const [image, setImage] = useState(null);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container mx-auto flex">
        <div className="w-1/2 flex justify-center items-center">
          {image && <img src={image.canvas.toDataURL()} alt="Random" />}
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <Nono setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default App;