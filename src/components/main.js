import React from "react";
import Ticket from "./ticket";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div>
      <p className="text-right text-xl px-2 mt-4">คุณ สมชาย จันอังคาร</p>
      <div className="bg-blue-400 p-6 px-16 mt-4">
        <p className="text-white text-left text-2xl">เงินในกระเป๋าคุณ</p>
        <p className="text-white text-left lg:text-5xl text-3xl ml-10">
          5555.555 บาท
        </p>
      </div>

      <div className="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4 w-5/6 mx-auto mb-10">
        <Link
          to="/main"
          className="mt-10 text-white bg-blue-500 p-4 rounded-full shadow-lg hover:bg-blue-700 hover:text-white text-center"
        >
          <button>จ่ายเงิน</button>
        </Link>
        <Link
          to="/main"
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
