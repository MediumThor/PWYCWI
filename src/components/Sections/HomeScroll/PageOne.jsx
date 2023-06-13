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
import SailingModal from '../../Modals/SailingModal';
import { Alert, AlertTitle } from '@mui/material';


export default function PageOne() {

  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
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
            bgImage="https://cdn.discordapp.com/attachments/1090123749300379740/1115461216152850432/GPTempDownload_2.JPG"
            bgImageAlt="Background"
            bgImageStyle={{ backgroundSize: 'cover' }}
          >
            <Logo src="https://cdn.discordapp.com/attachments/1090123749300379740/1108611479416098817/PWYC_LOGO2.png" alt="Logo" />
            {showAlert && (
              <StyledAlert onClose={handleCloseAlert} severity="info">
                <AlertTitle>Info</AlertTitle>
                This is an info alert- We can add notifications here if we want,  — <strong>Like THIS :) (Please let me know what we would like here.('ll add as needed too)'))</strong>
              </StyledAlert>
            )}
            {showSecondAlert && (
              <StyledAlert onClose={handleCloseSecondAlert} severity="warning" style={{ top: '38%' }}>
                <AlertTitle>Warning</AlertTitle>
                <strong>Please dont use the sign-up form. It will send me abunch of garble.</strong>
                This site is still in beta. Please send any major issues or requests to the support link under the contact tab.
                (I know the Public Events tab is a mess) (if Anyone who has access has any ideas about how these 4 tabs on this page could be better organized, let me know.)
              </StyledAlert>
            )}

            {showThirdAlert && (
              <StyledAlert onClose={handleCloseThirdAlert} severity="success" style={{ top: '25%' }}>
                <AlertTitle>UPDATE!</AlertTitle>
                Alot has been added- Race Info has been updated. We have video. NOR, SI, Course and Registration added.
              </StyledAlert>
            )}





            <Title>Port Washington<br />Yacht Club</Title>
            <Location>Port Washington,WI</Location>
            <ButtonContainer>

              <StyledButton onClick={handleMemberOpen}>Become a Member</StyledButton> {/* New Button */}
              <StyledButton onClick={handleNewsOpen}>Useful Links</StyledButton> {/* New Button */}
              <StyledButton onClick={handleSailingOpen}>Race Info</StyledButton> {/* New Button */}
            </ButtonContainer>
            <NewsModal isOpen={isNewsModalOpen} onRequestClose={handleNewsClose} />
            <EventsModal isOpen={isEventsModalOpen} onRequestClose={handleEventsClose} />
            <MembershipModal isOpen={isMemberModalOpen} onRequestClose={handleMemberClose} />
            <SailingModal isOpen={isSailingModalOpen} onRequestClose={handleSailingClose} />
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
    font-size: .8em;
    left: 8%;

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
  color: #E8E3D5;
  padding: 10px 20px;
  cursor: pointer;
  height: 80px;
    width: 170px;
      transition: all 0.3s ease-in-out;  // Add transition for smooth hover effect


  &:hover {
    color: #996515;
    border-color: #87CEFA;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
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
  left: 50%; /* Center it on the screen (remaining width divided by two) */
  top: 10%; /* Move it down a bit */
  height: auto; /* Make it adjust to the content */
`;


