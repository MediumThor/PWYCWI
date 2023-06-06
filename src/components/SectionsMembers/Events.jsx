import React, { useState } from 'react'
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss'

import "src/styles/styles.module.scss";
import GoogleCalendar from '../GoogleCal.js';


const Section2Styled = styled.div`background-color: #000000;
`;

const StyledGoogleCalendar = styled(GoogleCalendar)`
  width: 100%;
  height: 500px; // change this to your desired height

  @media (max-width: 600px) {
    width: 90%;
    height: 600px; // adjust this to your desired mobile height
  }
`;

export default function Section2() {
  const [isHide, setHide] = useState(false);
  const toggle = () => setHide(state => !state);

  return (
    <Section2Styled id="section2">
      <main className={styles.main3}>
        <Wrapper>
          <CalendarTitle>Club Events</CalendarTitle>
          <StyledGoogleCalendar />
        </Wrapper>
      </main>
    </Section2Styled >
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CalendarTitle = styled.h2`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em;
  font-weight: bold;
  padding: 5px;
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  @media (max-width: 600px) {
    top: 20%  }
  @media (max-width: 400px) {
    font-size: 1.5em;
    top: 30%  }
`;