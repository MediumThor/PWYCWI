import React, { useEffect } from 'react'
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss'



export default function Section2() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://public.tockify.com/browser/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [])

  return (
    <Section2Styled id="section2">
      <main className={styles.main3}>
        <Wrapper>
          <CalendarWrapper>
            <div data-tockify-component="calendar" data-tockify-calendar="pwycofficialevents"></div>
          </CalendarWrapper>
        </Wrapper>
      </main>
    </Section2Styled >
  );
}

const Section2Styled = styled.div`
  background: linear-gradient( #171615, #2e2d2a);
padding-top: 90px;
padding-bottom: 40px;
 @media (max-width: 600px) {
  padding-top: 90px;
     }
`;

const CalendarWrapper = styled.div`
  width: 90vw;
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 20px; // Added border-radius
  border: 0px solid white;

`;

const Wrapper = styled.div`
  min-height: 80vh;
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
