/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const ScheduleItem = require("./models/schedule-item");
const FixedEvent = require("./models/fixed-event");
const VariableEvent = require("./models/variable-event");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// STARTED, BUT POST APIs ARE INCOMPLETE (get should be done)
router.post("/addSchedules", auth.ensureLoggedIn, (req, res) => {
  // TO DO, NOT DONE
  // When user opens up/refreshes create new schedule page, should open up new event
  const newSchedule = new ScheduleItem({
    userId: req.user._id,
    scheduleNum: req.body.scheduleNum,
    date: req.body.date,
    generated: true,
  });

  newSchedule.save().then((schedule) => res.send(schedule));
});

router.post("/addEvents", auth.ensureLoggedIn, (req, res) => {
  const fevent = new FixedEvent({
    // startHour: req.body.startHour,
    // endHour: req.body.endHour,
    // startMinute: req.body.startMinute,
    // endMinute: req.body.eventName,
    // day: req.body.day,
    // userId: req.body.userId,
    // scheduleNum: req.body.scheduleNum,
    // eventName: req.body.eventName,
    startHour: req.body.startHour,
    endHour: req.body.endHour,
    startMinute: req.body.startMinute,
    endMinute: req.body.endMinute,
    day: req.body.day,
    userId: req.user._id, // refers to the _id of parent schedule
    // FIX LINE ABOVE, SHOULD POINT TO PARENT - JUST MARKING as NOTE
    scheduleNum: req.body.scheduleNum,
    eventName: req.body.eventName,
  });

  fevent.save().then((eventObj) => res.send(eventObj));
});

router.get("/getSchedules", auth.ensureLoggedIn, (req, res) => {
  // add { userID: req.user._id, generated: true }
  ScheduleItem.find({ userId: req.user._id }).then((schedules) => {
    res.send(schedules);
  });
});

router.get("/getEvents", auth.ensureLoggedIn, (req, res) => {
  FixedEvent.find({ userId: req.user._id}).then((events) => {
    res.send(events);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
