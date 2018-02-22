import { List, fromJS } from "immutable";
import DarkSkyApi from "dark-sky-api";

DarkSkyApi.proxy = `${process.env.REACT_APP_API_BASE_URL}/forecasts`;

const INITIAL_STATE = fromJS({
  loading: false,
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

// Async actions
export function getForecast() {
  return (dispatch, getState) => {
    dispatch(setWeatherData("loading", true));
    DarkSkyApi.loadForecast(getState().LocationData.get("position")).then(
      result => {
        dispatch(setWeatherData("loading", false));
        dispatch(setWeatherData("dailyForecast", List(result.daily.data)));
      }
    );
  };
}
