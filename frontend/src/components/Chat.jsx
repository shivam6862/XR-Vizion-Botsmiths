"use client";
import React, { useRef, useState, useEffect } from "react";
import classes from "@/styles/chat.module.css";
import ChatItem from "./ChatItem";
import { BsFillSendFill } from "react-icons/bs";
import { MdKeyboardVoice, MdOutlineAttachment } from "react-icons/md";

const chat = [
  {
    id: "07aff1c8-228c-451f-a309-e7ead435d0aa",
    text: "Sorry server is busy! This is just for test. Sorry server is busy! This is just for test. Sorry server is busy! This is just for test.",
    postedById: "f58ab0b6-807e-4ee9-a9eb-5021a118f8e4",
    isimage: false,
    isUser: false,
  },
  {
    id: "07aff1c8-228c-451f-a309-e7ead435d0aa",
    text: "Sorry server is busy! This is just for test. Sorry server is busy! This is just for test. Sorry server is busy! This is just for test.",
    postedById: "f58ab0b6-807e-4ee9-a9eb-5021a118f8e4",
    isimage: false,
    isUser: true,
  },
  {
    id: "07aff1c8-228c-451f-a309-e7ead435d0aa",
    text: "Sorry server is busy! This is just for test. Sorry server is busy! This is just for test. Sorry server is busy! This is just for test.",
    postedById: "f58ab0b6-807e-4ee9-a9eb-5021a118f8e4",
    isimage: false,
    isUser: false,
  },
  {
    id: "07aff1c8-228c-451f-a309-e7ead435d0aa",
    text: "Sorry server is busy! This is just for test. Sorry server is busy! This is just for test. Sorry server is busy! This is just for test.",
    postedById: "f58ab0b6-807e-4ee9-a9eb-5021a118f8e4",
    isimage: false,
    isUser: true,
  },
  {
    id: "07aff1c8-228c-451f-a309-e7ead435d0aa",
    text: "Sorry server is busy! This is just for test. Sorry server is busy! This is just for test. Sorry server is busy! This is just for test.",
    postedById: "f58ab0b6-807e-4ee9-a9eb-5021a118f8e4",
    isimage: false,
    isUser: false,
  },
  {
    id: "07aff1c8-228c-451f-a309-e7ead435d0aa",
    text: "Sorry server is busy! This is just for test. Sorry server is busy! This is just for test. Sorry server is busy! This is just for test.",
    postedById: "f58ab0b6-807e-4ee9-a9eb-5021a118f8e4",
    isimage: false,
    isUser: true,
  },
  {
    id: "07aff1c8-228c-451f-a309-e7ead435d0aa",
    text: "Sorry server is busy! This is just for test. Sorry server is busy! This is just for test. Sorry server is busy! This is just for test.",
    postedById: "f58ab0b6-807e-4ee9-a9eb-5021a118f8e4",
    isimage: false,
    isUser: false,
  },
  {
    id: "07aff1c8-228c-451f-a309-e7ead435d0aa",
    text: "Sorry server is busy! This is just for test. Sorry server is busy! This is just for test. Sorry server is busy! This is just for test.",
    postedById: "f58ab0b6-807e-4ee9-a9eb-5021a118f8e4",
    isimage: false,
    isUser: true,
  },
  {
    id: "07aff1c8-228c-451f-a309-e7ead435d0aa",
    text: "Sorry server is busy! This is just for test. Sorry server is busy! This is just for test. Sorry server is busy! This is just for test.",
    postedById: "f58ab0b6-807e-4ee9-a9eb-5021a118f8e4",
    isimage: false,
    isUser: false,
  },
  {
    id: "07aff1c8-228c-451f-a309-e7ead435d0aa",
    text: "Sorry server is busy! This is just for test. Sorry server is busy! This is just for test. Sorry server is busy! This is just for test.",
    postedById: "f58ab0b6-807e-4ee9-a9eb-5021a118f8e4",
    isimage: false,
    isUser: true,
  },
  {
    id: "07aff1c8-228c-451f-a309-e7ead435d0aa",
    text: "Sorry server is busy! This is just for test. Sorry server is busy! This is just for test. Sorry server is busy! This is just for test.",
    postedById: "f58ab0b6-807e-4ee9-a9eb-5021a118f8e4",
    isimage: false,
    isUser: false,
  },
  {
    id: "07aff1c8-228c-451f-a309-e7ead435d0aa",
    text: "Sorry server is busy! This is just for test. Sorry server is busy! This is just for test. Sorry server is busy! This is just for test.",
    postedById: "f58ab0b6-807e-4ee9-a9eb-5021a118f8e4",
    isimage: false,
    isUser: true,
  },
];

function Chat() {
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
          <input style={{ display: "none" }} type="file" id="attach" />
          <textarea
            ref={textareaRef}
            className={classes["input-field"]}
            type="text"
            placeholder="Type a message"
            rows={1}
            onInput={handleInput}
          />
          <MdKeyboardVoice
            size={30}
            color="#c9c9c9"
            cursor={"pointer"}
            onClick={handleRecord}
          />
          {audioUrl && <audio src={audioUrl} controls />}
          <BsFillSendFill size={30} color="#c9c9c9" cursor={"pointer"} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
