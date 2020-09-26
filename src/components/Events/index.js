import React, { useState, useEffect } from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import axios from 'axios';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import colors from '../../constants/RTCColors';


function Events() {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const calendarId = "rewritingthecode.org_kfhaeluivti168r0cbn5hj40qs@group.calendar.google.com";
  const [events, setEvents] = useState([]);
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    axios 
      .get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`,
      )
      .then((result) => {
        setEvents(result.data.items);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apiKey, calendarId]);

  // Formats events to suit React BigCalendar event objects
  const formattedEvents = events.map(obj => {
    return {
    title: obj.summary,
    start: new Date(obj.start.dateTime.slice(0, 19)),
    end: new Date(obj.end.dateTime.slice(0, 19)),
    allDay: false,
    resource: null,
  }});

  // Edit styling for events in Calendar
  function eventStyleCreator (event, start, end, isSelected) {
    var style = {
        backgroundColor: '#CADDD1', // Light green from Figma calendar
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        display: 'block'
    };
    return {
        style: style
    };
}

  return (
    <div>
      <ViewWithTopBorder color = {colors.green}>
      <section>
        <Heading>Calendar</Heading>
      </section>
      <div>
        <Calendar
          localizer = {localizer}
          events={formattedEvents}
          style={{height: 650}}
          eventPropGetter={eventStyleCreator}
        />
      </div>
      </ViewWithTopBorder>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Events);
