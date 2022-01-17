import React from "react";
import "./MakeSchedule.css";
import { Link } from "@reach/router";
import FixedTasks from "../modules/FixedTasks";
import AddFixedEvent from "../modules/AddFixedEvent";
import VariableTasks from "../modules/VariableTasks";
import AddVariableEvent from "../modules/AddVariableEvent";
import { useState } from "react";
import { get, post } from "../../utilities";

import "../../utilities.css";

const MakeSchedule = (props) => {
  const get_current_time = () => {
    return Date().toLocaleString();
  };

  const time = get_current_time();

  const [scheduleNum, setScheduleNum] = useState(Math.floor(Math.random() * 10000) + 1);

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
      dayOfWeek: "Monday", // can make a number possible

      parent: "10000", // refers to the _id of parent schedule
      eventName: "Basketball",
    },
    {
      id: 2,
      startHour: 20,
      endHour: 22,
      startMinute: 15,
      endMinute: 30,
      dayOfWeek: "Wednesday", // can make a number possible

      parent: "10000", // refers to the _id of parent schedule
      eventName: "Swimming",
    },
    {
      id: 3,
      startHour: 4,
      endHour: 5,
      startMinute: 0,
      endMinute: 30,
      dayOfWeek: "Sunday", // can make a number possible

      parent: "10000", // refers to the _id of parent schedule
      eventName: "Calculus",
    },
  ]);

  const [variableTasks, setVariableTasks] = useState([
    {
      id: 4,
      hoursDur: 1,
      minDur: 30,

      parent: "10000", // refers to the _id of parent schedule
      eventName: "school hw",
      dayOfWeek: "Wednesday", // may change to number, denoting day
    },
    {
      id: 5,
      hoursDur: 3,
      minDur: 0,

      parent: "10000", // refers to the _id of parent schedule
      eventName: "things to do",
      dayOfWeek: "Thursday", // may change to number, denoting day
    },
    {
      id: 6,
      hoursDur: 4,
      minDur: 15,

      parent: "10000", // refers to the _id of parent schedule
      eventName: "tv time",
      dayOfWeek: "Sunday", // may change to number, denoting day
    },
  ]);

  // Add Fixed Task
  const addFixedTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1; // generate random id number

    const newFixedTask = { id, ...task };
    setFixedTasks([...fixedTasks, newFixedTask]);
  };

  // Delete Fixed Task
  const deleteFixedTask = (id) => {
    setFixedTasks(fixedTasks.filter((task) => task.id !== id));
  };

  // Add Variable Task
  const addVariableTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1; // generate random id number

    const newVariableTasks = { id, ...task };
    setVariableTasks([...variableTasks, newVariableTasks]);
  };

  // Delete Fixed Task
  const deleteVariableTask = (id) => {
    setVariableTasks(variableTasks.filter((task) => task.id !== id));
  };

  //post request to make new schedule and update to MongoDB
  const createNewSchedule = (event) => {
    const addSchedule = () => {
        post("/api/getSchedules" , {userId: props.userId, scheduleNum: scheduleNum, date: time});
    };
    const addFixedEvents = () => {
        for (const elt of fixedTasks) {
            console.log(elt);
            post("/api/getEvents" , {
                startHour: elt.startHour,
                endHour: elt.endHour,
                startMinute: elt.startMinute,
                endMinute: elt.endMinute,
                day: elt.dayOfWeek,
                userId: props.userId,
                scheduleNum: scheduleNum,
                eventName: elt.eventName,
            });
        }
    }
    event.preventDefault();
    addSchedule();
    addFixedEvents();
  };

  return (
    <div>
      <div>
        <h1 className="new_schedule_title">New Schedule</h1>
      </div>
      <div className="new_schedule_flex">
        <section className="new_sub_container new_sub_container_flex">
          <div className="fixed_events_container">
            Fixed Tasks
            {fixedTasks.length > 0 ? (
              <FixedTasks tasks={fixedTasks} onDelete={deleteFixedTask} />
            ) : (
              "To add fixed events to your schedule,"
            )}
          </div>

          <div className="fixed_events_container">
            Variable Tasks
            {variableTasks.length > 0 ? (
              <VariableTasks tasks={variableTasks} onDelete={deleteVariableTask} />
            ) : (
              "To add variable events to your schedule,"
            )}
          </div>
        </section>
        <section className="new_sub_container">
          <AddFixedEvent onAdd={addFixedTask} />
          <AddVariableEvent onAdd={addVariableTask} />
          <button type="button" className="add_button" onClick={createNewSchedule}>
            Generate Calendar
          </button>
        </section>
      </div>
    </div>
  );
};

export default MakeSchedule;
