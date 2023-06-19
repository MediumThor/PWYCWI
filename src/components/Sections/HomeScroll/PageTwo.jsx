import React, { useState, useEffect, useRef } from 'react';
import "src/styles/Home.module.scss";
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss'
import { Parallax, Background } from "react-parallax";
import { Link } from 'react-scroll';
import SmallButton from "src/components/CustomButtons/SmallButton.js";
import Modal from 'react-modal'; // import the react-modal package
import HistoryModal from '../../Modals/HistoryModal';
import EventsModal from '../../Modals/EventsModal';
import MembershipModal from '../../Modals/MembershipModal';
import SignupModal from '../../Modals/SignupModal';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import HistoryDialog from '../../Dialog/History';
import MembershipDialog from '../../Dialog/Membership';

const Section1Styled = styled.div`
  width: 100%;
  background-color: #ffffff;
`;

const BackgroundBox = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
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


   @media (max-width: 600px) {
    height: 200px;  // 50% of the original height
      left: 5%;

  }

   @media (max-width: 500px) {
    height: 150px;  // 50% of the original height
    font-size: 1.3em;
    left: 10%;
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
    top: 45%;
    font-size: .6em;
  }
  @media (max-width: 400px) {
    height: 80px;  // 50% of the original height
    top: 35%;
    left: 10%;
    font-size: .6em;
  }
`;

const Caption = styled.h2`
  position: absolute;
  max-width: 500px;
  top: 30%;
  left: 20%;
  font-size: .5em;
  color: #FAF9F6;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
    line-height: 2; // This will apply double spacing

    
     @media (max-width: 940px) {
    height: 200px;  // Adjust as needed
    top: 28%;  // Adjust as needed
  }

  

     @media (max-width: 740px) {
    height: 200px;  // Adjust as needed
    top: 40%;  // Adjust as needed

  }
   @media (max-width: 630px) {
      max-width: 80%;

    height: 200px;  // Adjust as needed
    top: 40%;  // Adjust as needed
      left: 10%;
      font-size: .4em;  

  }
  @media (max-width: 400px) {
    height: 80px;  // Adjust as needed
    top: 45%;  // Adjust as needed
    left: 10%;
    font-size: .3em;  // Adjust as needed
  }
`;

const Logo = styled.img`
display:none;
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
  top: 65%;  
  left: 35%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row; 
  justify-content: center; 
  gap: 1.5em;
      z-index: +1;  // this line is added




   @media (max-width: 940px) {
    flex-direction: row;
    justify-content: center;
    top: 55%;
      left: 50%;

  }

  @media (max-width: 740px) {
    flex-direction: column;
    justify-content: center;
        top: 30%;
      left: 70%;
      gap: .1em;


  }

    @media (max-width: 520px) {
      flex-direction: row;
    gap: .1em;
    top: 65%;
      left: 50%;

    
  }
  @media (max-width: 400px) {
    flex-direction: column;  // make buttons display in a column
    align-items: center;  // center buttons vertically
    grid-template-columns: repeat(2, 1fr);  // create 2 equal width columns
    display: column; // switch to grid display
    top: 30%;
    gap: .2em;
      left: 78%;

  }
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
    height: 70px;
    width: 120px;
  }
   @media (max-width: 640px) {
    font-size: 1rem; // decrease font size
    padding: 5px 25px; // decrease padding
    
  }
`;

const StyledText = styled.p`
  text-align: center;
    color: black;

`;
const StyledLink = styled.a`
  color: #0000EE;
  text-decoration: underline;
`;

const StyledTextBody = styled.p`
  text-align: center;
    color: black;
    margin-bottom: 20%;

`;

const PageTwo = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const [membershipOpen, setMembershipOpen] = useState(false);

  const [scroll, setScroll] = useState('paper');
  const descriptionElementRef = useRef(null);
  const [historyOpen, setHistoryOpen] = useState(false);


  const handleHistoryDialogOpen = () => {
    setHistoryOpen(true);
  };

  useEffect(() => {
    if (historyOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [historyOpen]);

  const handleHistoryClose = () => {
    setHistoryOpen(false);
  };




  const handleMembershipDialogOpen = () => {
    setMembershipOpen(true);
  };

  useEffect(() => {
    if (membershipOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [membershipOpen]);

  const handleMembershipClose = () => {
    setMembershipOpen(false);
  };




  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };



  const handleSignupOpen = () => {
    setIsSignupModalOpen(true);
  };

  const handleSignupClose = () => {
    setIsSignupModalOpen(false);
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


  return (
    <Section1Styled id="sectionHome">
      <main className={styles.main}>
        <BackgroundBox>
          <Parallax
            blur={{ min: -15, max: 15 }}
            strength={200}
            bgImage="https://cdn.discordapp.com/attachments/1090123749300379740/1115435438077915166/karisma3.jpeg"
            bgImageAlt="Background"
          >
            <Logo src="https://cdn.discordapp.com/attachments/1090123749300379740/1108611479416098817/PWYC_LOGO2.png" alt="Logo" />
            <Title>Become A Member<br />of PWYC</Title>
            <Caption>Embrace the thrill of sailing and boating while enjoying exclusive member benefits like access to special events, networking opportunities, and a community of like-minded enthusiasts.</Caption>
            <ButtonContainer>




              <StyledButton onClick={handleMembershipDialogOpen} style={{ color: '#87faa8' }}>Become a Member</StyledButton>
              <MembershipDialog open={membershipOpen} onClose={handleMembershipClose} scroll="paper" />

              <StyledButton onClick={handleHistoryDialogOpen} >Club History</StyledButton>
              <HistoryDialog open={historyOpen} onClose={handleHistoryClose} scroll="paper" />


              <StyledButton onClick={handleSignupOpen}>Sign Up</StyledButton>



            </ButtonContainer>
            <SignupModal isOpen={isSignupModalOpen} onRequestClose={handleSignupClose} />
            <EventsModal isOpen={isEventsModalOpen} onRequestClose={handleEventsClose} />
            <MembershipModal isOpen={isMemberModalOpen} onRequestClose={handleMemberClose} />
            <HistoryModal isOpen={isHistoryModalOpen} onRequestClose={handleHistoryClose} />
            <div style={{ height: '100vh' }} />
          </Parallax>
        </BackgroundBox>
      </main>
    </Section1Styled >
  );
};

export default PageTwo;
