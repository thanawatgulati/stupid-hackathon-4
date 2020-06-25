import React from "react";

export default function Ticket() {
  return (
    <div className="grid grid-flow-col bg-blue-400 rounded-lg text-white mt-4">
      <div>
        <p className="text-2xl pt-6 px-3 mb-0">สาย</p>
        <p className="text-5xl px-3 mt-auto">203</p>
      </div>
      <div>
        <p className="text-4xl pt-1 px-3 mb-0 text-right">25/06/63</p>
        <p className="text-lg px-3 mb-0 text-right">หมายเลขบัตร : 00001</p>
        <p className="text-lg px-3 mb-0 text-right">เวลา : 00.01 น.</p>
      </div>
    </div>
  );
}
