const mongoose = require("mongoose");

const ScheduleItemSchema = new mongoose.Schema({
  userId: String,
  scheduleNum: Number,
  date: String,
  scheduleName: String,
  generated: Boolean, // refers to if this is a schedule in progress, or already made
  // probably don't need; when generate schedule button is clicked, we can THEN create a schedule
  // with all events (stored in state lists) being made fixed events

  // what to do if we cannot make a schedule that satisfies user constraints, give up?
  // spit out error message, or give list with  events we could schedule along with unscheduled as well?
});

// compile model from schema
module.exports = mongoose.model("Schedule Item", ScheduleItemSchema);
