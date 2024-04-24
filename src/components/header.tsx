"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Header = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const offset = 50;
      if (scrollPosition > offset) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 duration-300 py-5 rounded-lg ${
        scroll ? "backdrop-blur-xl px-5" : ""
      }`}
    >
      <Link
        href={"/"}
        className={`text-4xl font-bold hover:text-blue-800 duration-300 ${
          scroll ? "text-black" : "text-blue-700"
        }`}
      >
        Home
      </Link>
    </header>
  );
};

export default Header;
