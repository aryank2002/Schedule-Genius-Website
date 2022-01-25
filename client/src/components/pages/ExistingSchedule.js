import React, { useState, useEffect } from "react";
import "./MakeSchedule.css";
import { useLocation } from "@reach/router";
import { Link } from "@reach/router";
import DayOfWeekList from "../modules/DayOfWeekList";
import { get } from "../../utilities";
import "./ExistingSchedule.css";
import { ReactDOM } from "react-dom";
import $ from "jquery";

const ExistingSchedule = (props) => {
  const [schedEvents, setSchedEvents] = useState([]);

  const location = useLocation();
  const { scheduleName } = location.state;

  useEffect(() => {
    get("/api/getEvents", { scheduleName: scheduleName }).then((events) => {
      setSchedEvents(events);
    });
  }, []);

  let min_hour = 24;
  let max_hour = 0;

  for(const evt of schedEvents){
    if (evt.scheduleName === scheduleName){
      const start_hr = evt.startHour;
      const end_hr = evt.endHour;

      if(start_hr <  min_hour) min_hour = start_hr;
      if(end_hr > max_hour) max_hour = end_hr;
    }
  }

  min_hour = Math.max(0, min_hour - 1);
  max_hour = Math.min(max_hour + 1, 24);

  const time_slots = [];
  var counter = 0;
  for(let num = min_hour * 60; num <= max_hour * 60; num+=15){
    const hr = Math.floor(num/60);
    const min = num - 60 * hr;
    time_slots[counter] = ""+hr+":"+(min === 0 ? "00": ("" + min));
    counter++;
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
  
  const calculate_row_span = (evt) => {
    const num = ((evt.endHour * 60 + evt.endMinute) - (evt.startHour * 60 + evt.startMinute))/15;
    return num;
  }

  const convert_time_to_num = (hours, min) => {
    return 60 * hours + min;
  }

  const convert_time_to_ampm = (time) => {
    const hrs = parseInt(time.substring(0, time.indexOf(":")));
    const min = parseInt(time.substring(time.indexOf(":")+1));
    return "" + (hrs % 12 === 0 ? 12 : hrs % 12) + ":" + (min === 0 ? "00" : min) + (hrs >= 12 ? "pm" : "am");
  }

  let i = 0;
  let univ_table = [];

  const get_table_contents = (time) => {
      const elts_of_week = [<td>{0 === parseInt(time.substring(time.indexOf(":")+1)) ? convert_time_to_ampm(time) : ""}</td>, <td className=" no-events" rowSpan={1} />, <td className=" no-events" rowSpan={1} />, <td className=" no-events" rowSpan={1} />, <td className=" no-events" rowSpan={1} />, <td className=" no-events" rowSpan={1} />, <td className=" no-events" rowSpan={1} />, <td className=" no-events" rowSpan={1} />]
      const evts=[0,0,0,0,0,0,0]

      for(const evt of schedEvents){
        if ((evt.scheduleName === scheduleName) && evt.startHour === parseInt(time.substring(0, time.indexOf(":"))) && evt.startMinute === parseInt(time.substring(time.indexOf(":")+1))){
          var correct_index = dayToNum(evt.day) + 1;
          for(const week of univ_table){
            for(const week_evt of week){
              if(dayToNum(week_evt.day) < dayToNum(evt.day) && convert_time_to_num(week_evt.endHour, week_evt.endMinute) > convert_time_to_num(evt.startHour,evt.startMinute) ){
                correct_index--;
                elts_of_week.pop();
              }
            }
          }
          elts_of_week[correct_index] = 
          <td className=" has-events" rowSpan={calculate_row_span(evt)}>
            <div className="row-fluid lecture" style={{width: '99%', height: '99%'}}>
              <span className="title">{evt.eventName}</span> <span className="time_design">
                  {evt.startHour % 12 == 0 ? 12 : evt.startHour % 12}:
                  {evt.startMinute == 0 ? "00" : evt.startMinute}
                  {evt.startHour >= 12 ? "pm" : "am"} - {evt.endHour % 12 == 0 ? 12 : evt.endHour % 12}:
                  {evt.endMinute == 0 ? "00" : evt.endMinute}
                  {evt.endHour >= 12 ? "pm" : "am"}
              </span>
            </div>
          </td>;
          evts[dayToNum(evt.day)] = evt;
        }
      }
      univ_table[i] = [...evts];
      i++;

      return <tr>{elts_of_week.map(elt => (elt))}</tr>;
  };

  return (
    <div>
      <div>
        <h1 className="new_schedule_title">Schedule: {scheduleName}</h1>
      </div>
      <div className="existing_schedule_container">
        <table className="calendar table table-bordered">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th width="14%">Sunday</th>
              <th width="14%">Monday</th>
              <th width="14%">Tuesday</th>
              <th width="14%">Wednesday</th>
              <th width="14%">Thursday</th>
              <th width="14%">Friday</th>
              <th width="14%">Saturday</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>08:00</td>
              <td className=" no-events" rowSpan={1} />
              <td className=" no-events" rowSpan={1} />
              <td className=" has-events" rowSpan={5}>
                <div className="row-fluid lecture" style={{width: '99%', height: '100%'}}>
                  <span className="title">Combinatorics</span> <span className="lecturer"><a>Prof.
                      Someone</a></span> <span className="location">23/111</span>
                </div>
              </td>
            </tr> */}
            {time_slots.map(get_table_contents)}
          </tbody>
        </table>
      </div>
  
      {/* OLD CODE BELOW */}

      <div className="new_schedule_flex">
        <section className="new_sub_container">
          <div className="new_schedules_container">
            <DayOfWeekList
              day="Sunday"
              eventList={schedEvents.filter(
                (eventObj) => eventObj.day === "Sunday" && scheduleName === eventObj.scheduleName
              )}
            />
            <DayOfWeekList
              day="Monday"
              eventList={schedEvents.filter(
                (eventObj) => eventObj.day === "Monday" && scheduleName === eventObj.scheduleName
              )}
            />
            <DayOfWeekList
              day="Tuesday"
              eventList={schedEvents.filter(
                (eventObj) => eventObj.day === "Tuesday" && scheduleName === eventObj.scheduleName
              )}
            />
            <DayOfWeekList
              day="Wednesday"
              eventList={schedEvents.filter(
                (eventObj) => eventObj.day === "Wednesday" && scheduleName === eventObj.scheduleName
              )}
            />
            <DayOfWeekList
              day="Thursday"
              eventList={schedEvents.filter(
                (eventObj) => eventObj.day === "Thursday" && scheduleName === eventObj.scheduleName
              )}
            />
            <DayOfWeekList
              day="Friday"
              eventList={schedEvents.filter(
                (eventObj) => eventObj.day === "Friday" && scheduleName === eventObj.scheduleName
              )}
            />
            <DayOfWeekList
              day="Saturday"
              eventList={schedEvents.filter(
                (eventObj) => eventObj.day === "Saturday" && scheduleName === eventObj.scheduleName
              )}
            />
          </div>
        </section>
      </div>
      <section className="back_button_container">
          <Link to="/schedules">
            <button type="button" className="back_button_design">
              Back to <b>My Schedules</b>
            </button>
          </Link>
      </section>
    </div>
  );
};

export default ExistingSchedule;
