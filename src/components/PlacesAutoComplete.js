import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import debounce from "lodash/debounce";
import { AutoComplete as MUIAutoComplete } from "material-ui";
import { AutoComplete, Toggle } from "redux-form-material-ui";

import { placesAutoComplete, getPlaceById } from "../state/LocationData";

export class PlacesAutoComplete extends React.Component {

  constructor(props) {
    super(props);
    this.handleUpdateInput = debounce(this.handleUpdateInput, 250);

  }

  componentWillReceiveProps = newProps => {
    if (newProps.ReduxFormReducer.placesAutoComplete.values.place 
      && this.props.ReduxFormReducer.placesAutoComplete.values.place !== newProps.ReduxFormReducer.placesAutoComplete.values.place) {
      this.props.dispatch(
        getPlaceById(newProps.ReduxFormReducer.placesAutoComplete.values.place)
      );
    }
  }

  handleUpdateInput = (value) => {
    this.props.dispatch(placesAutoComplete(value));
  };


  render() {
    return (
      <div className="location-search">
        <form>
          {/* <Field
            name="thinCrust"
            component={Toggle}
            label="Thin Crust"
            labelPosition="left"
          /> */}
          <Field
            name="place"
            component={AutoComplete}
            openOnFocus
            fullWidth
            searchText={this.props.LocationData.get("locationName")}
            hintText="Show me the weather in ... city, zip, place"
            onKeyDown={event => this.handleUpdateInput(event.target.value)}
            filter={MUIAutoComplete.fuzzyFilter}
            dataSourceConfig={{ text: "displayName", value: "placeId" }}
            dataSource={this.props.LocationData.get("places").toArray()}
          />
        </form>
      </div>
    );
  }
}

PlacesAutoComplete = connect(state => state)(PlacesAutoComplete);

PlacesAutoComplete = reduxForm({
  form: "placesAutoComplete",
  initialValues: {
    thinCrust: true
  }
})(PlacesAutoComplete);

export default PlacesAutoComplete;
