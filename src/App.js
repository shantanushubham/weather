import "./App.css";
import { useEffect, useState } from "react";
import { forecast } from "./forecastApi";

function App() {
  const [state, setState] = useState({
    latitude: 0,
    longitude: 85.35,
  });
  const [forecastState, setForecastState] = useState({});

  const [hourlyForecast, setHourlyForecast] = useState([]);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((position) =>
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    );
  }, []);

  useEffect(() => {
    forecast(state.latitude, state.longitude).then((response) => {
      let hourlyForecastTemp = [];
      for (let i = 0; i < response.data.hourly.time.length; i++) {
        hourlyForecastTemp.push({
          time: response.data.hourly.time[i],
          temperature: response.data.hourly.temperature_2m[i],
        });
      }
      setForecastState(response.data);
      setHourlyForecast([...hourlyForecastTemp]);
    });
  }, [state]);

  return (
    <div>
      <h1>Welcome Shantanu!</h1>
      <h2>
        Today's forecast for Lat: {state.latitude} and Long: {state.longitude}{" "}
        is:
      </h2>
      <div>
        <h5>Your elevation is: {forecastState.elevation} meters</h5>
        {hourlyForecast.map((forecastInfo) => {
          return (
            <div>
              <span>
                Time: {new Date(forecastInfo.time).toLocaleDateString()}{" "}
                {new Date(forecastInfo.time).toLocaleTimeString()}
              </span>{" "}
              &nbsp;
              <span>Temp: {forecastInfo.temperature} °C</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

// const [state, functionToChangeState] = useState(initialValueOfState)
