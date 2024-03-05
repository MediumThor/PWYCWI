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
        <StyledButton
  as="a"
  href="https://calendar.google.com/calendar/u/0?cid=c_bd0e45eb9b14f51c50b76b7c5b558babd421df0d95e908270c88c6f891f1e5e4%40group.calendar.google.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Add Calendar to Google
</StyledButton>
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
  max-width: 1100px;
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

const StyledButton = styled.a`
  display: inline-block; // Ensures proper spacing and alignment
  text-decoration: none; // Removes the underline from the link
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6);
  z-index: 2;
  font-size: 1.2rem;
  border-radius: 5px;
  border: 2px solid #FAF9F6;
  background-color: rgb(0,0,0,0.7);
  color: #E8E3D5;
  padding: 10px 20px;
  cursor: pointer;
  height: 80px;
  width: 170px;
  transition: all 0.3s ease-in-out;
  text-align: center; // Centers the text in the button
  line-height: 30px; // Adjusts the line height to vertically center the text, adjust as needed
  margin-bottm: 30px;

  &:hover {
    color: #996515;
    border-color: #87CEFA;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8);
    background-color: rgb(0,0,0,0.9);
  }

  @media (max-width: 700px) {
    font-size: 1rem; // decrease font size
    padding: 8px 16px; // decrease padding
    margin: 0.5em;
    height: 60px; // decrease height
    width: 140px; // decrease width
    line-height: 40px; // adjust line height for smaller screens
  }

  @media (max-width: 500px) {
    font-size: 0.9rem; // further decrease font size
    padding: 6px 10px; // further decrease padding
    height: 60px; // further decrease height
    width: 120px; // further decrease width
    line-height: 25px; // adjust line height for very small screens
  }
`;