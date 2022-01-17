import React from "react";
import "./ScheduleCard.css";
import { Link } from "@reach/router";

const ScheduleCard = (props) => {
  return (
    <>
      <div className="link-decoration">
        <Link to="/existing-schedule" _id={props._id} num={props.num} date={props.date}>
          <div className="schedule-card-container" onClick={() => console.log("Hello")}>
            <div className="schedule-title">Schedule #{props.num}</div>
            <p className="data-title"> Date Created: {props.date}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ScheduleCard;
