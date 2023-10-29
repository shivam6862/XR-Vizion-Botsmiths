"use client";
import React, { useState } from "react";
import classes from "@/styles/account/register.module.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import AccountImage from "@/components/notification/AccountImage";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });
  const [isTextPassword, setIsTextPassword] = useState(true);
  const { name, email, password, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setValues((prev) => ({ ...prev, error: "All fields are necessary" }));
      return;
    }

    try {
      const resUserExists = await fetch(
        "http://localhost:3000/api/userExists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const { user } = await resUserExists.json();
      console.log(user);

      if (user) {
        setValues((prev) => ({ ...prev, error: "User already exists." }));
        return;
      }

      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        router.push("/account/login");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };
  console.log(error);
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
              <h1>Create Your Free Account</h1>
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
              <div className={classes.button} onClick={handleSubmit}>
                Create Accounts
              </div>
              <div className={classes.privacy_policy}>
                By creating an account, I accept the Terms & Conditions &
                Privacy Policy
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
