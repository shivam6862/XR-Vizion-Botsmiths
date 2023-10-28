"use client";
import React, { useState } from "react";
import classes from "@/styles/account/login.module.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Link from "next/link";
import AccountImage from "@/components/notification/AccountImage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "", error: "" });
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
              <h1>Log in to your account</h1>
              <div className={classes.input_box}>
                <p>email</p>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                  value={values.email}
                  onChange={handleChange("email")}
                />
              </div>
              <div className={classes.input_box}>
                <p>password</p>
                <div className={classes.password}>
                  <input
                    type={!isTextPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your Password!"
                    value={values.password}
                    onChange={handleChange("password")}
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
              <div className={classes.button}>Log In</div>
              <div className={classes.privacy_policy}>
                By creating an account, I accept the Terms & Conditions &
                Privacy Policy
              </div>
              <div className={classes.forgotPassord}>
                <Link href={"/account/reset/password"}>Forgot Password</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
