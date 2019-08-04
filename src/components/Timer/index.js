import React, { useState, useEffect } from 'react';

const Timer = props => {
  console.log(props.secs);
  const { secs, onEnd } = props;
  const [seconds, setSeconds] = useState(props.secs);
  const [isActive, setIsActive] = useState(true);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(props.secs);
  }

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);
    if (seconds <= 0) {
      console.log(seconds);
      onEnd();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="app">
      <div className="time" style={{ fontSize: '24px' }}>
        {seconds}s
      </div>
    </div>
  );
};

export default Timer;
