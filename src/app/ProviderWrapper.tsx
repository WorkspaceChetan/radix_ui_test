"use client";

import { useState } from "react";
import { Flex, Theme } from "@radix-ui/themes";
import Sidebar from "@/component/sidebar";
import { Navbar } from "@/component/navbar";
import styles from "./page.module.css";
import "@radix-ui/themes/styles.css";
import { Toaster } from "react-hot-toast";

const ProviderWrapper = ({ children }: { children: JSX.Element }) => {
  const [isDark, setisDark] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChangeTheme = (isDarkMode: boolean) => {
    if (isDarkMode) {
      setisDark(isDarkMode);
    } else {
      setisDark(isDarkMode);
    }
  };
  const handleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Theme appearance={isDark ? "dark" : "light"}>
      <main className={styles.main}>
        <Toaster position="top-right" reverseOrder={false} />
        <Sidebar handleChangeTheme={handleChangeTheme} isOpen={open} />
        <Flex
          direction="column"
          width="100%"
          gap="8"
          style={{ padding: "24px 20px 0px 20px" }}
          ml={{ sm: "250px" }}
          mb="8"
          onClick={() => (open ? setOpen(false) : "")}
        >
          <Navbar handleSidebar={handleSidebar} />
          {children}
        </Flex>
      </main>
    </Theme>
  );
};

export default ProviderWrapper;
