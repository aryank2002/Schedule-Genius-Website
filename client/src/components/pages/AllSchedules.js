import React from 'react'
import "./AllSchedules.css";

const AllSchedules = (props) => {
    return (
        <>
            <div>
                <h1 className="schedule_title">My Schedules</h1>
            </div>
            <div className="schedules_container">
                Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>
                Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>
                Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>
                Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>
                Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>Hi<br></br>
                {props.userId}
            </div>
        </>
    )
}

export default AllSchedules
