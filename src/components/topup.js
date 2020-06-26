import React from "react";
import Money from "./money";
// import Script from "react-load-script";

// let OmiseCard;

export default function Topup() {
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

        <div className="own-form">
          {/* <Script
            url="https://cdn.omise.co/omise.js"
            onLoad={this.handleScriptLoad}
          />
          <form>
            <button
              id="credit-card"
              className="mt-6 bg-blue-400 text-white p-4 shadow-lg rounded-full w-3/6 "
              type="button"
              //disabled={cart.amount === 0}
              onClick={this.handleClick}
            >
              เติมเงิน
            </button>
          </form> */}
        </div>
      </center>
    </>
  );
}
