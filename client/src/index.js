import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import App from "./App";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

const rootElement = document.querySelector("#root");

ReactDOM.render(
  <App width={rootElement.offsetWidth} height={rootElement.offsetHeight} />,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
