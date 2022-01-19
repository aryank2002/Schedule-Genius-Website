import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import { useHistory } from "react-router-dom";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import NavBar from "./modules/NavBar.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import AllSchedules from "./pages/AllSchedules.js";
import MakeSchedule from "./pages/MakeSchedule";
import ExistingSchedule from "./pages/ExistingSchedule";

/**
 * Define the "App" component
 */

const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <div className="all_container_margin"></div>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <Router>
        <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        <AllSchedules path={"/schedules"} userId={userId} />
        <MakeSchedule path={"/schedule"} />
        <ExistingSchedule path={"/existing-schedule/"} userId={userId}/>
        <NotFound default />
      </Router>
      <div className="footer-basic">
        <footer>
          <ul className="list-inline">
            <li className="list-inline-item">Created by Aryan Kumar and Roderick Huang</li>
          </ul>
          <p className="copyright">ScheduleGenius © 2022</p>
        </footer>
      </div>
    </>
  );
};

export default App;
