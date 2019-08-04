import React, { useState, useEffect } from 'react';

const Timer = props => {
  const { secs, onEnd } = props;
  const [seconds, setSeconds] = useState(secs);
  //   const [isActive, setIsActive] = useState(true);

  //   function toggle() {
  //     setIsActive(!isActive);
  //   }

  //   function reset() {
  //     setSeconds(props.secs);
  //   }

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);
    if (seconds <= 0) {
      onEnd();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  return (
    <div className="app">
      <div className="time" style={{ fontSize: '24px' }}>
        {seconds}
      </div>
    </div>
  );
};

export default Timer;
