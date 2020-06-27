import React, { Component } from "react";
import firebase from "firebase/app";
require("firebase/firestore");
require("firebase/auth");

export default class Ticket extends Component {
  state = { dataTickets: [] };
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
            if (doc.data().ticket) {
              doc
                .data()
                .ticket.map((r) =>
                  this.setState({ dataTickets: [...this.state.dataTickets, r] })
                );
            }
          });
          console.log(this.state.dataTickets);
        }
      });
    });
  };
  render() {
    return this.state.dataTickets === []
      ? "No Result."
      : this.state.dataTickets.map((r, index) => (
          <div
            key={index}
            className="grid grid-flow-col bg-blue-400 rounded-lg text-white mt-4"
          >
            <div>
              {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
              <p className="text-2xl pt-6 px-3 mb-0">🚌 สาย</p>
              <p className="text-5xl px-3 mt-auto">{r.busNum}</p>
            </div>
            <div>
              <p className="text-4xl pt-1 px-3 mb-0 text-right">{r.Date}</p>
              <p className="text-lg px-3 mb-0 text-right">
                หมายเลขบัตร : {r.ticketNo}
              </p>
              <p className="text-lg px-3 mb-0 text-right">เวลา : {r.time}</p>
            </div>
          </div>
        ));
  }
}
