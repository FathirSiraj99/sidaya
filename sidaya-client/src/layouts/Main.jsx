import React from "react";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CropFreeIcon from "@mui/icons-material/CropFree";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import WarningIcon from '@mui/icons-material/Warning';
import Header from "./Header";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const boxStyle = {
  width: "100%",
};

const content = {
  marginLeft: "250px",
  padding: 15,
};

const items = [
  { icon: <DashboardIcon />, text: "Dashboard", link: "/" },
  { icon: <CropFreeIcon />, text: "Area", link: "/area" },
  { icon: <FormatListNumberedIcon />, text: "Activity", link: "/activity" },
  {
    icon: <FindInPageIcon />,
    text: "Activity Template",
    link: "/activity-template",
  },
  {
    icon: <FormatListBulletedIcon />,
    text: "Activity Detail",
    link: "/activity-detail",
  },
  {
    icon: <WarningIcon />,
    text: "Instruksi",
    link: "/problem",
  },
];

function Main() {
  return (
    <>
      <Box style={boxStyle}>
        <Sidebar items={items} />
        <Navbar />
        <div style={content}>
          <Header items={items} />
          <Outlet/>
        </div>
      </Box>
    </>
  );
}

export default Main;
