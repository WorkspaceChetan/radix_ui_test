"use client";
import React from "react";
import {
  BellIcon,
  ChevronLeftIcon,
  HamburgerMenuIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  TextField,
  useThemeContext,
} from "@radix-ui/themes";
import { StyledNavFlex } from "./index.style";
export type NavbarProps = {
  handleSidebar: () => void;
};
export const Navbar = ({ handleSidebar }: NavbarProps) => {
  const { appearance } = useThemeContext();
  const isDark = appearance === "dark";
  return (
    <>
      <Box
        style={{ width: "100%" }}
        display={{ initial: "none", sm: "block", md: "block" }}
      >
        <Flex align="center" gap="3" justify="between">
          <TextField.Root
            placeholder="Search ShowOps"
            style={{ height: "40px" }}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Slot>⌘S</TextField.Slot>
          </TextField.Root>
          <Flex gap="3">
            <StyledNavFlex
              align="center"
              justify="center"
              height="40px"
              width="40px"
              style={{ background: `${isDark ? "#F4F5F312" : "#e3e3e3"}` }}
            >
              <BellIcon />
            </StyledNavFlex>
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              radius="medium"
              fallback="T"
            />
          </Flex>
        </Flex>
      </Box>
      <Flex
        justify="between"
        gap="3"
        display={{ initial: "flex", sm: "none", md: "none" }}
        style={{ width: "100%" }}
      >
        <Button color="gray" variant="soft">
          <ChevronLeftIcon />
        </Button>
        <Button
          style={{ background: `${isDark ? "#70FE8C1B" : "#e9f6e9"}` }}
          variant="soft"
          onClick={handleSidebar}
        >
          <HamburgerMenuIcon color={`${isDark ? "#89FF9F" : "#006514"}`} />
        </Button>
      </Flex>
    </>
  );
};
