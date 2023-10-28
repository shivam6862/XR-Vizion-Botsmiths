"use client";
import React, { useState } from "react";
import classes from "@/styles/account/resetPassword.module.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import AccountImage from "@/components/notification/AccountImage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ResetPassword = () => {
  const [values, setValues] = useState({
    password: "",
    confirmpassword: "",
    error: "",
  });
  const [isTextPassword, setIsTextPassword] = useState(true);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <>
      <Header />
      <div className={classes.container}>
        <div className={classes.box}>
          <div className={classes.left}>
            <AccountImage />
          </div>
          <div className={classes.right}>
            <div className={classes.right_container}>
              <h1>Reset Your Password</h1>
              <div className={classes.input_box}>
                <p>password</p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your Password"
                  value={values.password}
                  onChange={handleChange("password")}
                />
              </div>
              <div className={classes.input_box}>
                <p>confirm Password</p>
                <div className={classes.password}>
                  <input
                    type={!isTextPassword ? "text" : "password"}
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="Enter your Confirm Password!"
                    value={values.confirmpassword}
                    onChange={handleChange("confirmpassword")}
                  />
                  <div
                    className={classes.openclosed}
                    onClick={() => {
                      setIsTextPassword((prev) => !prev);
                    }}
                  >
                    {isTextPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.right_last}>
              <div className={classes.button}>Set Password</div>
            </div>
          </div>
        </div>
      </div>{" "}
      <Footer />
    </>
  );
};

export default ResetPassword;
