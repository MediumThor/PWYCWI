import React, { useEffect, useState } from 'react';
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
    top: 170px;
    border: 0;
  }
  
  .desktop-view {
    width: 80%;
    height: 55%;
  }

  .mobile-view {
    width: 90%;
    height: 70%;
  }
`;

function GoogleCalendar() {
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <CalendarWrapper>
      {windowWidth <= 600 ? (
        <iframe
          className="mobile-view"
          src="https://calendar.google.com/calendar/embed?src=c_bd0e45eb9b14f51c50b76b7c5b558babd421df0d95e908270c88c6f891f1e5e4%40group.calendar.google.com&ctz=America%2FChicago&mode=AGENDA"
          frameborder="0"
          scrolling="no"
          title="Google Calendar mobile"
        />
      ) : (
        <iframe
          className="desktop-view"
          src="https://calendar.google.com/calendar/embed?src=c_bd0e45eb9b14f51c50b76b7c5b558babd421df0d95e908270c88c6f891f1e5e4%40group.calendar.google.com&ctz=America%2FChicago"
          frameborder="0"
          scrolling="no"
          title="Google Calendar desktop"
        />
      )}
    </CalendarWrapper>
  );
}

export default GoogleCalendar;
