import React from "react";
import { connect } from "react-redux";
import { reverseGeocode } from "../state/WeatherData";

class Header extends React.Component {
  componentWillReceiveProps(newProps) {
    if (!this.props.coords && !Object.is(newProps.coords, this.props.coords)) {
    //   this.props.dispatch(
    //     // reverseGeocode(newProps.coords.latitude, newProps.coords.longitude)
    //   );
    }
  }

  render() {
    return (
      <header>
          <span>{this.props.WeatherData.get("geocode")}</span>
        <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
      </header>
    );
  }
}

export default connect(state => state)(Header);
