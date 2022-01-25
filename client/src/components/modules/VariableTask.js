import React from 'react'
import "./VariableTask.css"
import { FaTimes } from 'react-icons/fa';

const VariableTask = (props) => {
    return (
        <div className="variable_event_card_container">
            <span className="fixed_event_title">
                {props.task.eventName}
                <FaTimes
                className="faTimesdesign"
                onClick={() => props.onDelete(props.task.id)}
                />
            </span>
            <p>{props.task.hoursDur} hour and {props.task.minDur} min by {props.task.dayOfWeek}</p>
        </div>
    )
}

export default VariableTask
