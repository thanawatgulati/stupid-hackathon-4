/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from "react";
import firebase from "firebase/app";
require("firebase/firestore");
require("firebase/auth");

export default class Money extends Component {
  state = { amount: 0, email: "", name: "" };
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
        usersRef.onSnapshot((doc) => {
          this.setState({ amount: doc.data().amount });
        });
      });
    });
  };
  render() {
    return (
      <div>
        <p className="text-right text-xl px-2 mt-4">
          👨‍💻 : {this.state.name === "" ? "Loading...." : this.state.name}
          <button
            className="text-white text-sm bg-red-800 p-2 rounded-full ml-2"
            onClick={() => {
              firebase.auth().signOut();
              localStorage.clear();
              window.location.reload();
            }}
          >
            sign out
          </button>
        </p>
        <div className="bg-blue-400 p-6 px-16 mt-4">
          <p className="text-white text-center text-2xl">
            💰 : เงินในกระเป๋าคุณ
          </p>
          <p className="text-white text-center lg:text-5xl text-3xl ml-10">
            {this.state.amount} บาท.
          </p>
        </div>
      </div>
    );
  }
}
