import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Main from "./components/main";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/main" component={Main} />
        <Route path="*" component={Login} />
      </Switch>
    </Router>
  );
}
