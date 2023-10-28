import React from "react";
import classes from "../styles/home.module.css";
import CustomerSupport from "@/components/CustomerSupport";
import Support from "@/components/Support";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Page = () => {
  return (
    <>
      <Header />
      <div className={classes.container}>
        <div className={classes.box}>Home Page!</div>
        <CustomerSupport />
        <Support />
      </div>{" "}
      <Footer />
    </>
  );
};

export default Page;
