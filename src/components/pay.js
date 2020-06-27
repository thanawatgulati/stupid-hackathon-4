import React, { Component } from "react";
import QrReader from "react-qr-reader";
import Money from "./money";
import firebase from "firebase";
import { Link } from "react-router-dom";

export default class Pay extends Component {
  state = {
    result: null,
    email: "",
    name: "",
    button: false,
    change: false,
    cantPay: false,
    showScan: true,
    pay: true,
  };

  Checkout = () => {
    this.setState({ pay: false });
    var dataTickets = [];
    const db = firebase.firestore();
    const usersRef = db.collection("users").doc(this.state.email);
    usersRef.get().then((docSnapshot) => {
      if (this.state.result !== null) {
        var ticket = this.state.result;
        var res = ticket.split("-");
        if (docSnapshot.exists) {
          usersRef.onSnapshot((doc) => {
            if (doc.data().amount >= parseInt(res[1])) {
              if (doc.data().ticket === undefined) {
                dataTickets.push({
                  busNum: res[0],
                  ticketNo: Math.floor(Math.random() * 9999),
                  Date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
                  time: `${new Date().getHours()} : ${new Date().getMinutes()} น.`,
                });
              } else {
                doc.data().ticket.map((r) => dataTickets.push(r));
                dataTickets.unshift({
                  busNum: res[0],
                  ticketNo: Math.floor(Math.random() * 9999),
                  Date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
                  time: `${new Date().getHours()} : ${new Date().getMinutes()} น.`,
                });
              }
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
            } else {
              this.setState({ cantPay: true });
            }
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
        showScan: false,
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
        {this.state.showScan && (
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "100%" }}
          />
        )}
        <center>
          {this.state.cantPay && (
            <p className="text-red-900 mt-6">ยอดเงินคงเหลือในระบบไม่เพียงพอ</p>
          )}
          {((this.state.button && this.state.pay) || !this.state.cantPay) && (
            <button
              className="bg-blue-400 text-white p-4 shadow-lg rounded-full w-3/6 mt-10"
              onClick={this.Checkout}
            >
              ชำระเงิน
            </button>
          )}
          {
            <div>
              {/* {!this.state.cantPay && !this.state.pay && (
                <p className="text-2xl text-center mt-10">
                  ขอบคุณที่ซื้อตั๋ว ภาษีของท่านจะถูกพวกเราใช้
                </p>
              )} */}
              {this.state.cantPay && (
                <Link to="/main">
                  <button className="bg-gray-500 text-white p-4 shadow-lg rounded-full w-3/6 mt-10">
                    กลับสู่หน้าหลัก
                  </button>
                </Link>
              )}
            </div>
          }
        </center>
      </div>
    );
  }
}
