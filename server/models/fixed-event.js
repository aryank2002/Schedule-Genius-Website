const mongoose = require("mongoose");

const FixedEventSchema = new mongoose.Schema({
  startHour: Number,
  endHour: Number,
  startMinute: Number,
  endMinute: Number,
  day: String, // can make a number possible
  userId: String, // refers to the _id of parent schedule
  scheduleNum: Number,
  eventName: String,
});

// compile model from schema
module.exports = mongoose.model("Fixed Event", FixedEventSchema);
