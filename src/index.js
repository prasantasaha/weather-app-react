import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { addLocaleData, IntlProvider } from "react-intl";
import enLocaleData from "react-intl/locale-data/en";

addLocaleData(enLocaleData);

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language = (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

ReactDOM.render(
  <IntlProvider locale={language}>
    <App />
  </IntlProvider>,
  document.getElementById("root")
);
registerServiceWorker();
