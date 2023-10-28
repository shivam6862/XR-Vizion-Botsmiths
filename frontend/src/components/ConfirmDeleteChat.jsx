import React from "react";
import classes from "@/styles/ConfirmDeleteChat.module.css";

const ConfirmDeleteChat = ({
  cancelDeleteChatHandler,
  acceptDeleteChatHandler,
  name,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.heading}>Delete chat?</div>
        <div className={classes.bottom}>
          <div className={classes.paragraph}>This will delete {name}</div>
          <div className={classes.buttons}>
            <div className={classes.cancel} onClick={cancelDeleteChatHandler}>
              Cancel
            </div>
            <div className={classes.delete} onClick={acceptDeleteChatHandler}>
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteChat;
