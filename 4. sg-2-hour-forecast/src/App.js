import './App.css';
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-timezone';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSun, faCloudSun } from '@fortawesome/free-solid-svg-icons';

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

    return response.data.items[0].forecasts;
  } catch (error) {
    console.log('We have encountered an error.');
  }
}

function List(props) {
  const isRetrieved = props.isRetrieved;
  const forecasts = props.forecasts[0];

  if (isRetrieved) {
    const listItems = forecasts.map((forecast) => {
      const result = forecast.forecast;
      let iconClass;
      if (result.includes('Fair')) {
        iconClass = faCloud;
      } else if (result.includes('Sun')) {
        iconClass = faSun;
      } else if (result == 'Partly Cloudy (Day)') {
        iconClass = faCloudSun;
      }

      return (
        <Col key={uuidv4()}>
          <Card>
            <Card.Body>
              <FontAwesomeIcon icon={iconClass} />
              <Card.Title>{forecast.forecast}</Card.Title>
              <Card.Text>{forecast.area}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return listItems;
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
    <Container>
      <div className="App">
        <Container>
          <h1>Singapore 2 Hour Weather Forecast</h1>
          <Button variant="success" onClick={handleClick}>
            Retrieve Now!
          </Button>
        </Container>
        <Container>
          <Row xs={6} md={12}>
            <List isRetrieved={retrieved} forecasts={forecasts} />
          </Row>
        </Container>
      </div>
    </Container>
  );
}

export default App;
