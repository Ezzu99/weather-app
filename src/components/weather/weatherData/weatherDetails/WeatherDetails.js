import React from 'react';
import './WeatherDetails.css';

const WeatherDetails = (props) => {
    return (
        <>
            <div className="detail-container">
                <h6 className="container-title">{props.title}</h6>
                <p className="container-value">{props.value}</p>
            </div>
        </>
    );
}

export default WeatherDetails;