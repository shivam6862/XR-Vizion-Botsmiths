"use client";
import React from "react";
import classes from "@/styles/header.module.css";
import Link from "next/link";
import { useNotification } from "@/hook/useNotification";

const pageNavigators = [
  { title: "Features", path: "/features" },
  { title: "Pricing", path: "/pricing" },
  { title: "Contact", path: "/contact-us" },
  { title: "Affiliates", path: "/affiliates" },
];

const Header = () => {
  const { NotificationHandler } = useNotification();
  return (
    <header className={classes.header}>
      <div className={classes["logo-container"]}>
        <h1>Logo</h1>
      </div>
      <nav className={classes["page-links-container"]}>
        <ul>
          {pageNavigators.map((nav) => (
            <li>
              <Link href={`/${nav.path}`}>{nav.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className={classes["auth-links"]}>
        <Link href={"/sign-in"}>Sign In</Link>
        <Link href={"/sign-up"}>Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
