import * as React from "react";
import { styled } from "@mui/system";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const box = {
  width: "250px",
  bgcolor: "background.paper",
  height: "100vh",
  position: "fixed",
};

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  color: "#fff",
  "&:hover": {
    background: "#303030",
  },
  "&.active": {
    background: "#303030",
  },
  "& .MuiListItemIcon-root": {
    color: "#fff",
  },
  "& .MuiListItemText-primary": {
    fontSize: "14px",
  },
}));

function Sidebar({ items }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (link) => {
    return location.pathname === link;
  };

  return (
    <Box sx={box}>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", paddingTop: 2, marginBottom: 1 }}
      >
        S I D A Y A
      </Typography>
      <List component="nav" aria-label="main mailbox folders">
        {items.map(
          (item, index) =>
            !item.hidden && (
              <ListItemStyled
                key={index}
                className={isActive(item.link) ? "active" : ""}
                onClick={() => navigate(item.link)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemStyled>
            )
        )}
      </List>
    </Box>
  );
}

export default Sidebar;
