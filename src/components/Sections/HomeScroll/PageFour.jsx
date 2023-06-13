import React from 'react';
import "src/styles/Home.module.scss";
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss'
import { Parallax, Background } from "react-parallax";
import { useState, useEffect } from 'react'
import { ethers, BigNumber } from "ethers"
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Goerli } from '@usedapp/core'
import { Link } from 'react-scroll';
import SmallButton from "src/components/CustomButtons/SmallButton.js";
import { Events } from '../Events';
import Modal from 'react-modal'; // import the react-modal package
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
  height: 100vh;
  font-size: 40px;
  color: #22C984;

  
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

const ModalTitle = styled.h2`

margin-top: -40px;
 @media (max-width: 600px) {
    margin-top: -20px;
  }
`;



const FlexContainer = styled.div`
 position: absolute;
  top: 20%;
  left: 60%;
  display: flex;
  justify-content: start;
  align-items: center;
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
  gap: 1.5em;

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


const StyledButton = styled.button`
    // add this line to set a fixed height
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.3);
  z-index: 2;
  font-size: 1.4rem;
  border-radius: 10px;
  border: 2px solid #FAF9F6;
  background-color: rgb(232,227,213, 0.7);
  color: black;
  padding: 10px 20px;
  cursor: pointer;
  height: 80px;
    width: 170px;
      transition: all 0.3s ease-in-out;  // Add transition for smooth hover effect


  &:hover {
    color: #996515;
    border-color: #87CEFA;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
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



export default function PageFour() {

  const [isSubmitTimeModalOpen, setIsSubmitTimeModalOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [isRaceResultsModalOpen, setIsRaceResultsModalOpen] = useState(false);
  const [isSailingModalOpen, setIsSailingModalOpen] = useState(false);

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
              <StyledButton onClick={handleEventsOpen}>Upcoming Events</StyledButton>
              <StyledButton onClick={handleSailingOpen}>Sailing Info</StyledButton> {/* New Button */}
              <StyledButton onClick={handleRaceResultsOpen}>Race Results</StyledButton> {/* New Button */}
              {/**  <StyledButton onClick={handleSubmitTimeOpen}>Submit Time</StyledButton> */}

            </ButtonContainer>
            <SubmitTimeModal isOpen={isSubmitTimeModalOpen} onRequestClose={handleSubmitTimeClose} />
            <EventsModal isOpen={isEventsModalOpen} onRequestClose={handleEventsClose} />
            <RaceResultsModal isOpen={isRaceResultsModalOpen} onRequestClose={handleRaceResultsClose} />
            <SailingModal isOpen={isSailingModalOpen} onRequestClose={handleSailingClose} />
            <div style={{ height: '100vh' }} />
          </Parallax>
        </BackgroundBox>
        {/**<div className={styles.grid3}>

          <SmallButton color="transparent"
          >
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
              <h2>Stake</h2>
              <p>

              </p>
            </Link>
          </SmallButton>
        </div> */}

      </main>
    </Section1Styled >
  );
}
