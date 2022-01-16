import React from 'react'
import "./VariableTask.css"
import { FaTimes } from 'react-icons/fa';

const VariableTask = (props) => {
    return (
        <div className="variable_event_card_container">
            <h3>
                {props.task.hoursDur} hour and {props.task.minDur} min
                <FaTimes
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => props.onDelete(props.task.id)}
                />
            </h3>
            <p>{props.task.eventName}<b> by {props.task.dayOfWeek} </b></p>
        </div>
    )
}

export default VariableTask
