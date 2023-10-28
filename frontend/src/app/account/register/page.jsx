"use client";
import React, { useState } from "react";
import classes from "@/styles/account/register.module.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import AccountImage from "@/components/notification/AccountImage";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });
  const [isTextPassword, setIsTextPassword] = useState(true);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.left}>
          <AccountImage />
        </div>
        <div className={classes.right}>
          <div className={classes.right_container}>
            <h1>Create your Free Account</h1>
            <div className={classes.input_box}>
              <p>full name</p>
              <input
                type="text"
                name="text"
                id="name"
                placeholder="Enter your full name"
                value={values.name}
                onChange={handleChange("name")}
              />
            </div>
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
            <div className={classes.button}>Create Accounts</div>
            <div className={classes.privacy_policy}>
              By creating an account, I accept the Terms & Conditions & Privacy
              Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
