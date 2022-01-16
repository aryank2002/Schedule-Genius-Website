import React from 'react'
import "./MakeSchedule.css";
import { Link } from "@reach/router";
import DayOfWeekList from '../modules/DayOfWeekList';
import FixedTasks from '../modules/FixedTasks';
import AddFixedEvent from '../modules/AddFixedEvent';
import AddVariableEvent from '../modules/AddVariableEvent';
import { useState } from 'react';

import "../../utilities.css";

const MakeSchedule = (props) => {

    const get_current_time = () => {
        return Date().toLocaleString();
    };

    const time = get_current_time();

    /** Delete the hardcoded elements later. Just used for testing to see
     * if the props are passed through. Props copied from fixed-event.js and variable-event.js
     * What works is adding and deleting elements based on the user input.
     * DOES NOT WORK with MongoDB database
     */
    const [fixedTasks, setFixedTasks] = useState([
        {
            id: 1,
            startHour: 8,
            endHour: 9,
            startMinute: 15,
            endMinute: 15,
            day: "Monday", // can make a number possible

            parent: "10000", // refers to the _id of parent schedule
            eventName: "Basketball",
        },
        {
            id: 2,
            startHour: 20,
            endHour: 22,
            startMinute: 15,
            endMinute: 30,
            day: "Wednesday", // can make a number possible

            parent: "10000", // refers to the _id of parent schedule
            eventName: "Swimming",
        },
        {
            id: 3,
            startHour: 4,
            endHour: 5,
            startMinute: 0,
            endMinute: 30,
            day: "Sunday", // can make a number possible

            parent: "10000", // refers to the _id of parent schedule
            eventName: "Calculus",
        },
    ]);

    const [variableTasks, setVariableTasks] = useState([
        {
            hoursDur: 1,
            minDur: 30,

            parent: "10000", // refers to the _id of parent schedule
            eventName: "school hw",
            deadline: "Wednesday", // may change to number, denoting day
        },
        {
            hoursDur: 3,
            minDur: 0,

            parent: "10000", // refers to the _id of parent schedule
            eventName: "things to do",
            deadline: "Thursday", // may change to number, denoting day
        },
        {
            hoursDur: 4,
            minDur: 15,

            parent: "10000", // refers to the _id of parent schedule
            eventName: "tv time",
            deadline: "Sunday", // may change to number, denoting day
        },

    ]);

    // Add Fixed Task
    const addFixedTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1; // generate random id number

        const newFixedTask = {id, ...task};
        setFixedTasks([...fixedTasks, newFixedTask]);
    }

    // Delete Fixed Task
    const deleteFixedTask = (id) => {
        setFixedTasks(fixedTasks.filter((task) => task.id !== id));
    }

    return (
        <div>
            <div>
                <h1 className="new_schedule_title">New Schedule</h1>
            </div>
            <div className="new_schedule_flex">
                <section className="new_sub_container new_sub_container_flex">
                    <div className="fixed_events_container"> 
                    Fixed Tasks
                    {fixedTasks.length > 0 ? <FixedTasks tasks={fixedTasks} onDelete={deleteFixedTask}/> : "To add fixed events to your schedule,"}
                    </div>

                    <div className="fixed_events_container"> 
                    Variable Tasks
                    <FixedTasks tasks={fixedTasks}/>
                    </div>
                </section>
                <section className="new_sub_container">
                    <AddFixedEvent onAdd={addFixedTask}/>
                    <AddVariableEvent />
                    <button type="button" className = "add_button">Generate Calendar</button>
                </section>
            </div>
        </div>
    )
}

export default MakeSchedule
