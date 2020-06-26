import React from "react";
import Ticket from "./ticket";
import { Link } from "react-router-dom";
import Money from "./money";

export default function Main(props) {
  return (
    <div>
      <Money {...props} />
      <div className="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4 w-5/6 mx-auto mb-10">
        <Link
          to="/pay"
          className="mt-10 text-white bg-blue-500 p-4 rounded-full shadow-lg hover:bg-blue-700 hover:text-white text-center"
        >
          <button>จ่ายเงิน</button>
        </Link>
        <Link
          to="/topup"
          className="mt-10 text-white bg-gray-500 p-4 rounded-full shadow-lg hover:bg-white hover:text-black text-center"
        >
          <button>เติมเงิน</button>
        </Link>
      </div>

      <div className="container mx-auto w-5/6">
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
      </div>
    </div>
  );
}
