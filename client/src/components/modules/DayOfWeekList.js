import React from "react";
import "./DayOfWeekList.css";
import EventCard from "./EventCard";

const DayOfWeekList = (props) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    props.eventList.sort(function (a, b) {
      return a.startHour + a.startMinute / 60 - b.startHour - b.startMinute / 60;
    });
    setEvents(props.eventList);
  }, []);

  return (
    <div className="day_of_week_container">
      <p className="day_of_week_title">{props.day}</p>

      {props.events.map((eventObj) => (
        <EventCard
          startH={eventObj.startHour}
          endH={eventObj.endHour}
          startMin={eventObj.startMinute}
          endMin={eventObj.endMinute}
          eventName={eventObj.eventName}
        />
      ))}
    </div>
  );
};

// .sort(function (a, b) {
//    return a.startHour + a.startMinute / 60 - b.startHour - b.startMinute / 60;
// })

export default DayOfWeekList;
