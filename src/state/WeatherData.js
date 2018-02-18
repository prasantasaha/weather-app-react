import { fromJS } from "immutable";
import DarkSkyApi from 'dark-sky-api';

DarkSkyApi.proxy = '//us-central1-weather-app-micro.cloudfunctions.net/forecast';

const INITIAL_STATE = fromJS({
    loading: false,
    page: 1,
    position: {},
    forecast: {}
});

// the reducer
export default function(state = INITIAL_STATE, action) {
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
        DarkSkyApi.loadForecast(getState().WeatherData.get("position"))
            .then(result => {
                dispatch(setWeatherData("loading", false));
                dispatch(setWeatherData("forecast", fromJS(result)));
            });
    };

}