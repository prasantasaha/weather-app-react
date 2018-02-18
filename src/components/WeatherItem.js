import React from "react"
import Moment from "moment"
import Skycons from "react-skycons"

import './WeatherItem.css'

export default class WeatherItem extends React.Component {

    render() {
        let weather = this.props.info;
        let days = {
            sameDay: '[Todays]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'dddd'
        };
        return <div className="weather-item">
            <div>{Moment(weather.get("time") * 1000).calendar(null, { days })}</div>
            <p>{<Skycons color="white" icon={weather.get("icon").toUpperCase().split("-").join("_")} />}</p>
            <span>H {weather.get("temperatureHigh")}° / L {weather.get("temperatureLow")}°</span>  
            <section className="day-info">
                <ul>
                    <li>
                        <span className="label">Chance of Rain:</span>
                        <span className="data">{weather.get("precipProbability")*100}%</span>
                    </li>
                    <li>
                        <span className="label">Humidity:</span>
                        <span className="data">{weather.get("humidity")*100}%</span>
                    </li>
                    <li>
                        <span className="label">Wind:</span>
                        <span className="data">{weather.get("windSpeed")} mph</span>
                    </li>
                    <li>
                        <span className="label">Visibility:</span>
                        <span className="data">{weather.get("visibility")} mi</span>
                    </li>
                    <li>
                        <span className="label">UV Index:</span>
                        <span className="data">{weather.get("uvIndex")}</span>
                    </li>
                </ul>
            </section>
            <div className="weather-summary">{weather.get("summary")}</div>
        </div>
    }
}