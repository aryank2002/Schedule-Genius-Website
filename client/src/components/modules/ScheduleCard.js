import React from "react";
import "./ScheduleCard.css";
import { Link } from "@reach/router";

const ScheduleCard = (props) => {
    return (
        <>
            <div className="link-decoration">
            <Link to="/schedule">
                <div className="schedule-card-container" onClick={()=>console.log("Hello")}>
                    <div className="schedule-title">Schedule #1</div>
                    <p className="data-title"> Data Created: 1/1/2022</p>
                </div>
            </Link>
            </div>
        </>
    )
}

export default ScheduleCard;
