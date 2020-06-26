import React, { Component } from "react";
import Money from "./money";
import firebase from "firebase";

export default class Topup extends Component {
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        isSignIn: !!user,
        name: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email,
      });
      const db = firebase.firestore();
      const usersRef = db.collection("users").doc(this.state.email);

      usersRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          usersRef.onSnapshot((doc) => {
            usersRef.set({
              email: this.state.email,
              name: this.state.name,
              amount: doc.data().amount,
            }); //
          });
        }
      });
    });
  };
  render() {
    return (
      <>
        <Money />
        <p className="text-center mt-5 text-2xl">เติมเงินเข้ากระเป๋า</p>
        <center>
          <input
            className="mt-6 shadow appearance-none border border-gray-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-3/5"
            id="password"
            type="number"
            placeholder="100"
          />

          <div>
            <button
              id="credit-card"
              className="mt-6 bg-blue-400 text-white p-4 shadow-lg rounded-full w-3/6 "
              type="button"
            >
              เติมเงิน
            </button>
          </div>
        </center>
      </>
    );
  }
}
