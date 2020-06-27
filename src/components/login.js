import React from "react";
import "../assets/login.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import { Redirect } from "react-router-dom";
require("firebase/auth");

const isLoggedIn = () => {
  return localStorage.getItem("firebaseui::rememberedAccounts") !== null;
};

export default function Login({ uiConfig }) {
  return isLoggedIn() !== false ? (
    <Redirect to="/main" />
  ) : (
    <div className="body-login">
      <div className="text-center text-white mt-40">
        <p className="text-6xl">MEYPAY</p>
        <p>ให้การขึ้นรถเมล์ของคุณเป็นเรื่องยาก</p>
        <StyledFirebaseAuth
          className="mt-20"
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
}
