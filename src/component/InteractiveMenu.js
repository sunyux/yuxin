import React, { useState } from 'react';
import InteractiveMenu1 from './InteractiveMenu1';
import KeyboardVisual from './KeyboardVisual';

const InteractiveMenu = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(true);
  
  // Handler for key presses from the keyboard visual
  const handleKeyPress = (keyChar) => {
    console.log(`Key pressed: ${keyChar}`);
    // You can add additional functionality here
  };
  
  // Custom key colors (optional)
  const keyColors = {
    'A': 0xff4500, // About - Orange-red
    'P': 0x4169e1, // Projects - Royal blue
    'S': 0x32cd32, // Skills - Lime green
    'C': 0xffa500  // Contact - Orange
  };
  
  return (
    <div className="relative w-full h-screen">
      {/* Original Interactive Menu */}
      <InteractiveMenu1 />
      
      {/* Optional keyboard toggle button */}
      <div className="absolute bottom-4 right-4 z-10">
        <button 
          className="px-3 py-2 bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-700"
          onClick={() => setKeyboardVisible(!keyboardVisible)}
        >
          {keyboardVisible ? 'Hide Keyboard' : 'Show Keyboard'}
        </button>
      </div>
      
      {/* Keyboard Visual - positioned as overlay */}
      {keyboardVisible && (
       <div className="absolute bottom-0 left-0 right-0 h-[70vh] z-0 " style={{ height: '50vh' }}>
          <KeyboardVisual 
            onKeyPress={handleKeyPress} 
            keyColors={keyColors}
          />
        </div>
      )}
    </div>
  );
};

export default InteractiveMenu;