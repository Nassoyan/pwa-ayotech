import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { useRouter } from "next/router";
import Link from "next/link";

import ShowPassword from "@/public/svg/ShowPassword";
import {
  asyncResetPasswordThunk,
  forgotMessageSelector,
} from "@/redux/slices/authentication/resetPasswordSlice";

function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const forgotMessage = useAppSelector(forgotMessageSelector);

  const queryToken = router.query.token;

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setConfirmPassword(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router?.query?.token &&
      dispatch(
        asyncResetPasswordThunk({
          password: password,
          token: queryToken,
          password_confirmation: confirmPassword,
        })
      );
  }

  return (
    <div className="login_wrapper">
      <Link href="/" className="login_back">
        Back
      </Link>
      <div className="login_container">
        <div className="wilmax_login_container">
          <div className="login_header">
            <div className="each_login_button" style={{ width: "unset" }}>
              Նոր գաղտնաբառ
              <span></span>
            </div>
          </div>
          <div className="input_area">
            <form onSubmit={handleSubmit} className="login_form">
              <div className="login_input_div">
                <input
                  required
                  type={!showConfirmPassword ? "password" : "text"}
                  onChange={handlePasswordChange}
                  placeholder="Նոր գաղտնաբառ"
                  value={password}
                />
                <span
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                >
                  <ShowPassword />
                </span>
              </div>
              <div className="login_input_div">
                <input
                  required
                  onChange={handleConfirmPasswordChange}
                  type={!showPassword ? "password" : "text"}
                  placeholder="Կրկնել նոր գաղտնաբառը"
                  value={confirmPassword}
                />
                <span
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  <ShowPassword />
                </span>
                <p style={{ color: "green" }}>
                  {forgotMessage && forgotMessage}
                </p>
              </div>
              <button>Փոխել գաղտնաբառը</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
