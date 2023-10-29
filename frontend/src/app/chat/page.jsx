"use client";
import Head from "next/head";
import User from "@/components/User";
import Chats from "@/components/Chats";
import Chat from "@/components/Chat";
import classes from "@/styles/chat.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useRouterPush } from "@/hook/useRouterPush";
import { useSearchParams } from "next/navigation";
import { useFetchUserChatById } from "@/hook/useFetchUserChatById";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Page() {
  const [showChats, setShowChats] = useState(false);
  const { routerPushChange } = useRouterPush();
  const searchParams = useSearchParams();
  const { data } = useSession();
  console.log(data);

  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const currentURL = current.toString().substring(9);

  const [conversationId, setConversationId] = useState(
    currentURL == "" ? "new" + v4() : currentURL
  );

  const [initialRender, setInitialRender] = useState(true);

  const onSelect = (event) => {
    routerPushChange(event);
  };

  // const chatDefault = [
  //   { text: "This is test Question", isUser: "true", isimage: "false" },
  //   {
  //     text: "This is test Answer",
  //     timeTaken: "120",
  //     queryCost: "0.5",
  //     isUser: "false",
  //     isimage: "false",
  //   },
  // ];
  const {
    isLoading,
    data: chat,
    setData: setChat,
    messageHistory,
    setMessageHistory,
  } = useFetchUserChatById(conversationId, []);

  useEffect(() => {
    setInitialRender(true);
    onSelect(conversationId);
  }, [conversationId]);

  if (isLoading)
    return (
      <div className={classes.loadingSpinner}>
        <LoadingSpinner
          minHeight={"100vh"}
          width={"64px"}
          height={"64px"}
          border={"6"}
        />
      </div>
    );

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
        <User user={data} />
        <div
          className={`${classes["chats-heading-container"]} ${
            showChats === true ? classes.active : ""
          }`}
        >
          {" "}
          <Chats
            setShowChats={setShowChats}
            setConversationId={setConversationId}
            conversationId={conversationId}
            setInitialRender={setInitialRender}
            setChat={setChat}
            setMessageHistory={setMessageHistory}
          />
        </div>

        <Chat
          id={conversationId}
          chat={chat}
          setChat={setChat}
          initialRender={initialRender}
          setInitialRender={setInitialRender}
          setConversationId={setConversationId}
          messageHistory={messageHistory}
          setMessageHistory={setMessageHistory}
        />
      </main>
    </div>
  );
}
