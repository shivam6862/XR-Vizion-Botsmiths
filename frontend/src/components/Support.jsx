import React from "react";
import styles from "@/styles/support.module.css";
import Image from "next/image";
import playIcon from "../../public/play.svg";
import Link from "next/link";

const Support = () => {
  return (
    <div className={styles.container}>
      <h1>Maximize your support capacity without extra hiring</h1>
      <p>
        Spend 5 minutes to get a ChatGPT powered chatbot that works 24/7 to help
        you engage and retain more users and boost conversions.
      </p>
      <div className={styles["links-container"]}>
        <Link href="/sign-up">Get Started For Free</Link>
        <Link href="/">
          <Image src={playIcon} alt="play icon" />
          Watch Video
        </Link>
      </div>
    </div>
  );
};

export default Support;
