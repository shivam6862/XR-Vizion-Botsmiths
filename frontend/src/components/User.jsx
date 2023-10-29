import React from "react";
import classes from "@/styles/user.module.css";
import Image from "next/image";
import logo from "../../public/logo.jpg";
import userImage from "../../public/user.png";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiContactsBook2Fill } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import Link from "next/link";

const User = ({ user }) => {
  return (
    <div className={classes["user-container"]}>
      <Link href={"/"} className={classes["logo-container"]}>
        <Image src={logo} alt="logo" />
        <h1>
          {" "}
          Bot<span>Smiths</span>
        </h1>
      </Link>
      <div className={classes["user-details"]}>
        <Image src={userImage} alt="user" />
        {user !== null ? user?.user?.name : ""}
      </div>
      <button className={classes["chats-btn"]}>
        <BsFillChatRightDotsFill /> Chats
      </button>
      <ul className={classes.list}>
        <li>
          <FaPeopleGroup /> Groups
        </li>
        <li>
          <RiContactsBook2Fill /> Contacts
        </li>
        <li>
          <AiOutlineSetting /> Settings
        </li>
      </ul>
    </div>
  );
};

export default User;
