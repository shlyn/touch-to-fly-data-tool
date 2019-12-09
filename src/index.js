import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Entries from "./components/Entries/Entries";
import ACS from "./components/ACS/ACS";
import Landing from "./components/Landing/Landing";
import Entry from "./components/Entry/Entry";
import Resources from "./components/Resources/Resources";
import * as serviceWorker from "./serviceWorker";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/index";

const routing = (
  <Provider store={store}>
    <Router>
      <App />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/acs" component={ACS} />
        <Route path="/entries" component={Entries} />
        <Route path="/entry" component={Entry} />
        <Route path="/resources" component={Resources} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
