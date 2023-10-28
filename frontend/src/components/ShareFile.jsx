import React from "react";
import classes from "@/styles/shareFile.module.css";
import Image from "next/image";
import { BsStars } from "react-icons/bs";

const ShareFile = () => {
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.image}>
          <Image src={"/account.png"} width={400} height={400} alt="PDF" />
        </div>
      </div>
      <div className={classes.right}>
        <h4>
          <BsStars />
          how it works
        </h4>
        <h1>Share a link or PDF file</h1>
        <p>
          By providing the link or PDF file to your knowledge base. you can
          build an AL chatbot that learn from the text on your website and
          answer all the questions about your product.
        </p>
      </div>
    </div>
  );
};

export default ShareFile;
