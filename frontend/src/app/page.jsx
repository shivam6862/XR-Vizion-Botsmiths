import React from "react";
import classes from "../styles/home.module.css";
import CustomerSupport from "@/components/CustomerSupport";
import SetUp from "@/components/SetUp";
import ShareFile from "@/components/ShareFile";
import Support from "@/components/Support";
import Faqs from "@/components/Faqs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Page = async () => {
  return (
    <div className={classes.container}>
      <Header />
      <CustomerSupport />
      <SetUp />
      <ShareFile />
      <Faqs />
      <Support />
      <Footer />
    </div>
  );
};

export default Page;
