import React, { Component } from "react";
import QrReader from "react-qr-reader";
import Money from "./money";
import firebase from "firebase";

export default class Pay extends Component {
  state = {
    result: null,
    email: "",
    name: "",
    button: false,
    change: false,
    cantPay: false,
  };

  Checkout = () => {
    var dataTickets = [];
    const db = firebase.firestore();
    const usersRef = db.collection("users").doc(this.state.email);
    usersRef.get().then((docSnapshot) => {
      if (this.state.result !== null) {
        var ticket = this.state.result;
        var res = ticket.split("-");
        if (docSnapshot.exists) {
          usersRef.onSnapshot((doc) => {
            if (doc.data().ticket !== undefined) {
              doc.data().ticket.map((r) => {
                dataTickets.push(r);
              });
            }
            dataTickets.unshift({
              busNum: res[0],
              ticketNo: Math.floor(Math.random() * 9999),
              Date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
              time: `${new Date().getHours()} : ${new Date().getMinutes()} น.`,
            });
            if (!this.state.change) {
              usersRef.set(
                {
                  name: firebase.auth().currentUser.displayName,
                  email: firebase.auth().currentUser.email,
                  amount: doc.data().amount - res[1],
                  ticket: dataTickets,
                },
                { merge: true }
              ); //
              this.setState({ change: true });
            }
            this.props.history.push("/main");
          });
        }
      }
    });
  };
  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
        button: true,
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        isSignIn: !!user,
        name: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email,
      });
    });
  };

  render() {
    return (
      <div>
        <Money {...this.props} />
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        <center>
          {this.state.cantPay && (
            <p className="text-red-900 mt-6">ยอดเงินคงเหลือในระบบไม่เพียงพอ</p>
          )}
          {!this.state.button ? (
            <button className="bg-gray-500 text-white p-4 shadow-lg rounded-full w-3/6 disabled mt-10">
              ชำระเงิน
            </button>
          ) : (
            <button
              className="bg-blue-400 text-white p-4 shadow-lg rounded-full w-3/6 mt-10"
              onClick={this.Checkout}
            >
              ชำระเงิน
            </button>
          )}
        </center>
      </div>
    );
  }
}
