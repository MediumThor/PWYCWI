import React from 'react';
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 75%; /* for 4:3 aspect ratio */
  display: flex;
  justify-content: center;
  align-items: center;
  iframe {
    position: absolute;
    width: 80%;
    top: 170px;
    height: 55%;
    border: 0;
  }
`;

function GoogleCalendar() {
    return (
        <CalendarWrapper>
            <iframe
                src="https://calendar.google.com/calendar/embed?src=c_bd0e45eb9b14f51c50b76b7c5b558babd421df0d95e908270c88c6f891f1e5e4%40group.calendar.google.com&ctz=America%2FChicago"
                frameborder="0"
                scrolling="no"
                title="Google Calendar"
            />
        </CalendarWrapper>
    );
}

export default GoogleCalendar;
