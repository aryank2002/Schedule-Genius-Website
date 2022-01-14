import React from 'react'
import './DayOfWeekList.css'
import EventCard from './EventCard'

const DayOfWeekList = (props) => {
    return (
        <div className="day_of_week_container">
            <p className="day_of_week_title">{props.day}</p>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
        </div>
    )
}

export default DayOfWeekList
