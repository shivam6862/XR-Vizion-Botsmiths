"use client";
import React, { useRef, useState, useEffect } from "react";
import classes from "@/styles/chat.module.css";
import ChatItem from "./ChatItem";
import { BsFillSendFill } from "react-icons/bs";
import { MdKeyboardVoice, MdOutlineAttachment } from "react-icons/md";
import usecreateConversation from "@/hook/usecreateConversation";
import { useSendUserChatById } from "@/hook/useSendUserChatById";
import { useRouterPush } from "@/hook/useRouterPush";
import { AiOutlineClose } from "react-icons/ai";
import useBot from "@/hook/useBot";

function Chat({
  id,
  chat,
  setChat,
  initialRender,
  setInitialRender,
  setConversationId,
  messageHistory,
  setMessageHistory,
}) {
  const { routerPushChange } = useRouterPush();
  const { create } = usecreateConversation();
  const { sendUserChat } = useSendUserChatById();
  const [file, setFile] = useState(null);
  useEffect(() => {
    const functioning = async () => {
      if (
        id.substr(0, 3) == "new" &&
        chat.length == 2 &&
        initialRender == false
      ) {
        var name = chat[1].text.substr(0, 25);
        if (chat[1].text.length > 25) name = name + "..";
        const newId = await create(name, chat, id.substr(3), messageHistory);
        if (newId != "false") {
          routerPushChange(newId);
          setConversationId(newId);
        }
      }
    };
    functioning();
  }, [id.substr(0, 3) == "new" && chat.length == 2]);

  useEffect(() => {
    const sendUserChatId = async () => {
      if (initialRender) {
        setInitialRender(false);
        return;
      }

      const sendUserChat_Id = async () => {
        if (chat.length <= 2) return;
        const formData = new FormData();
        formData.append("chat", chat[chat.length - 1]);
        formData.append("messageHistory", messageHistory);
        if (file) formData.append("file", file);
        if (audioUrl) formData.append("audio", audioUrl);
        const response = await sendUserChat(id, formData);
        console.log(response);
      };
      sendUserChat_Id();
    };
    sendUserChatId();
  }, [chat]);
  //

  const [audioUrl, setAudioUrl] = useState(null);
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleRecord = async () => {
    try {
      if (!navigator.mediaDevices) {
        throw new Error("Your browser does not support audio recording.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      });

      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach((track) => track.stop());
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const getMediaStream = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (error) {
        console.error(error);
      }
    };

    getMediaStream();
  }, []);

  //
  const { uploadDocument } = useBot();
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callBot = async () => {
    if (question.trim().length == 0) return;
    setIsLoading(true);
    setChat((prev) => [
      ...prev,
      { text: question, isUser: "true", isimage: "false" },
    ]);
    const response = await uploadDocument(question, messageHistory);
    setQuestion("");
    console.log(response);
    if (response?.length > 0) {
      setChat((prev) => [
        ...prev,
        {
          text: response[0].text,
          isUser: "false",
          isimage: "false",
        },
      ]);
      setMessageHistory(response[0].messageHistory);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes["chats-container"]}>
      <div>
        {chat.map((chat, i) => (
          <ChatItem key={i} data={chat} />
        ))}
      </div>
      <div className={classes["bottom"]}>
        <div className={classes["input-field-container"]}>
          <label htmlFor="attach">
            <MdOutlineAttachment size={30} color="#c9c9c9" cursor={"pointer"} />
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="attach"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <div className={classes["output-input"]}>
            <textarea
              ref={textareaRef}
              className={classes["input-field"]}
              type="text"
              placeholder="Type a message"
              rows={1}
              onInput={handleInput}
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") callBot();
              }}
            />
            <div className={classes["output-divs"]}>
              {file && (
                <div className={classes["selected-file"]}>
                  <span>{file.name}</span>
                  <AiOutlineClose
                    cursor={"pointer"}
                    onClick={() => {
                      setFile(null);
                    }}
                    className={classes["pdf-close"]}
                  />
                </div>
              )}
              {audioUrl && (
                <div className={classes["audio-container"]}>
                  <audio src={audioUrl} controls />
                  <AiOutlineClose
                    cursor={"pointer"}
                    onClick={() => {
                      setAudioUrl(null);
                    }}
                    className={classes["audio-close"]}
                  />
                </div>
              )}
            </div>
          </div>
          <MdKeyboardVoice
            size={30}
            color="#c9c9c9"
            cursor={"pointer"}
            onClick={handleRecord}
          />

          {isLoading ? (
            <div className={classes.spinner}></div>
          ) : (
            <div onClick={() => callBot()} className={classes.sending}>
              <BsFillSendFill size={30} color="#c9c9c9" cursor={"pointer"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
