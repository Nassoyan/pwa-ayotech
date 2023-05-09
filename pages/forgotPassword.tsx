import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  asyncLoginThunk,
} from "@/redux/slices/authentication/loginSlice";
import ShowPassword from "@/public/svg/ShowPassword";
import {
  messageSelector,
  registarationFulfiled,
} from "@/redux/slices/authentication/registerSlice";
import { asyncForgotThunk } from "@/redux/slices/authentication/forgotSlice";

function Login() {
  const [email, setEmail] = useState("");

  const dispatch = useAppDispatch()

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(asyncForgotThunk({
      email:email
    }))
  }

  return (
    <div className="login_wrapper">
      <Link href="/" className="login_back">
        Back
      </Link>
      <div className="login_container">
        <div className="wilmax_login_container">
          <p style={{width:"250px"}}>
            Լրացրեք դաշտում ձեր էլ փոստը և ստացեք հղում գաղտնաբառը վերականգնելու
            համար:
          </p>
          <div className="input_area">
            <form onSubmit={handleSubmit} className="login_form">
              <div className="login_input_div">
                <input
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  onChange={handleEmailChange}
                  placeholder="email"
                />
              </div>
              <button>Ուղարկել</button>
              <p
                style={{
                  textAlign: "center",
                  color: "blue",
                  fontSize: "18px",
                  marginTop: "10px",
                  width: "250px",
                }}
              ></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
