import React from "react";
import classes from "@/styles/user.module.css";
import Image from "next/image";
import logo from "../../public/logo.jpg";
import userImage from "../../public/user.png";
import chatIcon from "../../public/chat-icon.svg";
import groupIcon from "../../public/groups.svg";
import contactsIcon from "../../public/contacts.svg";
import settingsIcon from "../../public/settings.svg";

const User = () => {
  return (
    <div className={classes["user-container"]}>
      <div className={classes["logo-container"]}>
        <Image src={logo} alt="logo" />
        <h1>
          {" "}
          Bot<span>Smiths</span>
        </h1>
      </div>
      <div className={classes["user-details"]}>
        <Image src={userImage} alt="user" />
        Aruul lin
      </div>
      <button className={classes["chats-btn"]}>
        <Image src={chatIcon} alt="chat" /> Chats
      </button>
      <ul className={classes.list}>
        <li>
          <Image src={groupIcon} alt="group" /> Groups
        </li>
        <li>
          <Image src={contactsIcon} alt="contacts" /> Contacts
        </li>
        <li>
          <Image src={settingsIcon} alt="settings" /> Settings
        </li>
      </ul>
    </div>
  );
};

export default User;
