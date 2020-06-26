import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/login";
import Main from "./components/main";
import Pay from "./components/pay";
import Topup from "./components/topup";
import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyCtUoO5drwqnPKTN8DxOhz7IWumDyOSnfE",
  authDomain: "meypay-sht4.firebaseapp.com",
});

const isLoggedIn = () => {
  return localStorage.getItem("firebaseui::rememberedAccounts") !== null;
};

// this is bad way
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default class App extends Component {
  state = { isSignIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignIn: !!user });
      console.log(user);
    });
  };
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login uiConfig={this.uiConfig} />
            </Route>
            <SecuredRoute exact path="/main" component={Main} />
            <SecuredRoute exact path="/pay" component={Pay} />
            <SecuredRoute exact path="/topup" component={Topup} />
            <Route exact path="*" component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}
