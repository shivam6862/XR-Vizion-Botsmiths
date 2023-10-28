"use client";
import React, { useState } from "react";
import classes from "@/styles/account/reset.module.css";
import AccountImage from "@/components/notification/AccountImage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Reset = () => {
  const [values, setValues] = useState({ email: "", error: "" });

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
              <h1>Reset your password</h1>
              <p>
                To reset your password, enter your email below and submit. An
                email will be sent to you with instructions about how to
                complete the process.
              </p>
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
            </div>
            <div className={classes.right_last}>
              <div className={classes.button}>Reset password</div>
            </div>
          </div>
        </div>
      </div>{" "}
      <Footer />
    </>
  );
};

export default Reset;
