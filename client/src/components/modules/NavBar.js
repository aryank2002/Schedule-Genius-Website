import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

const GOOGLE_CLIENT_ID = "236244320342-part5884unaimln856mvdvkkc84a9r6e.apps.googleusercontent.com";

const NavBar = (props) => {
  const nav_bar_contents = (
    <div>
      <nav id="navbar">
        <div className="navbar_container">
          <div className="logo">
            <Link to="/">
              <img
                src="https://docs.google.com/drawings/d/e/2PACX-1vRXhoZ7PGOdMau6njiCUpIRKXCmlsdU7-IJLvJo6ufjQf1L-nczfUh_R4YQ4Rqof8IXtxrVJwXuHHPU/pub?w=60&amp;h=60"
                className="u-inlineBlock NavBar-logo"
              />
              <a>ScheduleGenius</a>
            </Link>
          </div>
          {/* Navbar Links */}
          <ul id="menu">
            <Link to="/" onClick = {() => ($(window).scrollTop(0))}>
              <li>
                <a>Home</a>
              </li>
            </Link>
            <Link to="/schedules">
              <li>
                <a>My Schedules</a>
              </li>
            </Link>
            {props.userId ? (
              <Link to="/">
                <GoogleLogout
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Logout"
                  onLogoutSuccess={props.handleLogout}
                  onFailure={(err) => console.log(err)}
                  className="NavBar-link NavBar-login"
                ></GoogleLogout>
              </Link>
            ) : (
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={props.handleLogin}
                onFailure={(err) => console.log(err)}
                className="NavBar-link NavBar-login"
              />
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
  {
    /* <nav className="NavBar-container">
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
    <Link to={"/schedules"} className="NavBar-link">
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
    ><Link to="/">Logout</Link></GoogleLogout>
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
</nav>; */
  }

  return (
    <>{props.userId !== undefined ? nav_bar_contents : <div className="dummy-nothing"></div>}</>
  );
};

export default NavBar;
