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
require("firebase/auth");

firebase.initializeApp({
  apiKey: "AIzaSyCtUoO5drwqnPKTN8DxOhz7IWumDyOSnfE",
  authDomain: "meypay-sht4.firebaseapp.com",
  projectId: "meypay-sht4",
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
  state = { isSignIn: false, email: "", name: "" };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        isSignIn: !!user,
        name: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.uid,
      });
      const db = firebase.firestore();
      const usersRef = db.collection("users").doc(this.state.email);

      usersRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          usersRef.onSnapshot((doc) => {
            this.setState({
              email: doc.data().email,
              name: doc.data().name,
              amount: doc.data().amount,
            });
          });
        } else {
          usersRef.set({
            email: this.state.email,
            name: this.state.name,
            amount: 0,
          }); // create the document
        }
      });
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
