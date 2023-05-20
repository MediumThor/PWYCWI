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


const Section1Styled = styled.div`
  width:100%;
  margin-top: 100px;
  background-color: black;
`;

const BackgroundBox = styled.div`
  position: relative;
  width: 100%;
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
  top: 80%;  // Adjust as needed to set the vertical position of the buttons
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row; // make buttons display in a row
  justify-content: center; // center buttons horizontally
  gap: .5em;

  @media (max-width: 600px) {
    flex-direction: row;
    justify-content: center;
    top: 80%;
  }
`;

const StyledButton = styled.button`
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

  @media (max-width: 600px) {
    font-size: 1rem; // decrease font size
    padding: 8px 16px; // decrease padding
    margin: 0 .5em;
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
            bgImage="https://cdn.discordapp.com/attachments/1090123749300379740/1108559911656357990/IMG_3286.jpg"
            bgImageAlt="Background"
            bgImageStyle={{ height: '100%', width: '100%' }}
          >

            <Title>Port Washington<br />Yacht Club</Title>
            <Logo src="https://cdn.discordapp.com/attachments/1090123749300379740/1108611479416098817/PWYC_LOGO2.png" alt="Logo" />
            <ButtonContainer>
              <StyledButton onClick={handleNewsOpen}>Club News</StyledButton>
              <StyledButton onClick={handleEventsOpen}>Upcoming Events</StyledButton>
              <StyledButton onClick={handleMemberOpen}>Become a Member</StyledButton> {/* New Button */}
              <StyledButton onClick={handleHistoryOpen}>Club History</StyledButton> {/* New Button */}
            </ButtonContainer>
            <Modal
              isOpen={isNewsModalOpen}
              onRequestClose={handleNewsClose}
              contentLabel="News Modal"
              style={{
                overlay: {
                  backgroundColor: 'transparent'
                },
                content: {
                  width: '80%',
                  height: '60%',
                  margin: 'auto',
                  overflowX: 'hidden',
                  padding: '5%',
                  boxShadow: '10px 10px 25px rgba(0, 0, 0, 0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  '@media (max-width: 600px)': {
                    width: '90%',
                  }
                }
              }}
            >
              <ModalTitle style={{ textAlign: 'center', borderBottom: '1px solid gray' }}>Club News</ModalTitle>
              {/* Insert Club News content here */}
              <div style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)' }}>
                <button onClick={handleNewsClose}>Close</button>
              </div>
            </Modal>
            <Modal
              isOpen={isEventsModalOpen}
              onRequestClose={handleEventsClose}
              contentLabel="Events Modal"
              style={{
                overlay: {
                  backgroundColor: 'transparent'
                },
                content: {
                  width: '80%',
                  height: '60%',
                  margin: 'auto',
                  overflowX: 'hidden',
                  padding: '5%',
                  boxShadow: '10px 10px 25px rgba(0, 0, 0, 0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  '@media (max-width: 600px)': {
                    width: '90%',
                  }
                }
              }}
            >
              <ModalTitle style={{ textAlign: 'center', borderBottom: '1px solid gray' }}>Upcoming Events</ModalTitle>
              {/* Insert Upcoming Events content here */}
              <div style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)' }}>
                <button onClick={handleEventsClose}>Close</button>
              </div>
            </Modal>
            <Modal
              isOpen={isMemberModalOpen}
              onRequestClose={handleMemberClose}
              contentLabel="Member Modal"
              style={{
                overlay: {
                  backgroundColor: 'transparent'
                },
                content: {
                  width: '80%',
                  height: '60%',
                  margin: 'auto',
                  overflowX: 'hidden',
                  padding: '5%',
                  boxShadow: '10px 10px 25px rgba(0, 0, 0, 0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  '@media (max-width: 600px)': {
                    width: '90%',
                  }
                }
              }}
            >
              <ModalTitle style={{ textAlign: 'center', borderBottom: '1px solid gray' }}>Become A Member</ModalTitle>
              {/* Insert Membership Details content here */}
              <div style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)' }}>
                <button onClick={handleMemberClose}>Close</button>
              </div>
            </Modal>
            <Modal
              isOpen={isHistoryModalOpen}
              onRequestClose={handleHistoryClose}
              contentLabel="Club History Modal"
              style={{
                overlay: {
                  backgroundColor: 'transparent'
                },
                content: {
                  width: '80%',
                  height: '60%',
                  margin: 'auto',
                  overflowX: 'hidden',
                  padding: '5%',
                  boxShadow: '10px 10px 25px rgba(0, 0, 0, 0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  '@media (max-width: 600px)': {
                    width: '90%',
                  }
                }
              }}
            >
              <ModalTitle style={{ textAlign: 'center', borderBottom: '1px solid gray' }}>Club History</ModalTitle>
              {/* Insert Club History content here */}
              <div style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)' }}>
                <button onClick={handleHistoryClose}>Close</button>
              </div>
            </Modal>
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
