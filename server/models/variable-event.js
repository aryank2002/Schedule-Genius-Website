const mongoose = require("mongoose");

const VariableEventSchema = new mongoose.Schema({
  hoursDur: Number,
  minDur: Number,

  parent: String, // refers to the _id of parent schedule
  eventName: String,
  deadline: String, // may change to number, denoting day

  // at the time user is adding these events, it will be a variable event
  // but then once scheduling program runs, it will convert this event into a fixed time
});

// compile model from schema
module.exports = mongoose.model("Variable Event", VariableEventSchema);
