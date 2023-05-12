import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  asyncLoginThunk,
  statusSelector,
} from "@/redux/slices/authentication/loginSlice";
import ShowPassword from "@/public/svg/ShowPassword";
import RegisterField from "./Register";
import { messageSelector } from "@/redux/slices/authentication/registerSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [respMessage, setRespMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [register, setRegister] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const payloadMessage = useAppSelector(messageSelector);
  const status = useAppSelector(statusSelector);
  const router = useRouter();

  // const handleOpen = useCallback(() => {
  //   setRegister(true);
  // }, [register]);

  // // useEffect(() => {
  // //   loginStatus && router.push("/")
  // // }, loginStatus)

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(
      asyncLoginThunk({
        email: email,
        password: password,
        guest_cart_token: localStorage.getItem("cart_token"),
      })
    ).then((res: any) => {
      setRespMessage(res?.payload?.result?.message);
      !res.error && router.push("/");
    });
  }

  return (
    <>
      {!register ? (
        <div className="login_wrapper">
          <Link href="/" className="login_back">
            Back
          </Link>
          <div className="login_container">
            <div className="wilmax_login_container">
              <div className="login_header">
                <div
                  className="each_login_button"
                  onClick={() => setRegister(false)}
                >
                  Log in
                  <span></span>
                </div>
                <div
                  onClick={() => setRegister(true)}
                  className="each_login_button"
                >
                  Register
                  <span></span>
                </div>
              </div>
              <div className="input_area">
                <form onSubmit={handleSubmit} className="login_form">
                  <div className="login_input_div">
                    <input
                      required
                      type="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      onChange={handleEmailChange}
                      placeholder="email"
                    />
                  </div>
                  <div className="login_input_div">
                    <input
                      required
                      onChange={handlePasswordChange}
                      type={!showPassword ? "password" : "text"}
                      placeholder="password"
                    />
                    <p style={{ color: "red" }}>{respMessage}</p>

                    <span
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      <ShowPassword />
                    </span>
                  </div>
                  <div className="checkbox-field">
                    <div className="checkbox-rememberpassword">
                      <input type="checkbox" />
                      Remember password
                    </div>
                    <div className="changepassword">
                      {status && "Change password"}
                    </div>
                    <Link href="/forgotPassword" className="changepassword">
                      Forgot password
                    </Link>
                  </div>
                  <button>Մուտք</button>
                  <p
                    style={{
                      textAlign: "center",
                      color: "blue",
                      fontSize: "18px",
                      marginTop: "10px",
                      width: "250px",
                    }}
                  >
                    {payloadMessage?.message ? payloadMessage?.message : ""}
                  </p>
                  <div className="social_login_container">
                    <div
                      onClick={() =>
                        (window.location.href = `https://pwaback.ayotech.am/api/login/google`)
                      }
                      className="social_box google"
                    >
                      Google
                    </div>
                    <div
                      onClick={() =>
                        (window.location.href = `https://pwaback.ayotech.am/api/login/linkedin
                        `)
                      }
                      className="social_box linkedIn"
                    >
                      Linked In
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <RegisterField setRegister={setRegister} register={register} />
      )}
    </>
  );
}

export default Login;
