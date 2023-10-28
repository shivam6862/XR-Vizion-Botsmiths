"use client";
import React from "react";
import classes from "@/styles/header.module.css";
import Link from "next/link";
import { useNotification } from "@/hook/useNotification";

const Header = () => {
  const { NotificationHandler } = useNotification();
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Link href={"/"}>home</Link>
        <Link href={"/account/login"}>login</Link>
        <Link href={"/account/register"}>register</Link>
        <Link href={"/account/reset/password"}>password</Link>
        <Link href={"/account/reset/password/passwordChange"}>
          passwordChange
        </Link>
        <button
          onClick={() => {
            NotificationHandler(
              "XR Vizion Botsmiths",
              "Web page loaded successfully!!",
              "Success"
            );
          }}
        >
          click me
        </button>
      </div>
    </div>
  );
};

export default Header;
