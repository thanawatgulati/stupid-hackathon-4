import React, { Component } from "react";
import QrReader from "react-qr-reader";
import Money from "./money";

export default class Pay extends Component {
  state = {
    result: "No result",
  };

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };
  render() {
    return (
      <div>
        <Money />
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        <p className="">{this.state.result}</p>
        <center>
          <button className="bg-blue-400 text-white p-4 shadow-lg rounded-full w-3/6 ">
            ชำระเงิน
          </button>
        </center>
      </div>
    );
  }
}
