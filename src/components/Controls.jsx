import React from 'react';
import '../styles/controls.css'

const Controls = ({ color, onColorChange, speed, onSpeedChange, soundOn, onSoundChange, paused, onPauseToggle }) => {
    return (
        <div className='controls'>
            <div className='row'>
                <div>
                    <label className='label'>
                        Speed:
                        <input
                            className='speedInput'
                            type="number"
                            value={speed}
                            onChange={onSpeedChange}
                            min="0"
                            step="5"
                        />
                    </label>
                </div>
                <div >
                    <label>
                        <button className='buttons' onClick={onSoundChange}>
                            {soundOn ? 'SoundOff' : 'SoundOn'}
                        </button>
                    </label>
                </div>
            </div>

            <div className='row'>
                <div >
                    <label className='label'>
                        Select Color:
                        <select className='select' value={color} onChange={onColorChange}>
                            <option value="#ff0000">Red</option>
                            <option value="#00ff00">Green</option>
                            <option value="#ffff00">Yellow</option>
                            <option value="#0000ff">Blue</option>
                        </select>
                    </label>
                </div>
                <div>
                    <button className='buttons' onClick={onPauseToggle}>
                        {paused ? 'Resume' : 'Pause'}
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Controls;