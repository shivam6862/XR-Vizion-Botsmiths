"use client";
import React, { useState } from "react";
import classes from "@/styles/header.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Backdrop from "@/components/Backdrop";
import { useCookies } from "@/hook/useCookies";
import ConfirmLogout from "@/components/ConfirmLogout";
import { useNotification } from "@/hook/useNotification";
import { useLocalStorage } from "@/hook/useLocalStorage";

const pageNavigators = [
  { title: "Features", path: "/features" },
  { title: "Chat", path: "/chat" },
  { title: "Pricing", path: "/pricing" },
  { title: "Contact", path: "/contact-us" },
];

const Header = () => {
  const { NotificationHandler } = useNotification();
  const router = useRouter();
  const { removePersonalDetails } = useLocalStorage();
  const { removeIsLoggedInCookies } = useCookies();
  const [isLogoutHandler, setIsLogOutHandler] = useState(false);

  const logOutHandler = () => {
    setIsLogOutHandler(true);
  };
  const cancelLogoutHandler = () => {
    setIsLogOutHandler(false);
  };
  const acceptLogotHandler = () => {
    setIsLogOutHandler(false);
    removePersonalDetails();
    removeIsLoggedInCookies();
    router.push(`/`);
  };

  return (
    <header className={classes.header}>
      {isLogoutHandler && <Backdrop onClick={cancelLogoutHandler} />}
      {isLogoutHandler && (
        <ConfirmLogout
          cancelLogoutHandler={cancelLogoutHandler}
          acceptLogotHandler={acceptLogotHandler}
        />
      )}
      <Link href={"/"}>
        <div className={classes["logo-container"]}>
          <h1
            onClick={() => {
              NotificationHandler(
                "Botsmiths",
                "Thank for joining us, XR-Vizion Botsmiths!",
                "Info"
              );
            }}
          >
            Botsmiths
          </h1>
        </div>
      </Link>
      <nav className={classes["page-links-container"]}>
        <ul>
          {pageNavigators.map((nav, i) => (
            <li key={i}>
              <Link href={`${nav.path}`}>{nav.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className={classes["auth-links"]}>
        <Link href={"/account/login"}>Sign In</Link>
        <Link href={"/account/register"}>Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
