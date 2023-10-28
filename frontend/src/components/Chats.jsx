import React from "react";
import classes from "@/styles/chats.module.css";
import ChatsItem from "./ChatsItem";
import { AiOutlineClose } from "react-icons/ai";

const Chats = ({ setShowChats }) => {
  return (
    <div className={classes.chats}>
      <div className={classes["chats-header"]}>
        <h1>Chats</h1>
        <AiOutlineClose
          color="#fff"
          size={30}
          onClick={() => {
            setShowChats(false);
          }}
          className={classes.close}
        />
      </div>
      <div className={classes["chats-items-container"]}>
        <ChatsItem
          title={"In front of the Bar, about which I can't tell you"}
        />
        <ChatsItem
          title={"In front of the Bar, about which I can't tell you"}
        />
        <ChatsItem
          title={"In front of the Bar, about which I can't tell you"}
        />
      </div>
    </div>
  );
};

export default Chats;
