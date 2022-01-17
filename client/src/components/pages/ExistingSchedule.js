import React, { useState, useEffect } from "react";
import "./MakeSchedule.css";
import { Link } from "@reach/router";
import DayOfWeekList from "../modules/DayOfWeekList";
import { get } from "../../utilities";

const ExistingSchedule = (props) => {
  const [schedEvents, setSchedEvents] = useState([]);

  /*
  [{
    startHour: 16,
    endHour: 19,
    startMinute: 15,
    endMinute: 45,
    day: "Tuesday", // can make a number possible

    parent: "245234235", // refers to the _id of parent schedule
    eventName: "Test1",
  },
  {
    startHour: 12,
    endHour: 14,
    startMinute: 0,
    endMinute: 0,
    day: "Tuesday", // can make a number possible

    parent: "2342", // refers to the _id of parent schedule
    eventName: "Test2",
  },
  {
    startHour: 15,
    endHour: 18,
    startMinute: 45,
    endMinute: 30,
    day: "Friday", // can make a number possible

    parent: "2342", // refers to the _id of parent schedule
    eventName: "Test3",
  },]

  comment out below for testing purposes
  */
  console.log(props.userId, props.scheduleNum);

  useEffect(() => {
    get("/api/getEvents", { userId: props._id, scheduleNum: props.num }).then((events) => {
      setSchedEvents(events);
    });
  }, []);

  return (
    <div>
      <div>
        <h1 className="new_schedule_title">Schedule #{props.num}</h1>
      </div>
      <div className="new_schedule_flex">
        <section className="new_sub_container">
          <div className="new_schedules_container">
            <DayOfWeekList
              day="Sunday"
              eventList={schedEvents.filter((eventObj) => eventObj.day === "Sunday")}
            />
            <DayOfWeekList
              day="Monday"
              eventList={schedEvents.filter((eventObj) => eventObj.day === "Monday")}
            />
            <DayOfWeekList
              day="Tuesday"
              eventList={schedEvents.filter((eventObj) => eventObj.day === "Tuesday")}
            />
            <DayOfWeekList
              day="Wednesday"
              eventList={schedEvents.filter((eventObj) => eventObj.day === "Wednesday")}
            />
            <DayOfWeekList
              day="Thursday"
              eventList={schedEvents.filter((eventObj) => eventObj.day === "Thursday")}
            />
            <DayOfWeekList
              day="Friday"
              eventList={schedEvents.filter((eventObj) => eventObj.day === "Friday")}
            />
            <DayOfWeekList
              day="Saturday"
              eventList={schedEvents.filter((eventObj) => eventObj.day === "Saturday")}
            />
          </div>
        </section>
        <section className="new_sub_container">
          <button type="button" className="add_button">
            Date Created: {props.date}
          </button>
        </section>
      </div>
    </div>
  );
};

export default ExistingSchedule;
