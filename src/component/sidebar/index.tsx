import { useState } from "react";
import {
  StyledFlex,
  StyledPadddingFlex,
  StyledText,
  StyledTextLink,
} from "./index.styled";
import { Avatar, Box, Flex, Switch, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { SidebarItems } from "@/constants/sidebar.contant";
import "./sidebar.css";
import { usePathname } from "next/navigation";

export type SidebarProps = {
  handleChangeTheme: (e: boolean) => void;
};
const Sidebar = ({ handleChangeTheme }: SidebarProps) => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeMode = (e: boolean) => {
    handleChangeTheme(e);
    setIsDarkMode(e);
  };

  return (
    <Flex
      className="sidebar"
      display={{ initial: "none", sm: "flex", md: "flex" }}
    >
      <StyledFlex>
        <Link href="/dashboard">
          <Image
            src={`${isDarkMode ? "/light-logo.png" : "/dark-logo.png"}`}
            width={150}
            height={28}
            alt="check-email.png"
          />
        </Link>
      </StyledFlex>

      <ul>
        {SidebarItems.map((item, index) => (
          <li
            key={index}
            className={`nav-item ${
              pathname.startsWith(item.path)
                ? isDarkMode
                  ? "active"
                  : "active-dark"
                : ""
            }`}
            style={{
              color: isDarkMode ? "#F0FDEC74" : "#040E0082",
            }}
          >
            <Text color="gray">{item.icon}</Text>
            <Text size="2">
              <Link href={item.path}>{item.name}</Link>
            </Text>
          </li>
        ))}
      </ul>

      <Flex direction="column" gap="2">
        <StyledText size="1">Today&apos;s Events</StyledText>
        <StyledPadddingFlex direction="column" gap="2">
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              radius="small"
              fallback="T"
            />
            <Box>
              <Text as="div" size="1">
                Tourist
              </Text>
              <Text
                as="div"
                size="1"
                weight="bold"
                style={{ color: isDarkMode ? "#FFFFFF" : "#1D211C" }}
              >
                The Viper Room
              </Text>
            </Box>
          </Flex>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              radius="small"
              fallback="T"
            />
            <Box>
              <Text as="div" size="1">
                Tourist
              </Text>
              <Text
                as="div"
                size="1"
                weight="bold"
                style={{ color: isDarkMode ? "#FFFFFF" : "#1D211C" }}
              >
                The Viper Room
              </Text>
            </Box>
          </Flex>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              radius="small"
              fallback="T"
            />
            <Box>
              <Text as="div" size="1">
                Tourist
              </Text>
              <Text
                as="div"
                size="1"
                weight="bold"
                style={{ color: isDarkMode ? "#FFFFFF" : "#1D211C" }}
              >
                The Viper Room
              </Text>
            </Box>
          </Flex>
        </StyledPadddingFlex>
      </Flex>
      <Flex direction="column" gap="2">
        <Flex gap="3" align="center">
          <Switch onCheckedChange={handleThemeMode} size="1" color="green" />
          <Text size="1">Dark Mode</Text>
        </Flex>
        <StyledTextLink size="1">
          <Link href="#">Terms of Use</Link>
        </StyledTextLink>
        <StyledTextLink size="1">
          <Link href="#">Privacy Policy</Link>
        </StyledTextLink>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
