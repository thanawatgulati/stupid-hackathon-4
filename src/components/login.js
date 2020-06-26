import React from "react";
import "../assets/login.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

export default function Login({ uiConfig }) {
  return (
    <div className="body-login">
      <div className="text-center text-white mt-40">
        <p className="text-6xl">MEYPAY</p>
        <p>ให้การขึ้นรถเมล์ของคุณเป็นเรื่องยาก</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
}
