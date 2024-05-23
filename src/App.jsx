import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

//backgrounds
import base from './assets/base.jpg';
import clear from './assets/clear.jpg';
import cloddy from './assets/cloddy.jpg';
import drizzle from './assets/drizzle.jpg';
import rain from './assets/rain.jpg';
import snow from './assets/snow.jpg';
import storm from './assets/storm.jpg';


function App() {
  //States
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");
  const [background, setBackground] = useState(base);

  const textStyle = {color: background == rain || background == clear ? 'black' : ''};


  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const getData = (event) =>{
    if (event.key === "Enter"){
      event.preventDefault();
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0af188752a7c3741b23a4a76bf36cffd`)
        .then(response =>{
          setWeather(response.data);
          console.log(response.data.weather[0].main)

          //Condition for background image
          switch (response.data.weather[0].main){
            case "Clear":
                setBackground(clear)
                break;
            case "Clouds":
                setBackground(cloddy)
                break;
            case "Snow":
                setBackground(snow)
                break;
            case "Rain":
                setBackground(rain)
                break;
            case "Drizzle":
                setBackground(drizzle)
                break;
            case "Thunderstorm":
                setBackground(storm)
                break;
            default:
                setBackground(base);
            }
        })
        .catch(error => {
          if(error.code === "ERR_BAD_REQUEST")
          alert(`${city} not found in our database`);
        });
        setCity("");
    }
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${background})`}}>
      <div className="top">
        <Form>
          <Form.Control className='input'
          type="text" 
          placeholder="Enter location" 
          value={city}
          onChange={handleCity}
          onKeyDown={getData}/>
        </Form>
        <h2 style={textStyle}>{weather.name !== undefined ? weather.name : ""}</h2>
      </div>
        {weather.name !== undefined ?
          <div className="bottom">
            <p style={textStyle}>{weather.weather[0].description[0].toUpperCase()+weather.weather[0].description.slice(1)}</p>
            <Card className="container">
              <div>
                <p style={textStyle}>Temperature</p>
                <p style={textStyle}> {Math.round(weather.main.temp - 273.15)}ºC</p>
              </div>
              <div>
                <p style={textStyle}>Sensation</p>
                <p style={textStyle}>{Math.round(weather.main.feels_like - 273.15)}ºC</p>
              </div>
              <div>
                <p style={textStyle}>Humidity</p>
                <p style={textStyle}>{weather.main.humidity}%</p>
              </div>
              <div>
                <p style={textStyle} >Wind</p>
                <p style={textStyle}>{weather.wind.speed} m/sec</p>
              </div>
            </Card>
          </div>
          : ""}
    </div>
  );
}

export default App;


