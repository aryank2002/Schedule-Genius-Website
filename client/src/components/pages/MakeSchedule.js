import React from 'react'
import "./MakeSchedule.css";
import { Link } from "@reach/router";
import DayOfWeekList from '../modules/DayOfWeekList';

const MakeSchedule = (props) => {

    const get_current_time = () => {
        return Date().toLocaleString();
    };

    const time = get_current_time()

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
                    <div className="time_format">
                        Created {time}
                    </div>
                </section>
                <section className="new_sub_container">
                    <div className="make_schedule_text">
                    Enter Activity
                    </div>
                    <div class="field"><input type="text" placeholder="Enter your activity here." />
                        <div class="line"></div>
                    </div>
                    <div className="make_schedule_text">
                    Time
                    </div>
                    <button type="button" className = "add_button">Add to Calendar</button>
                    <button type="button" className = "add_button">Finish</button>
                </section>
            </div>
        </div>
    )
}

export default MakeSchedule
