import React from 'react';
import useWindowSize from 'react-use-window-size';
import Confetti from 'react-confetti';
export default function Result() {
  const { width, height } = useWindowSize();
  const percentage = localStorage.getItem('score');
  const displayPercentage = percentage !== null ? percentage : '';
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
        {displayPercentage > 50 && <h2>Kudos, Samuvel Johnson</h2>}
        {displayPercentage < 50 && <h2>Good Try, Samuvel Johnson</h2>}
        <div>Your accurancy in reading: {displayPercentage}%</div>
      </div>
    </div>
  );
}
