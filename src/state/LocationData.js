import { List, fromJS } from "immutable";
import "whatwg-fetch";
import { getForecast } from "./WeatherData";

const MAPS_ENDPOINT = `${process.env.REACT_APP_API_BASE_URL}/maps/`;

const INITIAL_STATE = fromJS({
  locationName: "",
  position: {},
  places: List([])
});

// the reducer
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "setLocationData":
      return state.set(action.key, action.value);
    default:
      return state;
  }
}

// reducers actions
export function setLocationData(key, val) {
  return { type: "setLocationData", key: key, value: val };
}

export function updatPosition(newPosition) {
  return (dispatch, getState) => {
    dispatch(setLocationData("position", newPosition));
  };
}




// TODO: move to cloud functions
export function reverseGeocode(latitude, longitude) {
  return (dispatch, getState) => {
    fetch(`${MAPS_ENDPOINT}reverseGeocode?latitude=${latitude}&longitude=${longitude}`)
      .then((res) => {
        return res.json();
      }).then((data) => {
        if (data && data.results && data.results.length) {
          dispatch(
            setLocationData(
              "locationName",
              List(data.results).find(item => {
                return (
                  item.types.length === 1 && item.types[0] === "postal_code"
                );
              })["formatted_address"]
            )
          );
        }
      });
  };
}

export function placesAutoComplete(input) {
  return (dispatch, getState) => {
    if (input && input.trim().length) {
      fetch(`${MAPS_ENDPOINT}autocomplete?input=${input}`, { mode: "cors" })
        .then(result => result.json())
        .then(data => {
          let predictions = data.predictions || [];
          dispatch(
            setLocationData(
              "places",
              List(predictions.length ? predictions.map(place => {
                return {
                  placeId: place.place_id,
                  displayName: place.description
                }
              }) : [])
            )
          );
        });
    }
  };
}

export function getPlaceById(placeid) {
  return (dispatch, getState) => {
    fetch(`${MAPS_ENDPOINT}place?placeid=${placeid}`, { mode: "cors" })
      .then(result => result.json())
      .then(data => {
        const position = {
          latitude: data.result.geometry.location.lat,
          longitude: data.result.geometry.location.lng
        }
        dispatch(setLocationData("locationName", data.result.formatted_address));
        dispatch(updatPosition(position));
        dispatch(getForecast());
      });
  }
}
