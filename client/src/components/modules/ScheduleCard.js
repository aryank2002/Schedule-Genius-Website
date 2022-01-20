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
          <div className="whole-container">
              <div className="schedule-card-container">
              <FaTimes
              className="fa_schedule_design"
              onClick={() => props.onDelete(props.task.id)}
              />
              <Link to={"/existing-schedule"} state={{scheduleName: props.name}}>
                <div className="schedule-title" >Schedule: {props.name} </div>
                <p className="data-title"> Date Created: {props.date}</p>
              </Link>
              </div>
          </div>
        
      </div>
    </>
  );
};

export default ScheduleCard;
