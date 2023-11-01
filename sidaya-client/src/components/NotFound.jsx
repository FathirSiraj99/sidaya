import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const naviate = useNavigate();

  const handleGoBack = () => {
    naviate('/');
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button variant="contained" onClick={handleGoBack}>Go Back</Button>
    </div>
  );
};

export default NotFound;
