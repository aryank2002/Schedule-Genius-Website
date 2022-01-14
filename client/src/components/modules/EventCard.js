import React from 'react'
import './EventCard.css'

const EventCard = (props) => {
    return (
        <div className="event_card_container">
           <div className="time-title">9:00am-</div>
           <div className="time-title">11:30am</div>
           <div className="activity-title">Basketball</div>
        </div>
    )
}

export default EventCard
