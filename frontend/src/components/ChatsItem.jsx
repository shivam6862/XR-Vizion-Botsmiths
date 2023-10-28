import React from "react";
import classes from "@/styles/chats.module.css";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";

function ChatsItem(props) {
  return (
    <div className={classes["chats-item-container"]}>
      <h2>{props.title}</h2>
      <div className={classes["actions"]}>
        <AiOutlineEdit color="#fff" size={20} />
        <RiDeleteBin5Line color="#fff" size={20} />
      </div>
    </div>
  );
}

export default ChatsItem;
