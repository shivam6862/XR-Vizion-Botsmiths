import React from "react";
import classes from "@/styles/LoadingSpinner.module.css";

const LoadingSpinner = ({ minHeight, width, height, border }) => {
  return (
    <div className={classes.spinnerbody} style={{ minHeight: minHeight }}>
      <div className={classes.spinner}>
        <div
          className={classes.spinnerAfter}
          style={{
            width: width,
            height: height,
            border: `${border}px solid rgb(0, 0, 0)`,
            borderColor:
              "var(--black-color) var(--primary-color) var(--black-color) var(--primary-color)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
