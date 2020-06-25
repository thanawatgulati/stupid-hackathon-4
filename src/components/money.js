import React from "react";

export default function Money() {
  return (
    <div>
      <p className="text-right text-xl px-2 mt-4">คุณ สมชาย จันอังคาร</p>
      <div className="bg-blue-400 p-6 px-16 mt-4">
        <p className="text-white text-left text-2xl">เงินในกระเป๋าคุณมี</p>
        <p className="text-white text-left lg:text-5xl text-3xl ml-10">
          5555.555 บาท
        </p>
      </div>
    </div>
  );
}
