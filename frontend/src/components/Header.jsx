"use client";
import React, { useState } from "react";
import classes from "@/styles/header.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Backdrop from "@/components/Backdrop";
import ConfirmLogout from "@/components/ConfirmLogout";
import { useNotification } from "@/hook/useNotification";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import logo from "../../public/logo.jpg";

const pageNavigators = [
  { title: "Features", path: "/features" },
  { title: "Chat", path: "/chat" },
  { title: "Profile", path: "/profile" },
  { title: "Contact", path: "/contact-us" },
];

const Header = () => {
  const { NotificationHandler } = useNotification();
  const { data } = useSession();
  console.log(data);
  const router = useRouter();

  const [isLogoutHandler, setIsLogOutHandler] = useState(false);

  const logOutHandler = () => {
    setIsLogOutHandler(true);
  };
  const cancelLogoutHandler = () => {
    setIsLogOutHandler(false);
  };
  const acceptLogotHandler = () => {
    signOut();
    setIsLogOutHandler(false);

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
          <Image src={logo} alt="logo" />
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
        {data !== null ? (
          <button
            onClick={() => {
              logOutHandler();
            }}
          >
            Sign Out
          </button>
        ) : (
          <>
            <Link href={"/account/login"}>Sign In</Link>
            <Link href={"/account/register"}>Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
