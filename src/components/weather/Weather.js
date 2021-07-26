import React, { useState } from 'react';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import WeatherData from './weatherData/WeatherData';
import './Weather.css';
import Clouds from '../../assets/clouds.png';

const api = axios.create();

const Weather = () => {

    const [wData, setwData] = useState({
        name : 'Search City',
        sys : {
            id : -1
        },
        weather : [{
            description : 'none',
            icon : '01d'
        }],
        main : {
            feels_like : 273,
            humidity : 0,
            pressure : 0,
            temp : 273,
            temp_max : 273,
            temp_min : 273
        },
        visibility : 0,
        clouds : {
            all : 0
        },
        wind : {
            deg : 0,
            speed : 0
        }
    });
    const [city, setCity] = useState('');

    const getData = async (event) => {
        event.preventDefault();

        console.log(process.env);

        await api.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${secrets.AUTH_KEY}`).then(res => {
            setwData(res.data);
        }).catch(e => {
            console.log(e);
        })

        setCity('');

        console.log(wData);
    }

    const inputHandler = (event) => {
        setCity(event.target.value);
    }

    return (
        <>
            <div className="header">
                <h3 className="header-app-name">.weather</h3>
            </div>
            <div className="content">
                <div className="content-getWeather">
                    <h5 className="getWeather-moto">Get weather on your fingertips</h5>
                    <form onSubmit={getData}>
                        <input className="input" type="text" placeholder="Enter City" value={city} onChange={inputHandler} autoFocus></input>
                    </form>
                </div>
                <div className="content-weather">
                    <TransitionGroup>
                        <CSSTransition
                            key={wData.sys.id}
                            timeout={600}
                            classNames="card"
                        >
                            <WeatherData
                                cityName={wData.name.toUpperCase()}
                                iconp={`http://openweathermap.org/img/wn/${wData.weather[wData.weather.length-1].icon}@2x.png`}
                                currentTemp={wData.main.temp}
                                maxTemp={wData.main.temp_max}
                                minTemp={wData.main.temp_min}
                                description={wData.weather[wData.weather.length-1].description}
                                feelsLike={wData.main.feels_like}
                                humidity={wData.main.humidity}
                                pressure={wData.main.pressure}
                                visibility={wData.visibility}
                                cloudiness={wData.clouds.all}
                                windDeg={wData.wind.deg}
                                windSpeed={wData.wind.speed}
                            />
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </div>
            <div className="footer">
                
            </div>
            <img className="image-clouds" src={Clouds} alt="background_Clouds"></img>
        </>
    )
}

export default Weather;