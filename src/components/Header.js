import React from "react";
import { connect } from "react-redux";
// import AutoComplete from 'material-ui/AutoComplete';
import { reverseGeocode } from "../state/WeatherData";

import './Header.css'
class Header extends React.Component {
  state = {
    dataSource: [],
  };
  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };
  componentWillReceiveProps(newProps) {
    if (!this.props.coords && !Object.is(newProps.coords, this.props.coords)) {
      this.props.dispatch(
        reverseGeocode(newProps.coords.latitude, newProps.coords.longitude)
      );
    }
  }

  render() {
    return (
      <header>
        <span className="location-name">{this.props.WeatherData.get("locationName")}</span>
        <div className="location-search">
          {/* <AutoComplete
          hintText="Show me the weather in ... city, zip, place" 
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}/> */}
        </div>

        <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
      </header>
    );
  }
}

export default connect(state => state)(Header);
