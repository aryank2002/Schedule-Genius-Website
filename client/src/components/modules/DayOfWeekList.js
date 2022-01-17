import React from "react";
import "./DayOfWeekList.css";
import EventCard from "./EventCard";

const DayOfWeekList = (props) => {
  return (
    <div className="day_of_week_container">
      <p className="day_of_week_title">{props.day}</p>
      {props.eventList.map((eventObj) => (
        <EventCard
          startH={eventObj.startHour}
          endH={eventObj.endHour}
          startMin={eventObj.startMinute}
          endMin={eventObj.endMinute}
          eventName={eventObj.eventName}
        />
      ))}
    </div>
  );
};

export default DayOfWeekList;
