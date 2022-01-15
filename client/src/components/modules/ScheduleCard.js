import React from "react";
import "./ScheduleCard.css";
import { Link } from "@reach/router";

const ScheduleCard = (props) => {
  return (
    <>
      <Link to="/existing-schedule">
        <div className="schedule-card-container" onClick={() => console.log("Hello")}>
          <div className="schedule-title">Schedule #{props.num}</div>
          <p className="data-title"> Date Created: {props.date}</p>
        </div>
      </Link>
    </>
  );
};

export default ScheduleCard;
