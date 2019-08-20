import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Entries from "./components/Entries/Entries";
import Entry from "./components/Entry/Entry";
import * as serviceWorker from "./serviceWorker";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home/Home";

const routing = (
  <Router>
    <App />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/entries" component={Entries} />
      <Route exact path="/entry" component={Entry} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
