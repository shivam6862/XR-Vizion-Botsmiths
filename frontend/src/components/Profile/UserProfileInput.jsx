"use client";
import classes from "@/styles/Profile/UserProfileInput.module.css";
import styles from "@/styles/Profile/Profile.module.css";
import ProfileIconUpload from "@/components/Profile/ProfileIconUpload";
import { useState } from "react";
import { useNotification } from "@/hook/useNotification";

const UserProfileInput = () => {
  const [file, setFile] = useState(null);
  const [values, setValues] = useState({
    firstName: "Shivam",
    secondName: "Kumar",
    description: "We enjoyed this hackthon!",
  });
  const { NotificationHandler } = useNotification();
  const { firstName, secondName, description } = values;
  const valueChangeHandler = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const sendProfile = async () => {
    const formData = new FormData();
    formData.append("name", firstName + " " + secondName);
    formData.append("description", description);
    formData.append("file", file);
    const response = await fetch("http://localhost:8000/upload/", {
      method: "post",
      body: formData,
    });
    const resData = await response.json();
    if (resData.error) {
      NotificationHandler(resData.error, resData.error, "ERROR");
    }
    NotificationHandler(resData.message, resData.message, "SUCCESS");
  };

  console.log(file);
  return (
    <div className={classes["three-cols"]}>
      <div className={classes["image-selector"]}>
        <ProfileIconUpload setFile={setFile} />
        <p className={classes["light-text"]}>
          We recomment an image of at least 400X400. GIFs work too.
        </p>
      </div>
      <div className={classes["input-field-container"]}>
        <h1>Personal Detail:</h1>
        <div className={styles.row}>
          <div className={styles.col}>
            {" "}
            <lable className={styles.label}>First Name:</lable>
            <input
              placeholder="First Name"
              value={firstName}
              onChange={valueChangeHandler("firstName")}
              className={styles["user-input"]}
            />
          </div>
          <div className={styles.col}>
            <lable className={styles.label}>Second Name:</lable>
            <input
              value={secondName}
              onChange={valueChangeHandler("secondName")}
              placeholder="Second Name "
              className={styles["user-input"]}
            />
          </div>
        </div>
        <div>
          <div className={styles.col}>
            <lable className={styles.label}>Description :</lable>
            <textarea
              value={description}
              onChange={valueChangeHandler("description")}
              placeholder="Description"
              className={styles["user-input"]}
            />
          </div>
        </div>
        <button
          style={{ width: "fit-content", padding: "0.5rem 1.25rem" }}
          className={styles["upload-btn"]}
          onClick={sendProfile}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserProfileInput;
