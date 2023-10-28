import React from "react";
import classes from "@/styles/customerSupport.module.css";
import chatbotImage from "../../public/chatbot.png";
import Image from "next/image";

function CustomerSupport() {
  return (
    <div className={classes.container}>
      <div>
        <h1>Self-Serve Customer Support</h1>
        <p>
          Ever since implementing Wonderchat on our site, I've seen up to a 70%
          reduction of customer support queries in my inbox.”
        </p>
      </div>
      <div className={classes["img-container"]}>
        <Image src={chatbotImage} width={497} height={410} alt="chatbot" />
      </div>
    </div>
  );
}

export default CustomerSupport;
