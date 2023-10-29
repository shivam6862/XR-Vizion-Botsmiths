"use client";
import React, { useState } from "react";
import classes from "@/styles/chats.module.css";
import LoadingSpinner from "./LoadingSpinner";
import { v4 } from "uuid";
import { useFetchUserPrevChatLink } from "@/hook/useFetchUserPrevChatLink";
import ConfirmDeleteChat from "@/components/ConfirmDeleteChat";
import Backdrop from "@/components/Backdrop";
import { useUpdateChatName } from "@/hook/useUpdateChatName";
import { useDeleteChat } from "@/hook/useDeleteChat";
import { useRouterPush } from "@/hook/useRouterPush";
import { BsChatLeft } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { HiOutlineCheck } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const Chats = ({
  setConversationId,
  conversationId,
  setInitialRender,
  setChat,
  setShowChats,
  setMessageHistory,
}) => {
  const {
    isLoading,
    data: prevchat,
    setData: setPrevData,
  } = useFetchUserPrevChatLink([]);

  const { updateChatName } = useUpdateChatName();
  const { deletechat } = useDeleteChat();
  const { routerPushChange } = useRouterPush();

  const [isDeleteHandler, setIsDeleteHandler] = useState({
    id: null,
    name: "",
    isCheck: false,
  });

  const deleteChatHandler = (id, name) => {
    setIsDeleteHandler({
      id: id,
      name: name,
      isCheck: true,
    });
  };
  const cancelDeleteChatHandler = () => {
    setIsDeleteHandler({
      id: null,
      name: "",
      isCheck: false,
    });
  };
  const acceptDeleteChatHandler = async () => {
    const response = await deletechat(isDeleteHandler.id);
    if (response.message == "success") {
      const updatedChat = prevchat.filter(
        (chat) => chat.id !== isDeleteHandler.id
      );
      setPrevData(updatedChat);
      setChat([]);
      setMessageHistory({ title: "", chat_summary: "new chat begins" });
      const newchatID = "new" + v4();
      setConversationId(newchatID);
      routerPushChange(newchatID);
    }
    setIsDeleteHandler({
      id: null,
      name: "",
      isCheck: false,
    });
  };

  const [isEditHandler, setIsEditHandler] = useState({
    id: null,
    name: "",
    isCheck: false,
  });
  const editNameHandler = (id, name) => {
    console.log(name);
    setIsEditHandler({
      id: id,
      name: name,
      isCheck: true,
    });
  };
  const cancelEditNameHandler = () => {
    setIsEditHandler({
      id: null,
      name: "",
      isCheck: false,
    });
  };
  const acceptEditNameHandler = async () => {
    const response = await updateChatName(isEditHandler.id, isEditHandler.name);
    if (response.message == "ok") {
      const updatedChat = prevchat.map((chat) => {
        if (chat.id === isEditHandler.id) {
          return {
            ...chat,
            name: isEditHandler.name,
          };
        } else {
          return chat;
        }
      });
      setPrevData(updatedChat);
    }
    setIsEditHandler({
      id: null,
      name: "",
      isCheck: false,
    });
  };

  if (isLoading)
    return (
      <LoadingSpinner
        minHeight={"30vh"}
        width={"40px"}
        height={"40px"}
        border={"4"}
      />
    );

  return (
    <div className={classes.chats}>
      {isDeleteHandler.isCheck && (
        <Backdrop onClick={cancelDeleteChatHandler} />
      )}
      {isDeleteHandler.isCheck && (
        <ConfirmDeleteChat
          cancelDeleteChatHandler={cancelDeleteChatHandler}
          acceptDeleteChatHandler={acceptDeleteChatHandler}
          name={isDeleteHandler.name}
        />
      )}
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
      <div
        className={`${classes["chats-items-container"]}`}
        onClick={() => {
          if (conversationId.substr(0, 3) == "new") return;
          setConversationId("new" + v4());
          setInitialRender(true);
        }}
      >
        <div className={classes["chats-item-container"]}>
          <BsChatLeft size={14} />
          {"  "}New
        </div>
      </div>
      <div className={classes["chats-items-container"]}>
        {prevchat.map((item, index) => (
          <div
            key={index}
            id={item.id}
            className={`${classes["chats-item-container"]} ${
              item.id === conversationId ? classes.active : ""
            }`}
            onClick={() => {
              setConversationId(item.id);
            }}
          >
            <div id={item.id} className={classes.item}>
              <BsChatLeft size={14} />
              {item.name}
              {isEditHandler.isCheck && item.id == isEditHandler.id && (
                <>
                  <div
                    className={` ${isEditHandler ? classes.changeName : ""}`}
                  >
                    <input
                      type="text"
                      onChange={(e) => {
                        setIsEditHandler((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                      }}
                      value={isEditHandler.name}
                    />
                    <div className={classes.changeNameButtons}>
                      <HiOutlineCheck
                        onClick={acceptEditNameHandler}
                        size={16}
                      />
                      <AiOutlineClose
                        onClick={cancelEditNameHandler}
                        size={12}
                      />
                    </div>
                  </div>
                  <div
                    className={classes.backdropEditName}
                    onClick={cancelEditNameHandler}
                  ></div>
                </>
              )}
            </div>
            {item.id == conversationId && (
              <div id={item.id} className={classes["actions"]}>
                <BiSolidEditAlt
                  onClick={() => {
                    editNameHandler(item.id, item.name);
                  }}
                />
                <MdDelete
                  onClick={() => {
                    deleteChatHandler(item.id, item.name);
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chats;
