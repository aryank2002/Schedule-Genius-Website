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

  const time_slots = ["9:00", "9:15", "9:30", "9:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30"];

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
    console.log(num);
    return num;
  }

  const get_table_contents = (time) => {
      const elts_of_week = [<td>{time}</td>, <td className=" no-events" rowSpan={1} />, <td className=" no-events" rowSpan={1} />, <td className=" no-events" rowSpan={1} />, <td className=" no-events" rowSpan={1} />, <td className=" no-events" rowSpan={1} />, <td className=" no-events" rowSpan={1} />, <td className=" no-events" rowSpan={1} />]

      for(const evt of schedEvents){
        if ((evt.scheduleName === scheduleName) && evt.startHour === parseInt(time.substring(0, time.indexOf(":"))) && evt.startMinute === parseInt(time.substring(time.indexOf(":")+1))){
          elts_of_week[dayToNum(evt.day) + 1] = 
          <td className=" has-events" rowSpan={calculate_row_span(evt)}>
            <div className="row-fluid lecture" style={{width: '99%', height: '100%'}}>
              <span className="title">{evt.eventName}</span> <span className="lecturer"><a>Prof.
                  Someone</a></span> <span className="location">23/111</span>
            </div>
          </td>;
        }
      }

      return <tr>{elts_of_week.map(elt => (elt))}</tr>;
  };

  return (
    <div>
      <div>
        <h1 className="new_schedule_title">Schedule: {scheduleName}</h1>
      </div>
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
          <tr>
            <td>08:00</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" has-events" rowSpan={5}>
              <div className="row-fluid lecture" style={{width: '99%', height: '100%'}}>
                <span className="title">Combinatorics</span> <span className="lecturer"><a>Prof.
                    Someone</a></span> <span className="location">23/111</span>
              </div>
            </td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" has-events" rowSpan={8}>
              <div className="row-fluid lecture" style={{ width: "99%", height: "100%" }}>
                <span className="title">Data Structures</span>{" "}
                <span className="lecturer">
                  <a>Prof. If</a>
                </span>{" "}
                <span className="location">54/222</span>
              </div>
            </td>
            <td className=" has-events" rowSpan={4}>
              <div className="row-fluid lecture" style={{ width: "99%", height: "100%" }}>
                <span className="title">Data Structures</span>{" "}
                <span className="lecturer">
                  <a>Prof. If</a>
                </span>{" "}
                <span className="location">54/222</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>08:30</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>09:00</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>09:30</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" has-events" rowSpan={5}>
              <div className="row-fluid lecture" style={{width: '99%', height: '100%'}}>
                <span className="title">Tuesday EVent</span> <span className="lecturer"><a>Prof.
                    Someone</a></span> <span className="location">23/111</span>
              </div>
            </td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>10:00</td>
            <td className=" has-events" rowSpan={5}>
              <div className="row-fluid lecture" style={{ width: "99%", height: "100%" }}>
                <span className="title">Combinatorics</span>{" "}
                <span className="lecturer">
                  <a>Prof. Someone</a>
                </span>{" "}
                <span className="location">23/111</span>
              </div>
            </td>
            <td className=" has-events" rowSpan={4}>
              <div className="row-fluid lecture" style={{width: '99%', height: '100%'}}>
                <span className="title">Algebra 2</span> <span className="lecturer"><a>Prof.
                    Else <span className="location">44/654</span>
                  </a></span></div><a>
              </a></td>
            <td className=" no-events" rowSpan={1}/>
            <td className=" has-events" rowSpan={4}>
              <div className="row-fluid lecture" style={{ width: "99%", height: "100%" }}>
                <span className="title">Data Structures</span>{" "}
                <span className="lecturer">
                  <a>Prof. If</a>
                </span>{" "}
                <span className="location">54/222</span>
              </div>
            </td>
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>10:30</td>
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>11:00</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>11:30</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>12:00</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" has-events conflicts " rowSpan={4}>
              <div className="row-fluid practice" style={{ width: "49.5%", height: "100%" }}>
                <span className="title">Algebra 2</span>{" "}
                <span className="lecturer">
                  <a>Mr. Someone</a>
                </span>{" "}
                <span className="location">12/444</span>
              </div>
              <div className="row-fluid lecture" style={{ width: "49.5%", height: "100%" }}>
                <span className="title">Calculus 1</span>{" "}
                <span className="lecturer">
                  <a>Prof. Foo</a>
                </span>{" "}
                <span className="location">66/321</span>
              </div>
            </td>
            <td className=" no-events" rowSpan={1} />
            <td className=" has-events" rowSpan={4}>
              <div className="row-fluid lecture" style={{ width: "99%", height: "100%" }}>
                <span className="title">Algebra 2</span>{" "}
                <span className="lecturer">
                  <a>Prof. Oak</a>
                </span>{" "}
                <span className="location">54/224</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>12:30</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>13:00</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>13:30</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>14:00</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" has-events" rowSpan={4}>
              <div className="row-fluid lecture" style={{ width: "99%", height: "100%" }}>
                <span className="title">Data Structures</span>{" "}
                <span className="lecturer">
                  <a>Prof. Oak</a>
                </span>{" "}
                <span className="location">33/111</span>
              </div>
            </td>
            <td className=" no-events" rowSpan={1} />
            <td className=" has-events" rowSpan={6}>
              <div className="row-fluid lecture" style={{ width: "99%", height: "100%" }}>
                <span className="title">Calculus 1</span>{" "}
                <span className="lecturer">
                  <a>Dr. Ok</a>
                </span>{" "}
                <span className="location">12/54</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>14:30</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>15:00</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>15:30</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>16:00</td>
            <td className=" has-events" rowSpan={4}>
              <div className="row-fluid practice" style={{ width: "99%", height: "100%" }}>
                <span className="title">Calculus 1</span>{" "}
                <span className="lecturer">
                  <a>Mrs. Ak</a>
                </span>{" "}
                <span className="location">54/125</span>
              </div>
            </td>
            <td className=" has-events" rowSpan={4}>
              <div className="row-fluid lecture" style={{ width: "99%", height: "100%" }}>
                <span className="title">Combinatorics</span>{" "}
                <span className="lecturer">
                  <a>Ms. Nice</a>
                </span>{" "}
                <span className="location">99/411</span>
              </div>
            </td>
            <td className=" has-events" rowSpan={4}>
              <div className="row-fluid practice" style={{ width: "99%", height: "100%" }}>
                <span className="title">Combinatorics</span>{" "}
                <span className="lecturer">
                  <a>Ms. K</a>
                </span>{" "}
                <span className="location">24/900</span>
              </div>
            </td>
            <td className=" has-events" rowSpan={4}>
              <div className="row-fluid practice" style={{ width: "99%", height: "100%" }}>
                <span className="title">Data Structures</span>{" "}
                <span className="lecturer">
                  <a>Mr. Ben</a>
                </span>{" "}
                <span className="location">54/214</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>16:30</td>
          </tr>
          <tr>
            <td>17:00</td>
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>17:30</td>
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>18:00</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>18:30</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>19:00</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
          <tr>
            <td>19:30</td>
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
            <td className=" no-events" rowSpan={1} />
          </tr>
        </tbody>
      </table>
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
        <section className="new_sub_container">
          <Link to="/schedules">
            <button type="button" className="add_button">
              Back to <b>My Schedules</b>
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ExistingSchedule;
