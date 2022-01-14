import React from 'react'
import "./MakeSchedule.css";
import { Link } from "@reach/router";
import DayOfWeekList from '../modules/DayOfWeekList';

const MakeSchedule = (props) => {
    return (
        <div>
            <div>
                <h1 className="new_schedule_title">New Schedule</h1>
            </div>
            <div className="new_schedule_flex">
                <section className="new_sub_container">
                    <div className="new_schedules_container">
                        <DayOfWeekList day="Sunday"/>
                        <DayOfWeekList day="Monday"/>
                        <DayOfWeekList day="Tuesday"/>
                        <DayOfWeekList day="Wednesday"/>
                        <DayOfWeekList day="Thursday"/>
                        <DayOfWeekList day="Friday"/>
                        <DayOfWeekList day="Saturday"/>
                    </div>
                </section>
                <section className="new_sub_container">
                    <button type="button" className = "add_button">Add to Calendar</button>
                </section>
            </div>
        </div>
    )
}

export default MakeSchedule
