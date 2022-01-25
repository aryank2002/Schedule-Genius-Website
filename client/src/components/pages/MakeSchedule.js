import React from "react";
import "./MakeSchedule.css";
import { Link } from "@reach/router";
import Modal from "react-modal";
import FixedTasks from "../modules/FixedTasks";
import AddFixedEvent from "../modules/AddFixedEvent";
import VariableTasks from "../modules/VariableTasks";
import AddVariableEvent from "../modules/AddVariableEvent";
import { useState } from "react";
import { get, post } from "../../utilities";
import celebration from "../images/9b96799d061a0528da6b0da7bac5374a.gif";
import tools from "../images/tools.png";
import think from "../images/clipart3591000.png";

import "../../utilities.css";

const MakeSchedule = (props) => {
  const get_current_time = () => {
    return Date().toLocaleString();
  };

  const time = get_current_time();

  const [scheduleNum, setScheduleNum] = useState(Math.floor(Math.random() * 10000) + 1);
  const [schedName, setSchedName] = useState("");

  /** Delete the hardcoded elements later. Just used for testing to see
   * if the props are passed through. Props copied from fixed-event.js and variable-event.js
   * What works is adding and deleting elements based on the user input.
   */
  const [fixedTasks, setFixedTasks] = useState([]);
  /*
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
  */

  const [variableTasks, setVariableTasks] = useState([]);
  const [finished_generating, setGeneration] = useState(false);
  /*
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
  */

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
    const id = Math.floor(Math.random() * 100000) + 1; // generate random id number

    const newVariableTasks = { id, ...task };
    setVariableTasks([...variableTasks, newVariableTasks]);
  };

  // Delete Fixed Task
  const deleteVariableTask = (id) => {
    setVariableTasks(variableTasks.filter((task) => task.id !== id));
  };

  //post request to make new schedule and update to MongoDB
  const createNewSchedule = (event) => {
    if (!schedName) {
      alert("Please input schedule name");
      return;
    }

    const dayToNum = (dayWeek) => {
      if (dayWeek === "Sunday") {
        return 0;
      }
      if (dayWeek === "Monday") {
        return 1;
      }
      if (dayWeek === "Tuesday") {
        return 2;
      }
      if (dayWeek === "Wednesday") {
        return 3;
      }
      if (dayWeek === "Thursday") {
        return 4;
      }
      if (dayWeek === "Friday") {
        return 5;
      }
      if (dayWeek === "Saturday") {
        return 6;
      }
    };

    let checkOverlap = Array(24 * 7 * 4).fill(false);
    for (const elem of fixedTasks) {
      const st1 = 24 * 4 * dayToNum(elem.dayOfWeek) + 4 * elem.startHour + elem.startMinute / 15;
      const e1 = 24 * 4 * dayToNum(elem.dayOfWeek) + 4 * elem.endHour + elem.endMinute / 15;
      for (let i = st1; i < e1; i += 1) {
        if (checkOverlap[i] === true) {
          console.log("Here");
          alert("Please ensure your fixed events do not overlap");
          return;
        }
        checkOverlap[i] = true;
      }
    }

    /*
    // PLAY WITH THIS, SEE IF IT MIGHT NEED TWEAKING TO 7 or can be INCREASED to 9 or 10
    if (variableTasks.length > 8){
      alert("Please put only 8 variable-time events or less");
      return;
    }
    */

    console.log(schedName);
    const addSchedule = () => {
      post("/api/addSchedules", { scheduleNum: scheduleNum, date: time, scheduleName: schedName });
    };
    const addFixedEvents = () => {
      for (const elt of fixedTasks) {
        console.log(elt);
        post("/api/addEvents", {
          startHour: elt.startHour,
          endHour: elt.endHour,
          startMinute: elt.startMinute,
          endMinute: elt.endMinute,
          day: elt.dayOfWeek,
          userId: props.userId,
          // add schedule returns the schedule obj it creates, so
          // you could put addSchedule._id for the above userId
          scheduleNum: scheduleNum,
          scheduleName: schedName,
          eventName: elt.eventName,
        });
      }
    };

    // Add comment here

    const addVariableEvents = () => {
      let used = Array(variableTasks.length).fill(false);
      let seq = Array(variableTasks.length).fill(0);
      const filled = Array(7 * 24 * 4).fill(false);
      let made = false;

      for (const elt of fixedTasks) {
        let st = dayToNum(elt.dayOfWeek) * 24 * 4 + elt.startHour * 4 + elt.startMinute / 15;
        let end = dayToNum(elt.dayOfWeek) * 24 * 4 + elt.endHour * 4 + elt.endMinute / 15;
        console.log(st, end);

        for (let ind = st; ind < end; ind += 1) {
          filled[ind] = true;
        }
      }

      // Check from here
      const recursive = (index) => {
        if (index === variableTasks.length) {
          if (made === true) return;
          let timePtr = 0;
          let elemPtr = 0;
          let time = Array(variableTasks.length).fill(0);

          while (timePtr < 24 * 7 * 4 && elemPtr < variableTasks.length) {
            while (timePtr < 24 * 7 * 4 && filled[timePtr] === true) {
              timePtr += 1;
            }

            if (timePtr === 24 * 7 * 4) {
              break;
            }

            // CAN ADD SOME CODE HERE TO OPTIMIZE
            if (timePtr % (24 * 4) >= 88 || timePtr % (24 * 4) < 9 * 4) {
              timePtr += 1;
              continue;

              // untested optimization commented below
              /*
              const modVal = timePtr % (24 * 4);
              if (modVal >= 88){
                timePtr += (9 * 4 + 24 * 4 - modVal);
              } else if (modVal < 9 * 4){
                timePtr += (9 * 4 - modVal);
              }
              */
            }

            let curElem = variableTasks[seq[elemPtr]];
            let endT = timePtr + curElem.hoursDur * 4 + curElem.minDur / 15;

            if (endT > 24 * 7 * 4) {
              break;
            }

            // CAN ADD SOME CODE HERE TO OPTIMIZE
            if (endT % (24 * 4) > 88 || endT % (24 * 4) < 36) {
              timePtr += 1;
              continue;

              // untested optimization commented below
              /*
              const modVal = endT % (24 * 4);
              if (modVal > 88){
                timePtr += (9 * 4 + 24 * 4 - modVal);
              } else if (modVal < 9 * 4){
                timePtr += (9 * 4 - modVal);
              }
              */
            }

            let pos = true;
            for (let t = timePtr; t < endT; t += 1) {
              if (filled[t] === true) {
                timePtr = t + 1;
                pos = false;
              }
            }

            if (pos === false) {
              continue;
            }

            if (endT > (dayToNum(curElem.dayOfWeek) + 1) * 24 * 4) {
              break;
              // makes sure ends by that day, midnight
            }

            console.log(timePtr, endT);
            time[elemPtr] = timePtr;
            timePtr = endT;
            elemPtr += 1;

            // check if variable events can be scheduled in this order
          }

          const dayList = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];

          console.log(elemPtr);
          console.log(variableTasks.length);
          if (elemPtr === variableTasks.length) {
            made = true;
            console.log("DONE");
            for (let j = 0; j < variableTasks.length; j += 1) {
              // TO DO
              let curElem = variableTasks[seq[j]];
              // console.log(curElem.minDur);
              let endT = time[j] + curElem.hoursDur * 4 + curElem.minDur / 15;
              post("/api/addEvents", {
                startHour: Math.floor((time[j] % (24 * 4)) / 4),
                endHour: Math.floor((endT % (24 * 4)) / 4),
                startMinute: Math.floor((time[j] % (24 * 4)) % 4) * 15,
                endMinute: Math.floor((endT % (24 * 4)) % 4) * 15,
                day: dayList[Math.floor(time[j] / 96)],
                userId: props.userId,
                // add schedule returns the schedule obj it creates, so
                // you could put addSchedule._id for the above userId
                scheduleNum: scheduleNum,
                scheduleName: schedName,
                eventName: curElem.eventName,
              });
            }
          }
        }
        // TILL HERE
        else {
          if (made === true) return;
          for (let i = 0; i < variableTasks.length; i += 1) {
            if (used[i] === false) {
              seq[index] = i;
              used[i] = true;

              // CAN OPTIMIZE HERE WITH PRUNING - TRY IF THERE IS TIME
              // ALSO TEST, TO ENSURE PROGRAM WORKS & DETERMINE BREAKING POINT (IN TERMS OF HOW
              // MANY VARIABLE EVENTS CAN BE HANDLED BEFORE PROG. TIMES OUT)
              recursive(index + 1);
              used[i] = false;
            }
          }
        }
      };

      recursive(0);
      // If schedule can be generated it will; otherwise, does nothing
    };

    // REALLY INEFFICIENT, roughly 650 * n * n! operations
    // end comment here

    // TO DO, SCHEDULE Variable TIME Events
    // Tues - 2hour, Wed - 1 hour, Thu - 1 hour, Fr - 2 hour
    // two assignments, first (1 hour, wednesday) second (2 hour, thursday)
    event.preventDefault();
    addSchedule();
    addFixedEvents();

    addVariableEvents();
    setGeneration(true);
  };

  const fixedText = (
    <div className="fixedText">
      <b>Step 1.</b> Add the fixed events of your week here.
      <p>
        <img src={tools} className="tools_image" />
      </p>
    </div>
  );

  const variableText = (
    <div className="fixedText">
      <b>Step 2.</b> Add the variable events of your week here.
      <p>
        <img src={think} className="think_image" />
      </p>
    </div>
  );

  return (
    <div>
      <div>
        <h1 className="new_schedule_title">New Schedule</h1>
      </div>
      <div className="new_schedule_flex">
        <section className="new_sub_container new_sub_container_flex">
          <div className="fixed_events_container">
            <div className="boxText">
              <u>Fixed Events</u>
            </div>
            {fixedTasks.length > 0 ? (
              <FixedTasks tasks={fixedTasks} onDelete={deleteFixedTask} />
            ) : (
              fixedText
            )}
          </div>

          <div className="fixed_events_container">
            <div className="boxText">
              <u>Variable Events</u>
            </div>
            {variableTasks.length > 0 ? (
              <VariableTasks tasks={variableTasks} onDelete={deleteVariableTask} />
            ) : (
              variableText
            )}
          </div>
        </section>
        <section className="new_sub_container">
          <AddFixedEvent onAdd={addFixedTask} />
          <AddVariableEvent onAdd={addVariableTask} />
          <br></br>
          <span className="generate_text">
            <b>Step 3</b>. Press below after you've<br></br>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; added all your
            events!
          </span>
          <form className="sched_name_container">
            <label>Input Schedule Name: </label>
            <input
              type="text"
              placeholder="Input schedule name here:"
              value={schedName}
              onChange={(e) => setSchedName(e.target.value)}
            />
          </form>
          <button type="button" className="generate_button" onClick={createNewSchedule}>
            Generate Schedule
          </button>
          <Modal isOpen={finished_generating} className="modal_design">
            <h2>Congratulations on making a schedule!</h2>
            <p>Our website has calculated the perfect schedule for you!</p>
            <img src={celebration} className="celebrate_image" />
            <p>
              Click on{" "}
              <Link to="/schedules">
                <u>
                  <b>My Schedules</b>
                </u>
              </Link>{" "}
              in the top navigation bar to view the generated schedule.
            </p>
          </Modal>
        </section>
      </div>
    </div>
  );
};

export default MakeSchedule;
