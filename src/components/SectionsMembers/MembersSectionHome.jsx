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
import HistoryModal from '../Modals/HistoryModal';
import MembershipModal from '../Modals/MembershipModal';
import EventsModal from '../Modals/EventsModal';
import NewsModal from '../Modals/NewsModal';

const Section1Styled = styled.div`
  width:100%;
  margin-top: 30px;
  background-color: #ffffff;
`;

const BackgroundBox = styled.div`
margin-top: 20px;
  position: relative;
  width: 100vw;
  height: 100vh;
  font-size: 40px;
  color: #22C984;

  
`;

const Title = styled.h1`
  position: absolute;
  top: 10%;
  left: 10%;
  font-size: 1.7em;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
   @media (max-width: 600px) {
    height: 200px;  // 50% of the original height
    top: 5%;
  }
  @media (max-width: 400px) {
    height: 100px;  // 50% of the original height
    top: 5%;
    font-size: 1.0em;
  }
`;

const Location = styled.h1`
  position: absolute;
  top: 45%;
  left: 15%;
  font-size: .7em;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
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
  position: absolute;
  top: 15%;  
  left: 60%;  
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
  top: 85%;  
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row; 
  justify-content: center; 
  gap: .5em;

  @media (max-width: 600px) {
    flex-direction: row;
    justify-content: center;
    top: 80%;
  }

    @media (max-width: 500px) {
    gap: .1em;

    
  }
  @media (max-width: 400px) {
    flex-direction: column;  // make buttons display in a column
    align-items: center;  // center buttons vertically
    grid-template-columns: repeat(2, 1fr);  // create 2 equal width columns
    display: grid; // switch to grid display
    gap: .2em;
    top: 65%; 
    
  }
`;

const StyledButton = styled.button`
    // add this line to set a fixed height
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.3);
  z-index: 2;
  font-size: 1.4rem;
  border-radius: 10px;
  border: 2px solid white;
  background-color: #000000;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  height: 80px;
    width: 170px;

  &:hover {
    color: #996515;
    border-color: #87CEFA;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 600px) {
    font-size: 1rem; // decrease font size
    padding: 8px 16px; // decrease padding
    margin: 0.5em;
  }
   @media (max-width: 400px) {
    font-size: .7rem; // decrease font size
    padding: 5px 25px; // decrease padding
    height: 50px;
    width: 100px;
  }
`;

const CloseButton = styled.button`
    // add this line to set a fixed height
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.3);
  z-index: 2;
  font-size: 1.4rem;
  border-radius: 5px;
  border: 2px solid white;
  background-color: #000000;
  color: white;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    color: #996515;
    border-color: #87CEFA;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  }

`;




export default function SectionHome() {

  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleNewsOpen = () => {
    setIsNewsModalOpen(true);
  };

  const handleNewsClose = () => {
    setIsNewsModalOpen(false);
  };

  const handleEventsOpen = () => {
    setIsEventsModalOpen(true);
  };

  const handleEventsClose = () => {
    setIsEventsModalOpen(false);
  };

  const handleMemberOpen = () => {
    setIsMemberModalOpen(true);
  };

  const handleMemberClose = () => {
    setIsMemberModalOpen(false);
  };

  const handleHistoryOpen = () => {
    setIsHistoryModalOpen(true);
  };

  const handleHistoryClose = () => {
    setIsHistoryModalOpen(false);
  };



  return (
    <Section1Styled id="sectionHome">
      <main className={styles.main}>
        <BackgroundBox>
          <Parallax
            blur={{ min: -20, max: 20 }}
            strength={400}
            bgImage="https://cdn.discordapp.com/attachments/1090123749300379740/1114320042142740601/BackPorch3.jpg"
            bgImageAlt="Background"
          >
            <Logo src="https://cdn.discordapp.com/attachments/1090123749300379740/1108611479416098817/PWYC_LOGO2.png" alt="Logo" />

            <Title>Port Washington<br />Yacht Club Members <br /> Section</Title>
            <ButtonContainer>
              <StyledButton onClick={handleNewsOpen}>Club News</StyledButton>
              <StyledButton onClick={handleEventsOpen}>Upcoming Events</StyledButton>
              <StyledButton onClick={handleMemberOpen}>Become a Member</StyledButton> {/* New Button */}
              <StyledButton onClick={handleHistoryOpen}>Club History</StyledButton> {/* New Button */}
              <StyledButton onClick={handleHistoryOpen}>Useful Links</StyledButton> {/* New Button */}
              <StyledButton onClick={handleHistoryOpen}>Race Info</StyledButton> {/* New Button */}
            </ButtonContainer>
            <NewsModal isOpen={isNewsModalOpen} onRequestClose={handleNewsClose} />
            <EventsModal isOpen={isEventsModalOpen} onRequestClose={handleEventsClose} />
            <MembershipModal isOpen={isMemberModalOpen} onRequestClose={handleMemberClose} />
            <HistoryModal isOpen={isHistoryModalOpen} onRequestClose={handleHistoryClose} />
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
