import React from "react";
import "../assets/login.css";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div className="body-login">
      <div className="text-center text-white mt-40">
        <p className="text-6xl">MEYPAY</p>
        <p>ให้การขึ้นรถเมล์ของคุณเป็นเรื่องยาก</p>
        <Link to="/main">
          <button className="mt-24 text-gray-900 bg-white p-4 rounded-full shadow-lg hover:bg-blue-700 hover:text-white">
            เข้าสู่ระบบด้วย Facebook
          </button>
        </Link>
      </div>
    </div>
  );
}
