"use client";
import React from "react";
import classes from "@/styles/header.module.css";
import Link from "next/link";
import { useNotification } from "@/hook/useNotification";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import logo from "../../public/logo.jpg";

const pageNavigators = [
  { title: "Features", path: "/features" },
  { title: "Pricing", path: "/pricing" },
  { title: "Contact", path: "/contact-us" },
  { title: "Affiliates", path: "/affiliates" },
];

const Header = (session) => {
  const { NotificationHandler } = useNotification();
  const { data } = useSession();
  console.log(data);
  console.log(session);
  return (
    <header className={classes.header}>
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
        {session.session !== null ? (
          <button onClick={() => signOut()}>Sign Out</button>
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
