import React from "react";
import classes from "../styles/home.module.css";
import CustomerSupport from "@/components/CustomerSupport";
import SetUp from "@/components/SetUp";
import ShareFile from "@/components/ShareFile";
import Support from "@/components/Support";
import Faqs from "@/components/Faqs";

const Page = () => {
  return (
    <div className={classes.container}>
      <CustomerSupport />
      <SetUp />
      <ShareFile />
      <Faqs />
      <Support />
    </div>
  );
};

export default Page;
