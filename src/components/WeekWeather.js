import React from "react";
import { connect } from "react-redux";

import CircularProgress from 'material-ui/CircularProgress';
import WeatherItem from "../components/WeatherItem";
import { updatPosition, getForecast } from "../state/WeatherData";

class WeekWeather extends React.Component {

    componentWillReceiveProps(newProps) {
        if (!this.props.coords && !Object.is(newProps.coords, this.props.coords)) {
            const position = {
                latitude: newProps.coords.latitude,
                longitude: newProps.coords.longitude
            };
            this.props.dispatch(updatPosition(position));
            this.props.dispatch(getForecast());
        }
    }

    render() {
        return <div className="week-container">
            {this.props.WeatherData.get("forecast").size
                ? this.props.WeatherData.get("forecast").get("daily").get("data").map((item, index) => {
                    return <WeatherItem key={item.get("time")} info={item}>index</WeatherItem>;
                })
                : <div className="progress-container"><CircularProgress color="white" thickness={7} /></div>}

        </div>
    }
}

export default connect(state => state)(WeekWeather);