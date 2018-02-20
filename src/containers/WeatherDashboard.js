import React from "react";

import { geolocated } from "react-geolocated";
import Header from "../components/Header";
import WeekWeather from "../components/WeekWeather";
import "./WeatherDashboard.css";

class WeatherDashboard extends React.Component {
  
  render() {
    return (
      <div className="dashboard-container">
        <Header coords={this.props.coords}/>
        <div className="weather-container">
          {<WeekWeather coords={this.props.coords} />}
        </div>
      </div>
    );
  }
}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(WeatherDashboard);
