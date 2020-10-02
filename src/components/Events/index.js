import React from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import colors from '../../constants/RTCColors';
import GoogleCalendar from '../General/GoogleCalendar';


function Events() {
  const calendarId = "rewritingthecode.org_kfhaeluivti168r0cbn5hj40qs@group.calendar.google.com"; // RTC general calendar

  return (
    <div className="column">
      <ViewWithTopBorder color = {colors.green}>
      <section>
        <Heading>Calendar</Heading>
      </section>
      <GoogleCalendar eventsColor = {colors.lightGreen} calendarId = {calendarId}></GoogleCalendar>
      </ViewWithTopBorder>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Events);
