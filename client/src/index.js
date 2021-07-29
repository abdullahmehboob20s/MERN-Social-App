import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import AllReducers from "./redux/reducers/AllReducers";

let store = createStore(AllReducers, applyMiddleware(Thunk));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
