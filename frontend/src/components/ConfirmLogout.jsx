import React from "react";
import classes from "@/styles/ConfirmLogout.module.css";

const ConfirmLogout = ({ cancelLogoutHandler, acceptLogotHandler }) => {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.heading}>Log Out !</div>
        <div className={classes.bottom}>
          <div className={classes.buttons}>
            <div className={classes.cancel} onClick={cancelLogoutHandler}>
              Cancel
            </div>
            <div className={classes.delete} onClick={acceptLogotHandler}>
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogout;
