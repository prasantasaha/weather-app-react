import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import state from "./state/index";

import WeatherDashboard from './containers/WeatherDashboard';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(state);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <WeatherDashboard />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
