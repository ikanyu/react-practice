import './App.css';
import { useState } from 'react';
import moment from 'moment';
import 'moment-timezone';

function App() {
  const [forecasts, setForecasts] = useState([]);

  function retrieveForecast() {
    let currentDateTime = moment.tz('Asia/Singapore').format();
    const formattedDateTime = currentDateTime.replace(/\+.*$/, '');

    const sgWeatherApi =
      'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=2023-03-15T23:00:00&date=2023-03-15';
  }

  return (
    <div className="App">
      <h1>Singapore 2 Hour Weather Forecase</h1>
      <button type="button" onClick={retrieveForecast}>
        Retrieve Now!
      </button>
    </div>
  );
}

export default App;
