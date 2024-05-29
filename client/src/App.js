import React from 'react';
import Nono from './p5/sketch';
import './index.css';

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container mx-auto flex justify-center items-center">
        <Nono />
      </div>
    </div>
  );
}

export default App;