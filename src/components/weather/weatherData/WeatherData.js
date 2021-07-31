import React from 'react';
import WeatherDetails from './weatherDetails/WeatherDetails';
import './WeatherData.css'

const WeatherData = (props) => {

    return (
        <>
            <div className="container">
                <div className="container-header">
                    <h1 className="city-name">{props.cityName}</h1>
                    <img className="icon" src={props.iconp} alt="icon"></img>
                </div>
                <div className="container-temp">
                    <h3 className="temp">{(props.currentTemp)}°</h3>
                    <h5 className="temp-min-max">H:{(props.maxTemp)}° L:{(props.minTemp)}°</h5>
                    <p className="description">{props.description}</p>
                </div>
                <div className="container-details">
                    <WeatherDetails title="Feels Like" value={`${(props.feelsLike)}°`}/>
                    <WeatherDetails title="Humidity" value={`${props.humidity}%`}/>
                    <WeatherDetails title="Pressure" value={`${props.pressure} hPa`}/>
                    <WeatherDetails title="Visibility" value={`${props.visibility} km`}/>
                    <WeatherDetails title="Cloudiness" value={`${props.cloudiness}%`}/>
                    <WeatherDetails title="Wind" value={`${`${props.windDeg}°`} at ${`${(props.windSpeed)} km/hr`}`}/>
                </div>
            </div>
        </>
    );
}

export default WeatherData;