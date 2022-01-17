import React, { useEffect, useState } from "react";
import "./AllSchedules.css";
import "../../utilities.css";
import "./Skeleton.css";
import { Link } from "@reach/router";
import ScheduleCard from "../modules/ScheduleCard";

import { get } from "../../utilities";

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
                  date={schedObj.date}
                />
              ))
            ) : (
              <div> No schedules to display </div>
            )}
          </div>
        </section>
        <section className="sub_container">
          <img
            src="https://docs.google.com/drawings/d/e/2PACX-1vQFeJEyoWu36oqhKqfmiCr3quztnKeeOg8QMX126n8GR5pv_gMYqQ7Rn7B7MqEX_5Iw1n3Jl-BhDbjv/pub?w=928&amp;h=434"
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
