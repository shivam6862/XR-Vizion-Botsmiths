import React from "react";
import classes from "../styles/home.module.css";
import CustomerSupport from "@/components/CustomerSupport";
import Support from "@/components/Support";

const Page = () => {
  return (
    <div className={classes.container}>
      <div className={classes.box}>Home Page!</div>
      <CustomerSupport />
      <Support />
    </div>
  );
};

export default Page;
