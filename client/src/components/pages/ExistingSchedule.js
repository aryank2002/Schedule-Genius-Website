import React, { useState, useEffect } from "react";
import "./MakeSchedule.css";
import { useLocation } from "@reach/router";
import { Link } from "@reach/router";
import DayOfWeekList from "../modules/DayOfWeekList";
import { get } from "../../utilities";
import "./ExistingSchedule.css";
import { ReactDOM } from "react-dom";
import $ from "jquery";

const ExistingSchedule = (props) => {
  const [schedEvents, setSchedEvents] = useState([]);

  const location = useLocation();
  const { scheduleName } = location.state;

  /*
    {
      startHour: 16,
      endHour: 19,
      startMinute: 15,
      endMinute: 45,
      day: "Tuesday", // can make a number possible

      parent: "245234235", // refers to the _id of parent schedule
      eventName: "Test1",
    },
    {
      startHour: 12,
      endHour: 14,
      startMinute: 0,
      endMinute: 0,
      day: "Tuesday", // can make a number possible

      parent: "2342", // refers to the _id of parent schedule
      eventName: "Test2",
    },
    {
      startHour: 15,
      endHour: 18,
      startMinute: 45,
      endMinute: 30,
      day: "Friday", // can make a number possible

      parent: "2342", // refers to the _id of parent schedule
      eventName: "Test3",
    },
  ]);

  comment out below for testing purposes

  */

  useEffect(() => {
    get("/api/getEvents").then((events) => {
      setSchedEvents(events);
    });
  }, []);

  jQuery(document).ready(function ($) {
    var transitionEnd =
      "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
    var transitionsSupported = $(".csstransitions").length > 0;
    //if browser does not support transitions - use a different event to trigger them
    if (!transitionsSupported) transitionEnd = "noTransition";

    //should add a loding while the events are organized

    function SchedulePlan(element) {
      this.element = element;
      this.timeline = this.element.find(".timeline");
      this.timelineItems = this.timeline.find("li");
      this.timelineItemsNumber = this.timelineItems.length;
      this.timelineStart = getScheduleTimestamp(this.timelineItems.eq(0).text());
      //need to store delta (in our case half hour) timestamp
      this.timelineUnitDuration =
        getScheduleTimestamp(this.timelineItems.eq(1).text()) -
        getScheduleTimestamp(this.timelineItems.eq(0).text());

      this.eventsWrapper = this.element.find(".events");
      this.eventsGroup = this.eventsWrapper.find(".events-group");
      this.singleEvents = this.eventsGroup.find(".single-event");
      this.eventSlotHeight = this.eventsGroup.eq(0).children(".top-info").outerHeight();

      this.modal = this.element.find(".event-modal");
      this.modalHeader = this.modal.find(".header");
      this.modalHeaderBg = this.modal.find(".header-bg");
      this.modalBody = this.modal.find(".body");
      this.modalBodyBg = this.modal.find(".body-bg");
      this.modalMaxWidth = 800;
      this.modalMaxHeight = 480;

      this.animating = false;

      this.initSchedule();
    }

    SchedulePlan.prototype.initSchedule = function () {
      this.scheduleReset();
      this.initEvents();
    };

    SchedulePlan.prototype.scheduleReset = function () {
      var mq = this.mq();
      if (mq == "desktop" && !this.element.hasClass("js-full")) {
        //in this case you are on a desktop version (first load or resize from mobile)
        this.eventSlotHeight = this.eventsGroup.eq(0).children(".top-info").outerHeight();
        this.element.addClass("js-full");
        this.placeEvents();
        this.element.hasClass("modal-is-open") && this.checkEventModal();
      } else if (mq == "mobile" && this.element.hasClass("js-full")) {
        //in this case you are on a mobile version (first load or resize from desktop)
        this.element.removeClass("js-full loading");
        this.eventsGroup.children("ul").add(this.singleEvents).removeAttr("style");
        this.eventsWrapper.children(".grid-line").remove();
        this.element.hasClass("modal-is-open") && this.checkEventModal();
      } else if (mq == "desktop" && this.element.hasClass("modal-is-open")) {
        //on a mobile version with modal open - need to resize/move modal window
        this.checkEventModal("desktop");
        this.element.removeClass("loading");
      } else {
        this.element.removeClass("loading");
      }
    };

    SchedulePlan.prototype.initEvents = function () {
      var self = this;

      this.singleEvents.each(function () {
        //create the .event-date element for each event
        var durationLabel =
          '<span class="event-date">' +
          $(this).data("start") +
          " - " +
          $(this).data("end") +
          "</span>";
        $(this).children("a").prepend($(durationLabel));

        //detect click on the event and open the modal
        $(this).on("click", "a", function (event) {
          event.preventDefault();
          if (!self.animating) self.openModal($(this));
        });
      });

      //close modal window
      this.modal.on("click", ".close", function (event) {
        event.preventDefault();
        if (!self.animating) self.closeModal(self.eventsGroup.find(".selected-event"));
      });
      this.element.on("click", ".cover-layer", function (event) {
        if (!self.animating && self.element.hasClass("modal-is-open"))
          self.closeModal(self.eventsGroup.find(".selected-event"));
      });
    };

    SchedulePlan.prototype.placeEvents = function () {
      var self = this;
      this.singleEvents.each(function () {
        //place each event in the grid -> need to set top position and height
        var start = getScheduleTimestamp($(this).attr("data-start")),
          duration = getScheduleTimestamp($(this).attr("data-end")) - start;

        console.log(start, duration, "fdasfasdf");

        var eventTop =
            (self.eventSlotHeight * (start - self.timelineStart)) / self.timelineUnitDuration,
          eventHeight = (self.eventSlotHeight * duration) / self.timelineUnitDuration;

        $(this).css({
          /*
          top: eventTop - 1 + "px",
          height: eventHeight + 1 + "px",
          */
          top: eventTop + "px",
          height: eventHeight + "px",
        });
      });

      this.element.removeClass("loading");
    };

    SchedulePlan.prototype.openModal = function (event) {
      var self = this;
      var mq = self.mq();
      this.animating = true;

      //update event name and time
      this.modalHeader.find(".event-name").text(event.find(".event-name").text());
      this.modalHeader.find(".event-date").text(event.find(".event-date").text());
      this.modal.attr("data-event", event.parent().attr("data-event"));

      //update event content
      this.modalBody
        .find(".event-info")
        .load(event.parent().attr("data-content") + ".html .event-info > *", function (data) {
          //once the event content has been loaded
          self.element.addClass("content-loaded");
        });

      this.element.addClass("modal-is-open");

      setTimeout(function () {
        //fixes a flash when an event is selected - desktop version only
        event.parent("li").addClass("selected-event");
      }, 10);

      if (mq == "mobile") {
        self.modal.one(transitionEnd, function () {
          self.modal.off(transitionEnd);
          self.animating = false;
        });
      } else {
        var eventTop = event.offset().top - $(window).scrollTop(),
          eventLeft = event.offset().left,
          eventHeight = event.innerHeight(),
          eventWidth = event.innerWidth();

        var windowWidth = $(window).width(),
          windowHeight = $(window).height();

        var modalWidth =
            windowWidth * 0.8 > self.modalMaxWidth ? self.modalMaxWidth : windowWidth * 0.8,
          modalHeight =
            windowHeight * 0.8 > self.modalMaxHeight ? self.modalMaxHeight : windowHeight * 0.8;

        var modalTranslateX = parseInt((windowWidth - modalWidth) / 2 - eventLeft),
          modalTranslateY = parseInt((windowHeight - modalHeight) / 2 - eventTop);

        var HeaderBgScaleY = modalHeight / eventHeight,
          BodyBgScaleX = modalWidth - eventWidth;

        //change modal height/width and translate it
        self.modal.css({
          top: eventTop + "px",
          left: eventLeft + "px",
          height: modalHeight + "px",
          width: modalWidth + "px",
        });
        transformElement(
          self.modal,
          "translateY(" + modalTranslateY + "px) translateX(" + modalTranslateX + "px)"
        );

        //set modalHeader width
        self.modalHeader.css({
          width: eventWidth + "px",
        });
        //set modalBody left margin
        self.modalBody.css({
          marginLeft: eventWidth + "px",
        });

        //change modalBodyBg height/width ans scale it
        self.modalBodyBg.css({
          height: eventHeight + "px",
          width: "1px",
        });
        transformElement(
          self.modalBodyBg,
          "scaleY(" + HeaderBgScaleY + ") scaleX(" + BodyBgScaleX + ")"
        );

        //change modal modalHeaderBg height/width and scale it
        self.modalHeaderBg.css({
          height: eventHeight + "px",
          width: eventWidth + "px",
        });
        transformElement(self.modalHeaderBg, "scaleY(" + HeaderBgScaleY + ")");

        self.modalHeaderBg.one(transitionEnd, function () {
          //wait for the  end of the modalHeaderBg transformation and show the modal content
          self.modalHeaderBg.off(transitionEnd);
          self.animating = false;
          self.element.addClass("animation-completed");
        });
      }

      //if browser do not support transitions -> no need to wait for the end of it
      if (!transitionsSupported) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
    };

    SchedulePlan.prototype.closeModal = function (event) {
      var self = this;
      var mq = self.mq();

      this.animating = true;

      if (mq == "mobile") {
        this.element.removeClass("modal-is-open");
        this.modal.one(transitionEnd, function () {
          self.modal.off(transitionEnd);
          self.animating = false;
          self.element.removeClass("content-loaded");
          event.removeClass("selected-event");
        });
      } else {
        var eventTop = event.offset().top - $(window).scrollTop(),
          eventLeft = event.offset().left,
          eventHeight = event.innerHeight(),
          eventWidth = event.innerWidth();

        var modalTop = Number(self.modal.css("top").replace("px", "")),
          modalLeft = Number(self.modal.css("left").replace("px", ""));

        var modalTranslateX = eventLeft - modalLeft,
          modalTranslateY = eventTop - modalTop;

        self.element.removeClass("animation-completed modal-is-open");

        //change modal width/height and translate it
        this.modal.css({
          width: eventWidth + "px",
          height: eventHeight + "px",
        });
        transformElement(
          self.modal,
          "translateX(" + modalTranslateX + "px) translateY(" + modalTranslateY + "px)"
        );

        //scale down modalBodyBg element
        transformElement(self.modalBodyBg, "scaleX(0) scaleY(1)");
        //scale down modalHeaderBg element
        transformElement(self.modalHeaderBg, "scaleY(1)");

        this.modalHeaderBg.one(transitionEnd, function () {
          //wait for the  end of the modalHeaderBg transformation and reset modal style
          self.modalHeaderBg.off(transitionEnd);
          self.modal.addClass("no-transition");
          setTimeout(function () {
            self.modal
              .add(self.modalHeader)
              .add(self.modalBody)
              .add(self.modalHeaderBg)
              .add(self.modalBodyBg)
              .attr("style", "");
          }, 10);
          setTimeout(function () {
            self.modal.removeClass("no-transition");
          }, 20);

          self.animating = false;
          self.element.removeClass("content-loaded");
          event.removeClass("selected-event");
        });
      }

      //browser do not support transitions -> no need to wait for the end of it
      if (!transitionsSupported) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
    };

    SchedulePlan.prototype.mq = function () {
      //get MQ value ('desktop' or 'mobile')
      var self = this;
      return window
        .getComputedStyle(this.element.get(0), "::before")
        .getPropertyValue("content")
        .replace(/["']/g, "");
    };

    SchedulePlan.prototype.checkEventModal = function (device) {
      this.animating = true;
      var self = this;
      var mq = this.mq();

      if (mq == "mobile") {
        //reset modal style on mobile
        self.modal
          .add(self.modalHeader)
          .add(self.modalHeaderBg)
          .add(self.modalBody)
          .add(self.modalBodyBg)
          .attr("style", "");
        self.modal.removeClass("no-transition");
        self.animating = false;
      } else if (mq == "desktop" && self.element.hasClass("modal-is-open")) {
        self.modal.addClass("no-transition");
        self.element.addClass("animation-completed");
        var event = self.eventsGroup.find(".selected-event");

        var eventTop = event.offset().top - $(window).scrollTop(),
          eventLeft = event.offset().left,
          eventHeight = event.innerHeight(),
          eventWidth = event.innerWidth();

        var windowWidth = $(window).width(),
          windowHeight = $(window).height();

        var modalWidth =
            windowWidth * 0.8 > self.modalMaxWidth ? self.modalMaxWidth : windowWidth * 0.8,
          modalHeight =
            windowHeight * 0.8 > self.modalMaxHeight ? self.modalMaxHeight : windowHeight * 0.8;

        var HeaderBgScaleY = modalHeight / eventHeight,
          BodyBgScaleX = modalWidth - eventWidth;

        setTimeout(function () {
          self.modal.css({
            width: modalWidth + "px",
            height: modalHeight + "px",
            top: windowHeight / 2 - modalHeight / 2 + "px",
            left: windowWidth / 2 - modalWidth / 2 + "px",
          });
          transformElement(self.modal, "translateY(0) translateX(0)");
          //change modal modalBodyBg height/width
          self.modalBodyBg.css({
            height: modalHeight + "px",
            width: "1px",
          });
          transformElement(self.modalBodyBg, "scaleX(" + BodyBgScaleX + ")");
          //set modalHeader width
          self.modalHeader.css({
            width: eventWidth + "px",
          });
          //set modalBody left margin
          self.modalBody.css({
            marginLeft: eventWidth + "px",
          });
          //change modal modalHeaderBg height/width and scale it
          self.modalHeaderBg.css({
            height: eventHeight + "px",
            width: eventWidth + "px",
          });
          transformElement(self.modalHeaderBg, "scaleY(" + HeaderBgScaleY + ")");
        }, 10);

        setTimeout(function () {
          self.modal.removeClass("no-transition");
          self.animating = false;
        }, 20);
      }
    };

    var schedules = $(".cd-schedule");
    var objSchedulesPlan = [],
      windowResize = false;

    if (schedules.length > 0) {
      schedules.each(function () {
        //create SchedulePlan objects
        objSchedulesPlan.push(new SchedulePlan($(this)));
      });
    }

    $(window).on("resize", function () {
      if (!windowResize) {
        windowResize = true;
        !window.requestAnimationFrame
          ? setTimeout(checkResize)
          : window.requestAnimationFrame(checkResize);
      }
    });

    // Might have outdated functions, try replacing them to see if it will work
    // Otherwise create a new grid
    $(window).keyup(function (event) {
      if (event.keyCode == 27) {
        objSchedulesPlan.forEach(function (element) {
          element.closeModal(element.eventsGroup.find(".selected-event"));
        });
      }
    });

    function checkResize() {
      objSchedulesPlan.forEach(function (element) {
        element.scheduleReset();
      });
      windowResize = false;
    }

    function getScheduleTimestamp(time) {
      //accepts hh:mm format - convert hh:mm to timestamp
      time = time.replace(/ /g, "");
      var timeArray = time.split(":");
      var timeStamp = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
      return timeStamp;
    }

    function transformElement(element, value) {
      element.css({
        "-moz-transform": value,
        "-webkit-transform": value,
        "-ms-transform": value,
        "-o-transform": value,
        transform: value,
      });
    }
  });

  const monEvents = schedEvents
    .filter((eventObj) => eventObj.day === "Monday" && scheduleName === eventObj.scheduleName)
    .map((eventObj) => (
      <li
        className="single-event"
        data-start={eventObj.startHour + ":" + eventObj.startMinute}
        data-end={eventObj.endHour + ":" + eventObj.endMinute}
        data-event="event-1"
      >
        <a>
          <em className="event-name">{eventObj.eventName}</em>
        </a>
      </li>
    ));

  const getDayEvents = (dayStr) => {
    return schedEvents
      .filter((eventObj) => eventObj.day === dayStr && scheduleName === eventObj.scheduleName)
      .map((eventObj) => (
        <li
          className="single-event"
          data-start={
            (Number(eventObj.startHour) <= 9 ? "0" : "") +
            eventObj.startHour +
            ":" +
            (Number(eventObj.startMinute) === 0 ? "0" : "") +
            eventObj.startMinute
          }
          data-end={
            (Number(eventObj.endHour) <= 9 ? "0" : "") +
            eventObj.endHour +
            ":" +
            (Number(eventObj.endMinute) === 0 ? "0" : "") +
            eventObj.endMinute
          }
          data-content={"event-testing" + Math.floor(Math.random() * 50)}
          data-event={"event-" + Math.floor(Math.random() * 5 + 1)}
        >
          <a>
            <em className="event-name">{eventObj.eventName}</em>
          </a>
        </li>
      ));
  };

  /*
  <li
    className="single-event"
    data-start="09:30"
    data-end="10:30"
    data-content="event-abs-circuit"
    data-event="event-1"
  >
    <a href="#0">
      <em className="event-name">Abs Circuit</em>
    </a>
  </li>;
  */

  console.log(monEvents, "hello");

  return (
    <div>
      <div>
        <h1 className="new_schedule_title">Schedule: {scheduleName}</h1>
      </div>
      <div>
        <div className="cd-schedule loading">
          <div className="timeline">
            <ul>
              <li>
                <span>09:00</span>
              </li>
              <li>
                <span>09:30</span>
              </li>
              <li>
                <span>10:00</span>
              </li>
              <li>
                <span>10:30</span>
              </li>
              <li>
                <span>11:00</span>
              </li>
              <li>
                <span>11:30</span>
              </li>
              <li>
                <span>12:00</span>
              </li>
              <li>
                <span>12:30</span>
              </li>
              <li>
                <span>13:00</span>
              </li>
              <li>
                <span>13:30</span>
              </li>
              <li>
                <span>14:00</span>
              </li>
              <li>
                <span>14:30</span>
              </li>
              <li>
                <span>15:00</span>
              </li>
              <li>
                <span>15:30</span>
              </li>
              <li>
                <span>16:00</span>
              </li>
              <li>
                <span>16:30</span>
              </li>
              <li>
                <span>17:00</span>
              </li>
              <li>
                <span>17:30</span>
              </li>
              <li>
                <span>18:00</span>
              </li>
            </ul>
          </div>{" "}
          {/* .timeline */}
          {/*
              <ul>
                    {(schedEvents.filter((eventObj) => eventObj.day === "Monday" && scheduleName === eventObj.scheduleName)).map((eventObj) => (
                      <li className="single-event" 
                          data-start={eventObj.startHour + ":" + eventObj.startMinute + "-"} 
                          data-end={eventObj.endHour + ":" + eventObj.endMinute} 
                          data-content="event-abs-circuit" 
                          data-event="event-1">
                        <a>
                          <em className="event-name">{eventObj.name}</em>
                        </a>
                      </li>
                    ))}
                </ul>
            */}
          <div className="events">
            <ul className="wrap">
              <li className="events-group">
                <div className="top-info">
                  <span>Sunday</span>
                </div>
                {/*  className="cd-schedule" */}
                <ul>{getDayEvents("Sunday")}</ul>
              </li>
              <li className="events-group">
                <div className="top-info">
                  <span>Monday</span>
                </div>
                <ul>{getDayEvents("Monday")}</ul>
              </li>
              <li className="events-group">
                <div className="top-info">
                  <span>Tuesday</span>
                </div>
                <ul>
                  {getDayEvents("Tuesday")}
                  <li
                    className="single-event"
                    data-start="15:30"
                    data-end="17:00"
                    data-content="event-test"
                    data-event="event-4"
                  >
                    <a href="#0">
                      <em className="event-name">Test Event</em>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="events-group">
                <div className="top-info">
                  <span>Wednesday</span>
                </div>
                <ul>{getDayEvents("Wednesday")}</ul>
              </li>
              <li className="events-group">
                <div className="top-info">
                  <span>Thursday</span>
                </div>
                <ul>{getDayEvents("Thursday")}</ul>
              </li>
              {/*        */}
              <li className="events-group">
                <div className="top-info">
                  <span>Friday</span>
                </div>
                <ul>{getDayEvents("Friday")}</ul>
              </li>
              {/*        */}
              {/*        */}
              <li className="events-group">
                <div className="top-info">
                  <span>Saturday</span>
                </div>
                <ul>
                  {getDayEvents("Saturday")}
                  <li
                    className="single-event"
                    data-start="09:30"
                    data-end="10:30"
                    data-content="event-abs-circuit"
                    data-event="event-1"
                  >
                    <a href="#0">
                      <em className="event-name">Abs Circuit</em>
                    </a>
                  </li>

                  <li
                    className="single-event"
                    data-start="11:00"
                    data-end="12:30"
                    data-content="event-rowing-workout"
                    data-event="event-2"
                  >
                    <a href="#0">
                      <em className="event-name">Rowing Workout</em>
                    </a>
                  </li>
                  <li
                    className="single-event"
                    data-start="14:00"
                    data-end="15:15"
                    data-content="event-yoga-1"
                    data-event="event-3"
                  >
                    <a href="#0">
                      <em className="event-name">Yoga Level 1</em>
                    </a>
                  </li>
                </ul>
              </li>
              {/*        */}
            </ul>
          </div>
          <div className="event-modal">
            <header className="header">
              <div className="content">
                <span className="event-date" />
                <h3 className="event-name" />
              </div>
              <div className="header-bg" />
            </header>
            <div className="body">
              <div className="event-info" />
              <div className="body-bg" />
            </div>
            <a href="#0" className="close">
              Close
            </a>
          </div>
          <div className="cover-layer" />
        </div>{" "}
        {/* .cd-schedule */}
      </div>

      {/* OLD CODE BELOW */}

      <div className="new_schedule_flex">
        <section className="new_sub_container">
          <div className="new_schedules_container">
            <DayOfWeekList
              day="Sunday"
              eventList={schedEvents.filter(
                (eventObj) => eventObj.day === "Sunday" && scheduleName === eventObj.scheduleName
              )}
            />
            <DayOfWeekList
              day="Monday"
              eventList={schedEvents.filter(
                (eventObj) => eventObj.day === "Monday" && scheduleName === eventObj.scheduleName
              )}
            />
            <DayOfWeekList
              day="Tuesday"
              eventList={schedEvents.filter(
                (eventObj) => eventObj.day === "Tuesday" && scheduleName === eventObj.scheduleName
              )}
            />
            <DayOfWeekList
              day="Wednesday"
              eventList={schedEvents.filter(
                (eventObj) => eventObj.day === "Wednesday" && scheduleName === eventObj.scheduleName
              )}
            />
            <DayOfWeekList
              day="Thursday"
              eventList={schedEvents.filter(
                (eventObj) => eventObj.day === "Thursday" && scheduleName === eventObj.scheduleName
              )}
            />
            <DayOfWeekList
              day="Friday"
              eventList={schedEvents.filter(
                (eventObj) => eventObj.day === "Friday" && scheduleName === eventObj.scheduleName
              )}
            />
            <DayOfWeekList
              day="Saturday"
              eventList={schedEvents.filter(
                (eventObj) => eventObj.day === "Saturday" && scheduleName === eventObj.scheduleName
              )}
            />
          </div>
        </section>
        <section className="new_sub_container">
          <button type="button" className="add_button">
            Date Created: {props.date}
          </button>
        </section>
      </div>
    </div>
  );
};

export default ExistingSchedule;
