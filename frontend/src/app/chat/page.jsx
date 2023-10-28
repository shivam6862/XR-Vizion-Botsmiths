"use client";
import Head from "next/head";
import User from "@/components/User";
import Chats from "@/components/Chats";
import Chat from "@/components/Chat";
import classes from "@/styles/chat.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

export default function Page() {
  const [showChats, setShowChats] = useState(false);
  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <title>Chat</title>
      </Head>

      <main className={classes.main}>
        <header className={classes.header}>
          <RxHamburgerMenu
            color="#fff"
            size={30}
            onClick={() => {
              setShowChats(true);
            }}
          />
        </header>
        <User />
        <div
          className={`${classes["chats-heading-container"]} ${
            showChats === true ? classes.active : ""
          }`}
        >
          {" "}
          <Chats setShowChats={setShowChats} />
        </div>

        <Chat />
      </main>
    </div>
  );
}
