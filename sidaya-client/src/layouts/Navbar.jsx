import { Avatar, Box } from "@mui/material";
import React from "react";

const box = {
  marginLeft: "250px",
  width: "100% - 250px",
  height: "60px",
  backgroundColor: "#424242",
  padding: 15,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
};

function Navbar() {
  return (
    <>
      <Box style={box}>
        <Avatar alt="User Avatar" src="/path/to/avatar-image.jpg" />
      </Box>
    </>
  );
}

export default Navbar;
