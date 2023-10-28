import React from "react";
import Image from "next/image";
import classes from "@/styles/chat.module.css";
import ChatLogo from "./ChatLogo";

const ChatItem = ({ data }) => {
  var text = data.text;
  const lines = text.split(/\\n|;\(/);
  const formattedLines = lines.map((line, index) => {
    if (line.startsWith("**")) {
      line = line.replace(/\*\*/g, "");
      return (
        <React.Fragment key={index}>
          <strong>{line}</strong>
          <br />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      );
    }
  });

  return (
    <>
      {data.isUser == "true" ? (
        <>
          {data.isimage == "true" ? (
            <div className={classes.right}>
              <p>You</p>
              <Image src={data.text[1]} width={100} height={50} alt="upload" />
              <div className={classes["chat-right"]}>{data.text[0]}</div>
            </div>
          ) : (
            <div className={classes.right}>
              <p>You</p>
              <div className={classes["chat-right"]}>{formattedLines}</div>
            </div>
          )}
        </>
      ) : (
        <div className={classes.left}>
          <div className={classes.avatar}>
            <ChatLogo dimL={"22px"} dim={12} />
          </div>
          <div className={classes["chat-left"]}>{formattedLines}</div>
        </div>
      )}
    </>
  );
};

export default ChatItem;
