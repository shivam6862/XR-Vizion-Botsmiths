import React from "react";
import classes from "@/styles/header.module.css";
import Link from "next/link";

const Header = () => {
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
      </div>
    </div>
  );
};

export default Header;
