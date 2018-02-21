import React from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";

import debounce from "lodash/debounce";
import { AutoComplete as MUIAutoComplete } from "material-ui";
import { AutoComplete } from "redux-form-material-ui";

import { placesAutoComplete } from "../state/LocationData";

export class PlacesAutoComplete extends React.Component {
  handleUpdateInput = value => {
    this.props.dispatch(placesAutoComplete(value));
  };

  debouncePlacesAutoComplete = value =>
    debounce(value => {
      this.handleUpdateInput(value);
    }, 250);

  render() {
    return (
      <div className="location-search">
        {/* <AutoComplete //
              hintText="Show me the weather in ... city, zip, place"
              dataSource={this.props.LocationData.get("places").toArray()}
              onUpdateInput={this.handleUpdateInput}
              fullWidth={true}
              openOnFocus={true}
            /> */}
        <Field
          name="referral"
          component={AutoComplete}
          floatingLabelText="How did you find us?"
          openOnFocus
          filter={MUIAutoComplete.fuzzyFilter}
          dataSourceConfig={{ text: "name", value: "id" }}
          dataSource={this.props.LocationData.get("places").toArray()}
        />
      </div>
    );
  }
}

PlacesAutoComplete = connect(state => state)(PlacesAutoComplete);

PlacesAutoComplete = reduxForm({
  form: "placesAutoComplete",
  initialValues: {}
})(PlacesAutoComplete);

export default PlacesAutoComplete;
