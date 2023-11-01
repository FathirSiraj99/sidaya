import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Dashboard from "./pages/Dashboard";
import Area from "./pages/Area";
import Activity from "./pages/Activity";
import ActivityTemplate from "./pages/ActivityTemplate";
import ActivityDetail from "./pages/ActivityDetail";
import NotFound from "./components/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Alarm from "./components/Alarm";
import Problem from "./pages/Problem";
// import BadRequest from "./components/BadRequest";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#747476",
    },
    divider: "#D6D6D6",
    background: {
      default: "#1E1E1E",
      paper: "#2D2D30",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#CDCDCD",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        {/* <Alarm time="16.27"/> */}
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Dashboard />} />
              <Route path="/area" element={<Area />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/activity-template" element={<ActivityTemplate />} />
              <Route path="/activity-detail" element={<ActivityDetail />} />
              <Route path="/problem" element={<Problem />} />
            </Route>

            <Route path="*" element={<NotFound />} />
            {/* <Route path="/bad-request" element={<BadRequest />} /> */}
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
