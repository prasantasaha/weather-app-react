import React from "react";
import { connect } from "react-redux";

import { reverseGeocode } from "../state/LocationData";

import "./Header.css";
import { PlacesAutoComplete } from "./PlacesAutoComplete";
class Header extends React.Component {
  componentWillReceiveProps = newProps => {
    if (!this.props.coords && !Object.is(newProps.coords, this.props.coords)) {
      this.props.dispatch(
        reverseGeocode(newProps.coords.latitude, newProps.coords.longitude)
      );
    }
  };

  render() {
    return (
      <header>
        <div className="info-bar">
          <span className="location-name">
            {this.props.LocationData.get("locationName")}
          </span>
          <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
        </div>
        <div className="">
          <PlacesAutoComplete />
        </div>
      </header>
    );
  }
}

export default connect(state => state)(Header);
