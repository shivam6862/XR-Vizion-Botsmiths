import React from "react";
import styles from "@/styles/setUp.module.css";
import { BiPlayCircle } from "react-icons/bi";
import Link from "next/link";

const SetUp = () => {
  return (
    <div className={styles.container}>
      <h1>5 minute set-up process</h1>
      <p>
        Spend 5 minutes to get a ChatGPT powered chatbot that works 24/7 to help
        you engage and retain more users and boost conversions.
      </p>
      <div className={styles["links-container"]}>
        <Link href="/account/register">Get Started For Free</Link>
        <Link href="/">
          <div className={styles.play}>
            <BiPlayCircle />
          </div>
          Watch Video
        </Link>
      </div>
    </div>
  );
};

export default SetUp;
