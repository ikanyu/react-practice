import './styles.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    console.log('try to start');
    window.timerId = setInterval(() => {
      setTimer((timer) => timer + 30);
    }, 1000);
    console.log(window.timerId);
  };
  const stopTimer = () => {
    clearInterval(window.timerId);
    window.timerId = null;
  };
  const resetTimer = () => {
    clearInterval(window.timerId);
    window.timerId = null;
    setTimer(0);
  };

  const formatTime = () => {
    const hrs = ~~(timer / 3600);
    const mins = ~~((timer % 3600) / 60);
    const secs = ~~timer % 60;

    let ret = '';

    if (hrs > 0) {
      ret += '' + hrs + 'hour(s) ' + (mins < 10 ? '0 minutes' : '');
    }

    ret += '' + mins + 'minute(s) ' + (secs < 10 ? '0 minutes' : '');
    ret += '' + secs + ' second(s) ';

    return ret;
  };
  return (
    <div className="container">
      <h1>Timer</h1>
      {timer < 60 ? <span>{timer} seconds</span> : <span>{formatTime()}</span>}
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
