import React, { useState } from 'react';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import WeatherData from './weatherData/WeatherData';
import './Weather.css';
import Clouds from '../../assets/clouds.png';

const api = axios.create({
    baseURL : 'http://dataservice.accuweather.com'
});

const Weather = () => {

    const [city, setCity] = useState('');
    const [cityData, setcityData] = useState([{
        Key : -1,
        LocalizedName : "Search City"
    }])
    const [cityWeather, setcityWeather] = useState([{
        Temperature : {
            Metric : {
                Value : 0
            }
        },
        TemperatureSummary : {
            Past24HourRange : {
                Maximum : {
                    Metric : {
                        Value : 0
                    }
                },
                Minimum : {
                    Metric : {
                        Value : 0
                    }
                }
            }
        },
        WeatherText : 'none',
        RealFeelTemperature : {
            Metric : {
                Value : 0
            }
        },
        RelativeHumidity : 0,
        Pressure : {
            Metric : {
                Value : 0
            }
        },
        visibility : {
            Metric : {
                Value : 0
            }
        },
        CloudCover : 0,
        Wind : {
            Direction : {
                Degrees : 0
            },
            Speed : {
                Metric : {
                    Value : 0
                }
            }
        },
        UVIndex : 0
    }]);

    const getData = async (event) => {
        event.preventDefault();

        console.log(process.env);

        await api.get(`locations/v1/cities/search?apikey=DfclVlj2OGUP2apA2DAjx9KkIGOU4fAm&q=${city}`)
        .then(res => {
            setcityData(res.data);
        })
        .catch(e => console.log(e))

        await api.get(`currentconditions/v1/q=261158?apikey=DfclVlj2OGUP2apA2DAjx9KkIGOU4fAm&details=true`)
        .then(res => {
            setcityWeather(res.data);
        })
        .catch(e => console.log(e))

        setCity('');

        console.log(cityData);
        console.log(cityWeather);
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
                            key={cityData[0].Key}
                            timeout={600}
                            classNames="card"
                        >
                            <WeatherData
                                cityName={cityData[0].LocalizedName}
                                iconp=""
                                currentTemp={cityWeather[0].Temperature.Metric.Value}
                                maxTemp={cityWeather[0].TemperatureSummary.Past24HourRange.Maximum.Metric.Value}
                                minTemp={cityWeather[0].TemperatureSummary.Past24HourRange.Minimum.Metric.Value}
                                description={cityWeather[0].WeatherText}
                                feelsLike={cityWeather[0].RealFeelTemperature.Metric.Value}
                                humidity={cityWeather[0].RelativeHumidity}
                                pressure={cityWeather[0].Pressure.Metric.Value}
                                visibility={cityWeather[0].visibility.Metric.Value}
                                cloudiness={cityWeather[0].CloudCover}
                                windDeg={cityWeather[0].Wind.Direction.Degrees}
                                windSpeed={cityWeather[0].Wind.Speed.Metric.Value}
                                uvIndex={cityWeather[0].UVIndex}
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