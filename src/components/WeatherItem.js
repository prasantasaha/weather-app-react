import React from "react";
import Moment from "moment";
import Skycons from "react-skycons";
import { FormattedNumber } from "react-intl";

import "./WeatherItem.css";

export default class WeatherItem extends React.Component {
  render() {
    let weather = this.props.info;
    let days = {
      sameDay: "[Todays]",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      lastDay: "[Yesterday]",
      lastWeek: "[Last] dddd",
      sameElse: "dddd"
    };
    return (
      <div className="weather-item">
        <div>{Moment(weather.time * 1000).calendar(null, { days })}</div>
        <p>
          {
            <Skycons
              color="white"
              icon={weather.icon
                .toUpperCase()
                .split("-")
                .join("_")}
            />
          }
        </p>
        <span>
          H {weather.temperatureHigh}° / L{" "}
          {weather.temperatureLow}°
        </span>
        <section className="day-info">
          <ul>
            <li>
              <span className="label">Chance of Rain:</span>
              <span className="data">
                <FormattedNumber
                  className="data"
                  value={weather.precipProbability * 100}
                />%
              </span>
            </li>
            <li>
              <span className="label">Humidity:</span>
              <span className="data">
                <FormattedNumber value={weather.humidity * 100} />%
              </span>
            </li>
            <li>
              <span className="label">Wind:</span>
              <span className="data">
                <FormattedNumber value={weather.windSpeed || 0} /> mph
              </span>
            </li>
            <li>
              <span className="label">Visibility:</span>
              <span className="data">
                <FormattedNumber value={weather.visibility || 0} /> mi
              </span>
            </li>
            <li>
              <span className="label">UV Index:</span>
              <span className="data">
                <FormattedNumber value={weather.uvIndex} />
              </span>
            </li>
          </ul>
        </section>
        <div className="weather-summary">{weather.summary}</div>
      </div>
    );
  }
}
