import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// import { addLocaleData, IntlProvider } from "react-intl";
// import enLocaleData from "react-intl/locale-data/en";

// addLocaleData(enLocaleData);
// addLocaleData({
//     locale: 'en-UPPER',
//     parentLocale: 'en',
// });
// const { locale, messages } = window.App;

ReactDOM.render(
  //   <IntlProvider locale={locale} messages={messages}>
  <App />,
  //   </IntlProvider>,
  document.getElementById("root")
);
registerServiceWorker();
