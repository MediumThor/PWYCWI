import React from 'react';
import "src/styles/Home.module.scss";
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss'
import { Parallax, Background } from "react-parallax";
import { useState, useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Alert, AlertTitle } from '@mui/material';


import HistoryModal from '../../Modals/HistoryModal';
import SubmitTimeModal from '../../Modals/SubmitTimeModal';
import EventsModal from '../../Modals/EventsModal';
import SailingModal from '../../Modals/SailingModal';
import RaceResultsModal from '../../Modals/RaceResultsModal';


const Section1Styled = styled.div`

  width:100%;
  background-color: #ffffff;
`;


const BackgroundBox = styled.div`
  position: relative;
  width: 100vw;
  height: 670px;
  font-size: 40px;
  color: #22C984;

  ::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: inset -100px -90px 60px rgba(0, 0, 0, .6),
inset 100px 40px 90px rgba(0, 0, 0, .6);
  }
`;


const Title = styled.h1`
  position: absolute;
  top: 0%;
  left: 10%;
  font-size: 1.7em;
  font-weight: bold;
  color: #E8E3D5;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);

   @media (max-width: 500px) {
    height: 150px;  // 50% of the original height
    font-size: 1.3em;
  }

   @media (max-width: 600px) {
    height: 200px;  // 50% of the original height
      left: 5%;

  }
  @media (max-width: 400px) {
    height: 100px;  // 50% of the original height
    font-size: 0.9em;
    left: 8%;
  }
`;

const Location = styled.h1`
  position: absolute;
  top: 30%;
  left: 15%;
  font-size: .7em;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
   @media (max-width: 600px) {
    height: 200px;  // 50% of the original height
    top: 45%;
  }
  @media (max-width: 400px) {
    height: 80px;  // 50% of the original height
    top: 45%;
    left: 10%;
    font-size: .7em;
  }
`;

const Logo = styled.img`
display: none;
  position: absolute;
  top: 10%;  
  left: 65%;  
  height: 320px; 
  width: auto;
  

  @media (max-width: 600px) {
    height: 200px;  // 50% of the original height
    top: 45%;
  }
   @media (max-width: 400px) {
    height: 150px;  // 50% of the original height
    top: 27%;
    left: 45%;  
  }
`;





const ButtonContainer = styled.div`
  position: absolute;
  top: 30%;  
  left: 75%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(2, 1fr);  // create 2 equal width columns
  grid-template-rows: repeat(2, 1fr);     // create 2 equal height rows
  justify-items: center;  // center items horizontally
  align-items: center;    // center items vertically
  gap: 1.2em;
      z-index: +1;  // this line is added


   @media (max-width: 1200px) {
  grid-template-rows: repeat(1, 3fr);     // create 2 equal height rows
  grid-template-columns: repeat(3, 1fr);  // create 2 equal width columns

    top: 45%;
      left: 50%;

  }

    @media (max-width: 940px) {
    flex-direction: row;
    justify-content: center;
    top: 55%;
      left: 50%;

  }

  @media (max-width: 700px) {
    top: 50%;
          left: 50%;
            grid-template-columns: repeat(2, 1fr);  // create 2 equal width columns
gap: .1em;

  }

  @media (max-width: 500px) {
        top: %;
    gap: .1em;
  }

  @media (max-width: 400px) {
    gap: .2em;
      left: 50%;

  }
`;


const NavContainer = styled.div`
  position: relative;
margin-top: -100px;  
left: %;
 



`;


const StyledButton = styled.button`
    box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.6);
  z-index: 2;
  font-size: 1.4rem;
  border-radius: 5px;
  border: 2px solid #FAF9F6;
  background-color: rgb(0,0,0,0.7);
  color: #E8E3D5;
  padding: 10px 20px;
  cursor: pointer;
  height: 80px;
    width: 170px;
      transition: all 0.3s ease-in-out;  // Add transition for smooth hover effect


  &:hover {
    color: #996515;
    border-color: #87CEFA;
    box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.8);
      background-color: rgb(0,0,0,0.9);
  }
  @media (max-width: 700px) {
    font-size: 1rem; // decrease font size
    padding: 8px 16px; // decrease padding
    margin: 0.5em;
  }
   @media (max-width: 640px) {
    font-size: .7rem; // decrease font size
    padding: 5px 25px; // decrease padding
    height: 50px;
    width: 100px;
  }
`;

const StyledAlert = styled(Alert)`
  position: absolute;
    width: 40% !important; /* Make it 60% of the frame */
  left: 10%; /* Center it on the screen (remaining width divided by two) */
  top: 10%; /* Move it down a bit */
  height: auto; /* Make it adjust to the content */
        z-index: +1;  // this line is added

`;



export default function PageFour() {

  const [isSubmitTimeModalOpen, setIsSubmitTimeModalOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [isRaceResultsModalOpen, setIsRaceResultsModalOpen] = useState(false);
  const [isSailingModalOpen, setIsSailingModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [showSecondAlert, setShowSecondAlert] = useState(true);
  const [showThirdAlert, setShowThirdAlert] = useState(true);


  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseSecondAlert = () => {
    setShowSecondAlert(false);
  };

  const handleCloseThirdAlert = () => {
    setShowThirdAlert(false);
  };


  const handleSubmitTimeOpen = () => {
    setIsSubmitTimeModalOpen(true);
  };

  const handleSubmitTimeClose = () => {
    setIsSubmitTimeModalOpen(false);
  };

  const handleEventsOpen = () => {
    setIsEventsModalOpen(true);
  };

  const handleEventsClose = () => {
    setIsEventsModalOpen(false);
  };

  const handleRaceResultsOpen = () => {
    setIsRaceResultsModalOpen(true);
  };

  const handleRaceResultsClose = () => {
    setIsRaceResultsModalOpen(false);
  };

  const handleSailingOpen = () => {
    setIsSailingModalOpen(true);
  };

  const handleSailingClose = () => {
    setIsSailingModalOpen(false);
  };

  const notify = () => toast(<div style={{ color: 'Black', fontSize: '30px' }}>Queens Cup <a href="https://www.ssyc.org/queen-s-cup-race" target="_blank" rel="noopener noreferrer">Link</a></div>, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });



  const notify2 = () => toast(<div style={{ color: 'Black', fontSize: '30px' }}>Click <a href="https://www.ussailing.org/competition/rules-officiating/the-racing-rules-of-sailing-2021-2024/#the-rules" target="_blank" rel="noopener noreferrer">here </a>to get the rules App</div>, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  return (
    <Section1Styled id="sectionHome">

      <main className={styles.main}>
        <BackgroundBox>
          <Parallax
            blur={{ min: -15, max: 15 }}
            strength={200}
            bgImage="https://cdn.discordapp.com/attachments/1090123749300379740/1111079683149271110/image.png"
            bgImageAlt="Background"
            bgImageStyle={{ backgroundSize: 'cover' }}
          >

            <Logo src="https://cdn.discordapp.com/attachments/1090123749300379740/1108611479416098817/PWYC_LOGO2.png" alt="Logo" />

            <Title>PWYC<br />Sailing Info</Title>
            <ButtonContainer>
              <StyledButton onClick={notify}>Upcoming Events</StyledButton>
              {/**  <StyledButton onClick={handleEventsOpen}>Upcoming Events</StyledButton>*/}
              <StyledButton onClick={handleSailingOpen}>Sailing Info</StyledButton> {/* New Button */}
              <StyledButton onClick={handleRaceResultsOpen}>Race Results</StyledButton> {/* New Button */}
              <StyledButton onClick={notify2}>Rules</StyledButton>



              {/**  <StyledButton onClick={handleSubmitTimeOpen}>Submit Time</StyledButton> */}

            </ButtonContainer>

            {showAlert && (
              <StyledAlert onClose={handleCloseAlert} severity="info" style={{ top: '45%' }}>
                <AlertTitle>Update!</AlertTitle>
                Sections have been updated <strong>NOR and SI have been posted to Race Info</strong>
              </StyledAlert>
            )}


            <SubmitTimeModal isOpen={isSubmitTimeModalOpen} onRequestClose={handleSubmitTimeClose} />
            <EventsModal isOpen={isEventsModalOpen} onRequestClose={handleEventsClose} />
            <RaceResultsModal isOpen={isRaceResultsModalOpen} onRequestClose={handleRaceResultsClose} />
            <SailingModal isOpen={isSailingModalOpen} onRequestClose={handleSailingClose} />
            <div style={{ height: '100vh' }} />
          </Parallax>
        </BackgroundBox>


        {/** 
        <NavContainer>
          <div className={styles.grid3}>

            <SmallButton color="transparent">
              <Link to="section1" className={styles.smallcard3} spy={false} smooth={true} duration={1000}>
                <h2>Services </h2>

              </Link>
            </SmallButton>
            <SmallButton color="transparent"
            >
              <Link to="section2" className={styles.smallcard3} smooth={true} duration={1000}>
                <h2>Info </h2>
                <p> </p>
              </Link>
            </SmallButton>

            <SmallButton color="transparent"

            >
              <Link to="section3" className={styles.smallcard3} smooth={true} duration={1000}>
                <h2>Contact</h2>
                <p>  </p>
              </Link>
            </SmallButton>

            <SmallButton color="transparent"
              target="_blank"
            >
              <Link to="section3" className={styles.smallcard3} smooth={true} duration={1000}>
                <h2>Weather</h2>
                <p>

                </p>
              </Link>
            </SmallButton>
          </div>
        </NavContainer>*/}

      </main>
    </Section1Styled >
  );
}
