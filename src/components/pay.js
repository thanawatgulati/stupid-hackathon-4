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
        <p className="text-right text-xl px-2 mt-4">คุณ สมชาย จันอังคาร</p>
        <Money />
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        <p className="">{this.state.result}</p>
      </div>
    );
  }
}
