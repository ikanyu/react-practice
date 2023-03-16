import './App.css';
import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import 'moment-timezone';
import axios from 'axios';

async function retrieveForecast() {
  let currentDateTime = moment.tz('Asia/Singapore').format();
  const formattedDateTime = currentDateTime.replace(/\+.*$/, '');
  const date = moment.tz('Asia/Singapore').format('YYYY-MM-DD');

  const weatherEndpoint =
    'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=' +
    formattedDateTime +
    '&date=' +
    date;

  try {
    const response = await axios.get(weatherEndpoint);
    console.log('success!');

    return response.data.items[0].forecasts;
  } catch (error) {
    console.log('We have encountered an error.');
  }
}

function List(props) {
  const isRetrieved = props.isRetrieved;
  const forecasts = props.forecasts[0];

  if (isRetrieved) {
    const listItems = forecasts.map((forecast) => (
      <li>
        {forecast.area} {forecast.forecast}
      </li>
    ));
    return <ul>{listItems}</ul>;
  } else {
    return <></>;
  }
}

function App() {
  const [forecasts, setForecasts] = useState([]);
  const [retrieved, setRetrieved] = useState(false);

  async function handleClick() {
    const data = await retrieveForecast();
    const updatedData = [...forecasts, data];
    setForecasts(updatedData);
  }

  useEffect(() => {
    if (forecasts.length) {
      setRetrieved(true);
    }
  }, [forecasts]);

  return (
    <div className="App">
      <h1>Singapore 2 Hour Weather Forecast</h1>
      <button type="button" onClick={handleClick}>
        Retrieve Now!
      </button>
      <List isRetrieved={retrieved} forecasts={forecasts} />
    </div>
  );
}

export default App;
