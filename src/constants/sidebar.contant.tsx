import {
  BackpackIcon,
  BookmarkIcon,
  CalendarIcon,
  DashboardIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";

export const SidebarItems = [
  { icon: <DashboardIcon />, name: "Dashboard", path: "/dashboard" },
  { icon: <CalendarIcon />, name: "Calander", path: "#" },
  { icon: <BookmarkIcon />, name: "Events", path: "#" },
  { icon: <BackpackIcon />, name: "Offers and deals", path: "#" },
  { icon: <MixerHorizontalIcon />, name: "Settings", path: "#" },
];
