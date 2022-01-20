import React from 'react';
import { FaTimes } from 'react-icons/fa';

import "../../utilities.css";
import "./FixedTask.css"

const FixedTask = (props) => {
  return (
    <div className="fixed_event_card_container">
      <span className="fixed_event_title">
        {props.task.dayOfWeek} {props.task.startHour % 12 == 0 ? 12 : props.task.startHour % 12}:
        {props.task.startMinute == 0 ? "00" : props.task.startMinute}
        {props.task.startHour >= 12 ? "pm" : "am"} - {props.task.endHour % 12 == 0 ? 12 : props.task.endHour % 12}:
        {props.task.endMinute == 0 ? "00" : props.task.endMinute}
        {props.task.endHour >= 12 ? "pm" : "am"}
        
        <FaTimes
          className="faTimesdesign"
          onClick={() => props.onDelete(props.task.id)}
        />
      </span>
      <p className="activity_text_design">{props.task.eventName}</p>
    </div>
  )
}

export default FixedTask