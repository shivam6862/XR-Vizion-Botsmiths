"use client";
import Image from "next/image";
import Link from "next/link";
import classes from "@/styles/FourOhFour.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FourOhFour = () => {
  return (
    <>
      <Header />
      <div className={classes.container}>
        <Link href="/">Go Back Home</Link>
        <div className={classes.image}>
          <Image src={"/error.jpg"} width={1000} height={750} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FourOhFour;
