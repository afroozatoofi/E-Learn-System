import React from "react";
import { render } from "react-dom";
import App from "./containers/App";
import { Provider } from "react-redux";
import { store } from "./store/index";
console.log("index.js");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
