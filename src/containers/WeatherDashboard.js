import React from "react"
import { geolocated } from 'react-geolocated';

import WeekWeather from "../components/WeekWeather";
import './WeatherDashboard.css';

class WeatherDashboard extends React.Component {

    updateWeatherData(weatherData) {
        var weather = weatherData.list.map(dayWeather => {
            return {
                dayWeather,
                country: weatherData.city.country,
                city: weatherData.city.name
            }
        });

        this.setState({
            weekWeather: weather,
            city: this.state.searchedCity
        });
    }



    render() {
        return <div className="weather-container">
            {<WeekWeather coords={this.props.coords} />}
        </div>;
    }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(WeatherDashboard);