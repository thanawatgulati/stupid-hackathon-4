import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Main from "./components/main";
import Pay from "./components/pay";
import Topup from "./components/topup";
import firebase from "firebase";

// const SecuredRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isLoggedIn() === true ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

firebase.initializeApp({
  apiKey: "AIzaSyCtUoO5drwqnPKTN8DxOhz7IWumDyOSnfE",
  authDomain: "meypay-sht4.firebaseapp.com",
});

export default class App extends Component {
  state = { isSignIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
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
            <Route exact path="/main" component={Main} />
            <Route exact path="/pay" component={Pay} />
            <Route exact path="/topup" component={Topup} />
            <Route exact path="*" component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}
