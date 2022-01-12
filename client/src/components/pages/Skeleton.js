import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import "../../utilities.css";
import "./Skeleton.css";

const Skeleton = (props) => {

  return (
    <>
      <div className="home_container" >
      <div class="animated-title">
        <div class="text-top">
          <div>
            <span>The schedule</span>
            <span>designed</span>
          </div>
        </div>
        <div class="text-bottom">
          <div>just for you!</div>
        </div>
      </div>
      </div>
      <div className="button_container">
      <button type="button" className = "home_button">Make a schedule</button>
      </div>
      <h2 className="middle_text_style"> Make your schedule for free! Plan out all of your 
      <br></br>courses, homework, etc. to be successful!</h2>
      <hr class="line" />

      <div className="u-flex">
        <section className="subContainer u-textCenter">
          <img src = "https://i.pinimg.com/originals/85/db/23/85db232a0e2f4d7ec93db9bcedeb97d8.png" className = "image_format"/>
          <h4 className="subTitle">Easy to Use</h4>
          <p className="subText">
            View your schedules with ease. All it takes is a few clicks and our website has your weekly plans all 
            saved for you.
          </p>
        </section>
        <section className="subContainer u-textCenter">
        <img src = "https://docs.google.com/drawings/d/e/2PACX-1vRXhoZ7PGOdMau6njiCUpIRKXCmlsdU7-IJLvJo6ufjQf1L-nczfUh_R4YQ4Rqof8IXtxrVJwXuHHPU/pub?w=500&amp;h=500" className = "image_format"/>
          <h4 className="subTitle">Convenient</h4>
          <p className="subText">
          Open My Schedules and all the weeks you’ve created with website are all there
          </p>
        </section>
        <section className="subContainer u-textCenter">
          <img src="https://docs.google.com/drawings/d/e/2PACX-1vRna0lpHA804Eog7OmO96STVDudozZVRbUK_AWGOOBemxqhvA8lTiq7oKm6h6hGwGzxHKNFVmmBHhkd/pub?w=443&amp;h=661" className = "image_format" />
          <h4 className="subTitle">How it Works</h4>
          <p className="subText">
          Make a schedule. Add required activities in your day. Have other things to do? This website can figure it out for you!
          </p>
        </section>
      </div>
    </>
  );
};

export default Skeleton;
