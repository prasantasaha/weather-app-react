import { combineReducers } from "redux";
import LocationData from "./LocationData";
import WeatherData from "./WeatherData";
import { reducer as ReduxFormReducer } from 'redux-form'

export default combineReducers({
  LocationData,
  WeatherData,
  ReduxFormReducer
});
