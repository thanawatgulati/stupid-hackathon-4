import React from "react";
import Money from "./money";

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
        <button className="mt-6 bg-blue-400 text-white p-4 shadow-lg rounded-full w-3/6 ">
          เติมเงิน
        </button>
      </center>
    </>
  );
}
