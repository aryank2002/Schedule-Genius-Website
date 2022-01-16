const mongoose = require("mongoose");

// Note: Might not need this schema
// If we make two states that are lists keeping track of variable and fixed events
// that we added during our create a schedule session, don't need to store them in our database
// Directly generate the schedule (on server or front-end) and then just store it as fixed event
// with id of calendar we create (we don't add calendar to the database until we hit generate button/end)

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
