import React from 'react';
import useWindowSize from 'react-use-window-size';
import Confetti from 'react-confetti';
export default function Result() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <Confetti width={width} height={height} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '40%'
        }}>
        <h2>Kudos, Samuvel Johnson</h2>
        <div>Your accurancy in reading: 90%</div>
      </div>
    </div>
  );
}
