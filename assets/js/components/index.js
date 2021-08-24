import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import combinedReducers from "../reducers/combiner";

export const store = createStore(combinedReducers);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
