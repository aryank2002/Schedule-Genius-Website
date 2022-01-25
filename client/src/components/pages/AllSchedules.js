import React, { useEffect, useState } from "react";
import "./AllSchedules.css";
import "../../utilities.css";
import "./Skeleton.css";
import { Link } from "@reach/router";
import ScheduleCard from "../modules/ScheduleCard";

import { get } from "../../utilities";
import { post } from "../../utilities";

import existing_image from "../images/existing_schedule_img.png"

const AllSchedules = (props) => {
  const [schedList, setSchedList] = useState([]);

  /*
    {
      userID: "looolool",
      scheduleNum: 34,
      date: "1/23/2012",
      generated: true,
    },
    {
      userID: "Testing",
      scheduleNum: 523,
      date: "10 / 3 / 2021",
      generated: true,
    },
  ]);

  comment out below, will just default to above schedules rather than trying to find some
  for testing purposes
  
  */

  const deleteSched = (schedID) => {
    post("/api/delSchedule", { id: schedID }).then(
    get("/api/getSchedules").then((schedCards) => {
      setSchedList(schedCards);
    }));
  };

  useEffect(() => {
    get("/api/getSchedules").then((schedCards) => {
      setSchedList(schedCards);
    });
  }, []);

  return (
    <>
      <div>
        <h1 className="schedule_title">My Schedules</h1>
      </div>
      <div className="schedule_flex">
        <section className="sub_container">
          <div className="schedules_container">
            {schedList.length !== 0 ? (
              schedList.map((schedObj) => (
                <ScheduleCard
                  key={schedObj._id}
                  _id={schedObj._id}
                  num={schedObj.scheduleNum}
                  name={schedObj.scheduleName}
                  date={schedObj.date}
                  funct={deleteSched}
                />
              ))
            ) : (
              <div> No schedules to display </div>
            )}
          </div>
        </section>
        <section className="sub_container">
          <img
            src={existing_image}
            className="sched_img_content"
          />
          <Link to="/schedule">
            <button type="button" className="schedule_button">
              Create a new schedule
            </button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default AllSchedules;
