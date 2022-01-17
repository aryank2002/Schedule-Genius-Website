import React from "react";
import "./EventCard.css";

const EventCard = (props) => {
  // take in startH, startMin, endH, endMin, eventName
  return (
    <div className="event_card_container">
      <div className="time-title">
        {props.startH % 12 == 0 ? 12 : props.startH % 12}:
        {props.startMin == 0 ? "00" : props.startMin}
        {props.startH >= 12 ? "pm" : "am"}
      </div>
      <div className="time-title">
        {props.endH % 12 == 0 ? 12 : props.endH % 12}:{props.endMin == 0 ? "00" : props.endMin}
        {props.endH >= 12 ? "pm" : "am"}
      </div>
      <div className="activity-title">{props.eventName}</div>
    </div>
  );
};

export default EventCard;
