import React from "react";
import classes from "@/styles/account/AccountImage.module.css";
import Image from "next/image";

const AccountImage = () => {
  return (
    <div className={classes.left_container}>
      <div className={classes.image}>
        <div className={classes.left_container_bg1}></div>
        <div className={classes.left_container_bg2}></div>
        <div className={classes.left_container_bg3}></div>
        <Image src={"/account.webp"} width={500} height={700} alt="account" />
      </div>
    </div>
  );
};

export default AccountImage;
