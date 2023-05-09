import React, { useEffect, useState } from "react";
import {
  asyncRegisterThunk,
  messageSelector,
  registarationFulfiled,
} from "@/redux/slices/authentication/registerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import ShowPassword from "@/public/svg/ShowPassword";
import Link from "next/link";

function RegisterField({ setRegister, register }: any) {
  
  const [person, setPerson] = useState({
    name: "",
    surName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const payloadMessage = useAppSelector(messageSelector);
  // const regIsFulfileddd = useAppSelector(registarationFulfiled);

  

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(
      asyncRegisterThunk({
        first_name: person.name,
        last_name: person.surName,
        email: person.email,
        phone_number: person.phoneNumber,
        password: person.password,
      })
    ).then((res)=>
    !res.payload.errors && setRegister(false)
    )
  }

  function handleChange(e: any) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="register_wrapper">
      <Link href="/" className="login_back">
        Back
      </Link>
      <div className="register_container">
        <div className="login_header">
          <div
            onClick={() => {
              setRegister(false);
            }}
            className="each_login_button"
          >
            Log in
            <span></span>
          </div>
          <div className="each_login_button">
            Register
            <span></span>
          </div>
        </div>
        <div className="input_area">
          <form
            onSubmit={(e)=>handleSubmit(e)}
            autoComplete="off"
            className="login_form"
          >
            <div className="register_name_surname_container">
              <div className="reg_name">
                <input
                  required
                  name="name"
                  value={person.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Name"
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {payloadMessage?.errors?.first_name &&
                    payloadMessage?.errors?.first_name}
                </p>
              </div>
              <div className="reg_name">
                <input
                  required
                  name="surName"
                  value={person.surName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Surname"
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {payloadMessage?.errors?.last_name &&
                    payloadMessage?.errors?.last_name}
                </p>
              </div>
            </div>
            <div className="login_input_div">
              <input
                required
                name="email"
                value={person.email}
                onChange={handleChange}
                type="email"
                placeholder="email"
              />
              <p style={{ color: "red", fontSize: "12px" }}>
                {payloadMessage?.errors?.email && payloadMessage?.errors?.email}
              </p>
            </div>
            <div className="login_input_div">
              <input
                required
                name="phoneNumber"
                value={person.phoneNumber}
                onChange={handleChange}
                type="number"
                placeholder="phone_number"
              />
              <p style={{ color: "red", fontSize: "12px" }}>
                {payloadMessage?.errors?.phone_number &&
                  payloadMessage?.errors?.phone_number}
              </p>
            </div>
            <div className="login_input_div">
              <input
                required
                name="password"
                value={person.password}
                onChange={handleChange}
                type={!showConfirmPassword ? "password" : "text"}
                placeholder="password"
              />
              <p style={{ color: "red", fontSize: "12px" }}>
                {payloadMessage?.errors?.password &&
                  payloadMessage?.errors?.password}
              </p>
              <span
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              >
                <ShowPassword />
              </span>
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterField;
