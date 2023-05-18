import React, { useState } from 'react'
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss'

import "src/styles/styles.module.scss";
import GoogleCalendar from '../GoogleCal.js';


const Section2Styled = styled.div`background-color: #000000;`;

const CalendarTitle = styled.h2`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em;
  font-weight: bold;
  padding: 5px;
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

export default function Section2() {
  const [isHide, setHide] = useState(false);
  const toggle = () => setHide(state => !state);

  return (
    <Section2Styled id="section2">
      <main className={styles.main3}>
        <Wrapper>


          <CalendarTitle>Club Events</CalendarTitle>
          <GoogleCalendar />

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
