import { List, fromJS } from "immutable";
import DarkSkyApi from "dark-sky-api";
import Geocoder from "geocoder";

DarkSkyApi.proxy = "//us-central1-weather-app-micro.cloudfunctions.net/forecast";

const INITIAL_STATE = fromJS({
  loading: false,
  page: 1,
  locationName: "",
  position: {},
  dailyForecast: List()
});

// the reducer
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "setWeatherData":
      return state.set(action.key, action.value);
    default:
      return state;
  }
}

// reducers actions
export function setWeatherData(key, val) {
  return { type: "setWeatherData", key: key, value: val };
}

export function updatPosition(newPosition) {
  return (dispatch, getState) => {
    dispatch(setWeatherData("position", newPosition));
  };
}

// Async actions
export function getForecast() {
  return (dispatch, getState) => {
    dispatch(setWeatherData("loading", true));
    DarkSkyApi.loadForecast(getState().WeatherData.get("position")).then(
      result => {
        dispatch(setWeatherData("loading", false));
        dispatch(setWeatherData("dailyForecast", List(result.daily.data)));
      }
    );
  };
}

export function reverseGeocode(latitude, longitude) {
  return (dispatch, getState) => {
    Geocoder.reverseGeocode(latitude, longitude, function (err, data) {
      if (data && data.results && data.results.length) {
        dispatch(setWeatherData("locationName",
          List(data.results).find(item => {
            return item.types.length === 1 && item.types[0] === "postal_code";
          })["formatted_address"]
        ));
      }
    }, {key: "AIzaSyBhLkWlQgsVgvd9XaybJQecqXDSi8fHX4c"});
  };
}
