import React from "react";
import "./AddFixedEvent.css";
import { useState } from "react";

const AddFixedEvent = (props) => {
  const [eventName, setEventName] = useState("");
  const [dayOfWeek, setdayOfWeek] = useState("Sunday");
  const [startHour, setStartHour] = useState(0);
  const [startMinute, setStartMinute] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const [endMinute, setEndMinute] = useState(0);

  //make sure start time is less than end time
  const checkValidTimes = (startHour, startMinute, endHour, endMinute) => {
    // console.log(startHour, startMinute, endHour, endMinute);
    if (Number(startHour) > Number(endHour)) {
      return false;
    }
    if (Number(startHour) == Number(endHour) && Number(startMinute) >= Number(endMinute)) {
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!eventName) {
      alert("Please input activity name");
      return;
    }
    if (!checkValidTimes(startHour, startMinute, endHour, endMinute)) {
      alert("Please enter valid start and end times.");
      return;
    }

    props.onAdd({ eventName, dayOfWeek, startHour, startMinute, endHour, endMinute });
  };

  return (
    <>
      <div className="make_schedule_text">Step 1: Add Fixed Events</div>
      <div className="option_one_questions">
        <form>
          <label>Input Activity Name: </label>
          <input
            type="text"
            placeholder="Enter Activity Name here:"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </form>
        <span>Select Day of Week</span>
        <form>
          <select
            id="day_of_week"
            name="day_of_week"
            value={dayOfWeek}
            onChange={(e) => setdayOfWeek(e.target.value)}
          >
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday </option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </form>
        <div>Input start time:</div>
        <select
          id="start_hour"
          name="start_hour"
          value={startHour}
          onChange={(e) => setStartHour(e.target.value)}
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
          <option value={13}>13</option>
          <option value={14}>14</option>
          <option value={15}>15</option>
          <option value={16}>16</option>
          <option value={17}>17</option>
          <option value={18}>18</option>
          <option value={19}>19</option>
          <option value={20}>20</option>
          <option value={21}>21</option>
          <option value={22}>22</option>
          <option value={23}>23</option>
        </select>
        :
        <select
          id="start_minute"
          name="start_minute"
          value={startMinute}
          onChange={(e) => setStartMinute(e.target.value)}
        >
          <option value={0}>00</option>
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={45}>45</option>
        </select>
        <div>Input end time:</div>
        <select
          id="end_hour"
          name="end_hour"
          value={endHour}
          onChange={(e) => setEndHour(e.target.value)}
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
          <option value={13}>13</option>
          <option value={14}>14</option>
          <option value={15}>15</option>
          <option value={16}>16</option>
          <option value={17}>17</option>
          <option value={18}>18</option>
          <option value={19}>19</option>
          <option value={20}>20</option>
          <option value={21}>21</option>
          <option value={22}>22</option>
          <option value={23}>23</option>
        </select>
        :
        <select
          id="end_minute"
          name="end_minute"
          value={endMinute}
          onChange={(e) => setEndMinute(e.target.value)}
        >
          <option value={0}>00</option>
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={45}>45</option>
        </select>
        <div></div>
        <button type="button" className="submit_fixed_button" onClick={onSubmit}>
          Submit Fixed Event
        </button>
      </div>
    </>
  );
};

export default AddFixedEvent;
