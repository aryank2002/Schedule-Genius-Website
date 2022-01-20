import React from "react";
import "./ScheduleCard.css";
import { Link } from "@reach/router";
import { Router } from "@reach/router";
import { FaTimes } from 'react-icons/fa';
import ExistingSchedule from "../pages/ExistingSchedule";

const ScheduleCard = (props) => {
  console.log(props.num);
  return (
    <>

      <div className="link-decoration">
        <Link to={"/existing-schedule"} state={{scheduleName: props.name}}>
          <div className="schedule-card-container" onClick={() => console.log("Hello")}>
            <div className="schedule-title" >Schedule: {props.name} <FaTimes
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => console.log("Hello my guy")}/></div>
            <p className="data-title"> Date Created: {props.date}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ScheduleCard;
