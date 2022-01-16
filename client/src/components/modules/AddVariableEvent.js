import React from 'react'
import "./AddVariableEvent.css"
import { useState } from 'react'

const AddVariableEvent = (props) => {
    const [eventName, setEventName] = useState('');
    const [dayOfWeek, setdayOfWeek] = useState("Sunday");
    const [hoursDur, setHoursDur] = useState(0);
    const [minDur, setMinDur] = useState(0);

    const onSubmit = (e) => {
        e.preventDefault();

        if(!eventName) {
            alert('Please input activity name');
            return;
        }

        props.onAdd({eventName, dayOfWeek, hoursDur, minDur});
        
        setEventName('');
        setdayOfWeek("Sunday");
        setHoursDur(0);
        setMinDur(0);
    }
    
    return (
        <>
        <div className="make_schedule_text">
            Option 2: Variable Events
            </div>
            <div className="option_two_questions">
                <form>
                <label>Input Activity Name: </label>
                <input type="text" placeholder="Enter Activity Name here:" value={eventName}
                onChange={(e) => setEventName(e.target.value) }/>
                </form>
            <span>Select Deadline Day of Week</span>
                <form>
                <select id="day_of_week" name="day_of_week" value={dayOfWeek}
                onChange={(e) => setdayOfWeek(e.target.value) }>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday   </option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                </select>
                </form>
                <div>Input start time:</div>
                <select id="hoursDur" name="hoursDur" value={hoursDur}
                onChange={(e) => setHoursDur(e.target.value) }>
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
                <select id="minDur" name="minDur" value={minDur}
                onChange={(e) => setMinDur(e.target.value) }>
                    <option value={0}>00</option>
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                    <option value={45}>45</option>
                </select>
                <div></div>
            <button type="button" className = "submit_variable_questions" onClick={onSubmit}>Submit Variable Event</button>
        </div>
        </>
    )
}

export default AddVariableEvent
