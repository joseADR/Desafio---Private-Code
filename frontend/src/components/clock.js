import React, { useState, useEffect } from 'react';
import './styles.css';
import { FiPlay, FiPause } from 'react-icons/fi';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  // function reset() {
  //   setSeconds(0);
  //   setIsActive(false);
  // }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="clock-container">
      <div className="time">
        {seconds}s
      </div>

        <button className="button-clock-functions" type={`button-clock-functions${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? <FiPause/> : <FiPlay/>}
        </button>
        
    </div>
  );
};

export default Timer;