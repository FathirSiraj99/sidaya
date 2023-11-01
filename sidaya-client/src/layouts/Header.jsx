import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const box = {
  marginBottom: 15,
  marginTop: 10
};

function Header({ items }) {
  const location = useLocation();

  const title =
    items.find((item) => item.link === location.pathname)?.text || "";

  return (
    <>
      <Box style={box}>
        <Typography variant="h4">{title}</Typography>
      </Box>
    </>
  );
}

export default Header;
