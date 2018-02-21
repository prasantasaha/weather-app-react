import { List, fromJS } from "immutable";
import "whatwg-fetch";
import Geocoder from "geocoder";

const AUTOCOMPLETE_ENDPOINT =
  "//us-central1-weather-app-micro.cloudfunctions.net/placesAutoComplete";

const INITIAL_STATE = fromJS({
  locationName: "",
  position: {},
  places: [
    { id: 0, name: "Facebook" },
    { id: 1, name: "Yelp" },
    { id: 2, name: "TV Ad" },
    { id: 3, name: "Friend" },
    { id: 4, name: "Other" }
  ]
});

// the reducer
export default function(state = INITIAL_STATE, action) {
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
    Geocoder.reverseGeocode(
      latitude,
      longitude,
      function(err, data) {
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
      },
      { key: "AIzaSyBhLkWlQgsVgvd9XaybJQecqXDSi8fHX4c" }
    );
  };
}

export function placesAutoComplete(input) {
  return (dispatch, getState) => {
    if (input && input.trim().length) {
      fetch(`${AUTOCOMPLETE_ENDPOINT}?input=${input}`, { mode: "cors" })
        .then(result => result.json())
        .then(data => {
          let prediction = data.prediction || [];
          dispatch(
            setLocationData(
              "places",
              List(prediction && prediction.length ? prediction : [])
            )
          );
        });
    }
  };
}
