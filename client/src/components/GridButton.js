// GridButton.js
import React from 'react';

const GridButton = ({ onMouseDown, onMouseOver, buttonState }) => {
  const getButtonColor = () => {
    switch (buttonState) {
      case 'checked':
        return '#93C5FD';
      case 'marked':
        return 'white';
      default:
        return 'white';
    }
  };

  return (
    <button
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      style={{
        backgroundColor: getButtonColor(),
        width: '50px',
        height: '50px',
        border: '1px solid #446BA2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {buttonState === 'marked' && (
        <i
          className="fas fa-flag fa-2x"
          style={{ color: '#446BA2', width: '24px', height: '24px' }}
        ></i>
      )}
    </button>
  );
};

export default GridButton;