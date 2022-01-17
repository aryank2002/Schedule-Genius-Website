import React from 'react';
import { FaTimes } from 'react-icons/fa';

import "../../utilities.css";
import "./FixedTask.css"

const FixedTask = (props) => {
  return (
    <div className="fixed_event_card_container">
      <h3>
        {props.task.dayOfWeek} {props.task.startHour}:{props.task.startMinute == 0 ? "00": props.task.startMinute} - {props.task.endHour}:{props.task.endMinute == 0 ? "00": props.task.endMinute}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => props.onDelete(props.task.id)}
        />
      </h3>
      <p>{props.task.eventName}</p>
    </div>
  )
}

export default FixedTask