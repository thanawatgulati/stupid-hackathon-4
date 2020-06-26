/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from "react";
import firebase from "firebase";

export default class Money extends Component {
  state = { amount: 0, email: "", name: "" };
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
        </p>
        <div className="bg-blue-400 p-6 px-16 mt-4">
          <p className="text-white text-center text-2xl">
            💰 : เงินในกระเป๋าคุณมี
          </p>
          <p className="text-white text-center lg:text-5xl text-3xl ml-10">
            {this.state.amount} บาท.
          </p>
        </div>
      </div>
    );
  }
}
