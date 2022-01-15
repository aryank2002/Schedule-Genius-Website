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
router.post("/generateSchedule", auth.ensureLoggedIn, (req, res) => {
  // TO DO, NOT DONE
  // When user opens up/refreshes create new schedule page, should open up new event
  const newStory = new Story({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
  });

  newStory.save().then((story) => res.send(story));
});

router.post("/addFixedEvent", auth.ensureLoggedIn, (req, res) => {
  newStory.save().then((story) => res.send(story));
});

router.post("/addFixedEvent", auth.ensureLoggedIn, (req, res) => {
  const fevent = new FixedEvent({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
  });

  newStory.save().then((story) => res.send(story));
});

router.get("/getSchedules", auth.ensureLoggedIn, (req, res) => {
  ScheduleItem.find({ userId: req.user.name }).then((schedules) => {
    res.send(schedules);
  });
});

router.get("/getEvents", auth.ensureLoggedIn, (req, res) => {
  FixedEvent.find({ parent: req.query.parent }).then((events) => {
    res.send(events);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
