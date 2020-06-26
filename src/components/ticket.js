import React, { Component } from "react";
import firebase from "firebase";

var dataTickets = [];

export default class Ticket extends Component {
  componentDidMount = () => {
    this.render();
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
              doc.data().ticket.map((r) => {
                dataTickets.push(r);
              });
            }
          });
        }
      });
    });
  };
  render() {
    return dataTickets === []
      ? "No Result."
      : dataTickets.map((r) => (
          <div className="grid grid-flow-col bg-blue-400 rounded-lg text-white mt-4">
            <div>
              <p className="text-2xl pt-6 px-3 mb-0">สาย</p>
              <p className="text-5xl px-3 mt-auto">{r.busNum}</p>
            </div>
            <div>
              <p className="text-4xl pt-1 px-3 mb-0 text-right">{}</p>
              <p className="text-lg px-3 mb-0 text-right">หมายเลขบัตร : {}</p>
              <p className="text-lg px-3 mb-0 text-right">เวลา : {}</p>
            </div>
          </div>
        ));
  }
}
