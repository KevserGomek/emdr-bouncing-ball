import React, { useState } from 'react';
import Ball from './components/Ball';
import Controls from './components/Controls';

const App = () => {
  const [color, setColor] = useState('#ff0000'); 
  const [speed, setSpeed] = useState(5); 
  const [paused, setPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(false); 

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setSpeed(Number(event.target.value));
  };

  const togglePause = () => {
    setPaused(!paused);
  };

  return (
    <div>
      <Controls 
        color={color}
        onColorChange={handleColorChange}
        speed={speed}
        onSpeedChange={handleSpeedChange}
        soundOn={soundOn}
        onSoundChange={() => setSoundOn(!soundOn)}
        paused={paused}
        onPauseToggle={togglePause}
      />
      <Ball 
        color={color}
        speed={speed}
        paused={paused}
        soundOn={soundOn}
      />
    </div>
  );
};

export default App;
