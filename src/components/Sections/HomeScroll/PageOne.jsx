import React from 'react';
import "src/styles/Home.module.scss";
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss';
import { Parallax, Background } from "react-parallax";
import { useState, useEffect } from 'react'
import { ethers, BigNumber } from "ethers"
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Goerli } from '@usedapp/core'
import { Link } from 'react-scroll';
import SmallButton from "src/components/CustomButtons/SmallButton.js";
import { Events } from '../Events';
import Modal from 'react-modal'; // import the react-modal package
import HistoryModal from '../../Modals/HistoryModal';
import NewsModal from '../../Modals/NewsModal';
import EventsModal from '../../Modals/EventsModal';
import MembershipModal from '../../Modals/MembershipModal';



export default function PageOne() {

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
            blur={{ min: -15, max: 15 }}
            strength={200}
            bgImage="https://cdn.discordapp.com/attachments/1090123749300379740/1115461216152850432/GPTempDownload_2.JPG"
            bgImageAlt="Background"
            bgImageStyle={{ backgroundSize: 'cover' }}
          >
            <Logo src="https://cdn.discordapp.com/attachments/1090123749300379740/1108611479416098817/PWYC_LOGO2.png" alt="Logo" />

            <Title>Port Washington<br />Yacht Club</Title>
            <Location>Port Washington,WI</Location>
            <ButtonContainer>

              <StyledButton onClick={handleMemberOpen}>Become a Member</StyledButton> {/* New Button */}
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


      </main>
    </Section1Styled >
  );
}


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
    font-size: 1.0em;
  }
`;

const Location = styled.h1`
  position: absolute;
  top: 30%;
  left: 15%;
  font-size: .7em;
  font-weight: bold;
  color: #FAF9F6;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);


   @media (max-width: 600px) {
    height: 200px;  // 50% of the original height
    top: 40%;
  }
  @media (max-width: 400px) {
    height: 80px;  // 50% of the original height
    top: 25%;
    left: 10%;
    font-size: .7em;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 10%;  
  left: 65%;  
  height: 320px; 
  width: auto;

   @media (max-width: 1000px) {
    display: none;
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
  top: 65%;  
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row; 
  justify-content: center; 
  gap: 1.5em;

    @media (max-width: 940px) {
    top: 55%; 
  }

  @media (max-width: 700px) {
    flex-direction: row;
    justify-content: center;
    gap: .1em;
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
    top: 55%; 
    
  }
`;

const StyledButton = styled.button`
    // add this line to set a fixed height
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.3);
  z-index: 2;
  font-size: 1.4rem;
  border-radius: 10px;
  border: 2px solid #FAF9F6;
  background-color: rgb(0,0,0,0.7);
  color: white;
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



