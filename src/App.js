import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Main from "./components/main";
import Pay from "./components/pay";
import Topup from "./components/topup";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/pay" component={Pay} />
        <Route exact path="/topup" component={Topup} />
      </Switch>
    </Router>
  );
}
