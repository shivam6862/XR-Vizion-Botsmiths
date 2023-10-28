import React from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "@/styles/contactLogo.module.css";

const ContactLogo = ({ size, rotate, gapSize }) => {
  const URL = [
    "https://www.linkedin.com/",
    "https://www.instagram.com/",
    "https://twitter.com/",
    "https://www.facebook.com/",
  ];
  const contact_arr = ["linkedin", "instagram", "twitter", "facebook"];

  return (
    <div className={classes.container}>
      <div
        className={classes.box}
        style={rotate == 1 ? { flexDirection: "column" } : { gap: gapSize }}
      >
        {contact_arr.map((item, index) => (
          <Link href={URL[index]} target="_blank">
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ContactLogo;
