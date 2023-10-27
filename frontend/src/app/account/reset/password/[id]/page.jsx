"use client";
import React from "react";
import { useParams } from "next/navigation";
import classes from "@/styles/account/resetPassword.module.css";

const ResetPassword = () => {
  const router = useParams();
  const { id } = router;

  return (
    <div className={classes.container}>
      <div className={classes.box}>{id}</div>
    </div>
  );
};

export default ResetPassword;
