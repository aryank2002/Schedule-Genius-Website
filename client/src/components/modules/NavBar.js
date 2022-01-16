import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

const GOOGLE_CLIENT_ID = "236244320342-part5884unaimln856mvdvkkc84a9r6e.apps.googleusercontent.com";

const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <span className="NavBar-title u-inlineBlock">
        <img
          src="https://docs.google.com/drawings/d/e/2PACX-1vRXhoZ7PGOdMau6njiCUpIRKXCmlsdU7-IJLvJo6ufjQf1L-nczfUh_R4YQ4Rqof8IXtxrVJwXuHHPU/pub?w=60&amp;h=60"
          className="u-inlineBlock NavBar-logo "
        />
        <Link to="/" className="NavBar-link">
          ScheduleGenius
        </Link>
      </span>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        {
          <Link to={`/schedules/${props.userId}`} className="NavBar-link">
            My Schedules
          </Link>
        }
        {props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={props.handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
