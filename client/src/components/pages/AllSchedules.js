import React from 'react'
import "./AllSchedules.css";
import "../../utilities.css";
import "./Skeleton.css";
import { Link } from "@reach/router";
import ScheduleCard from '../modules/ScheduleCard';

const AllSchedules = (props) => {
    return (
        <>
            <div>
                <h1 className="schedule_title">My Schedules</h1>
            </div>
            <div className="schedule_flex">
                <section className="sub_container">
                    <div className="schedules_container">
                       <ScheduleCard/>
                       <ScheduleCard/>
                       <ScheduleCard/>
                       <ScheduleCard/>
                       <ScheduleCard/>
                       <ScheduleCard/>
                       <ScheduleCard/>
                       <ScheduleCard/>
                       <ScheduleCard/>
                       <ScheduleCard/>
                    </div>
                </section>
                <section className="sub_container">
                    <img src="https://docs.google.com/drawings/d/e/2PACX-1vQFeJEyoWu36oqhKqfmiCr3quztnKeeOg8QMX126n8GR5pv_gMYqQ7Rn7B7MqEX_5Iw1n3Jl-BhDbjv/pub?w=928&amp;h=434" className="sched_img_content"/>
                    <Link to="/schedule">
                        <button type="button" className = "schedule_button">Create a new schedule</button>
                    </Link>
                </section>
            </div>
        </>
    )
}

export default AllSchedules
