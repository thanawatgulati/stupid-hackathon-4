import React, { Component } from "react";
import Money from "./money";
import firebase from "firebase";
import QrReader from "react-qr-reader";

export default class Topup extends Component {
  state = {
    result: null,
    email: "",
    name: "",
    button: false,
    change: false,
    showScan: true,
  };
  Checkout = () => {
    // eslint-disable-next-line
    var dataTickets = [];
    const db = firebase.firestore();
    const usersRef = db.collection("users").doc(this.state.email);
    usersRef.get().then((docSnapshot) => {
      if (this.state.result !== null) {
        var topupticket = this.state.result;
        var res = topupticket.split("-");
        if (docSnapshot.exists) {
          usersRef.onSnapshot((doc) => {
            if (!this.state.change && res[0] === "topup") {
              usersRef.set(
                {
                  amount: doc.data().amount + parseInt(res[1]),
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

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
        button: true,
        showScan: false,
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };

  render() {
    return (
      <>
        <Money />

        <p className="text-center mt-5 text-2xl">เติมเงินเข้ากระเป๋า</p>
        <center>
          {this.state.showScan && (
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: "100%" }}
            />
          )}
          <div>
            {!this.state.button ? (
              <button className="bg-gray-500 text-white p-4 shadow-lg rounded-full w-3/6 disabled mt-10">
                เติมเงิน
              </button>
            ) : (
              <button
                className="bg-blue-400 text-white p-4 shadow-lg rounded-full w-3/6 mt-10"
                onClick={this.Checkout}
              >
                เติมเงิน
              </button>
            )}
          </div>
        </center>
      </>
    );
  }
}
