import React from 'react';
import "src/styles/Home.module.scss";
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss'
import { Parallax, Background } from "react-parallax";
import { useState, useEffect } from 'react'

import { useRef } from 'react';

import MembershipDialog from '../Dialog/MembershipOnline.js';
import CrewSignup from './Components/CrewSignup';
import PrivatePartyDialog from '../Dialog/PrivatePartyOnline';

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row; // Use row direction to align buttons horizontally
  justify-content: center;
  gap: 0.5em;

  @media (max-width: 600px) {
    flex-direction: column; // Use column direction to stack buttons vertically on mobile
    width: 50%; // Set width to 50% on mobile to create two columns
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column; // Keep as column to stack rows vertically
  justify-content: center;
  gap: 1em;

  

  @media (max-width: 600px) {
    
    flex-direction: row; // Change to row direction on mobile to create two columns
    margin-top: -50%; // Adjust this value to move buttons up on medium-sized screens
  }

    @media (max-width: 800px) {
    top: 70%; // Move the buttons up slightly
  }

  @media (max-width: 400px) {
    gap: 0.2em;
top: 80%; // Move the buttons up slightly
    }

     @media screen and (orientation: landscape) and (max-width: 800px) {
        top: 50%; // Move the buttons up slightly

  }
`;





const Section1Styled = styled.div`
  width:100%;
  height:100%;
  margin-top: 30px;
  background-color: #ffffff;
`;

const BackgroundBox = styled.div`
margin-top: -20px;
  position: relative;
  width: 100vw;
  height: 100vh;
  font-size: 40px;
  color: #22C984;

  
`;

const Title = styled.h1`
  position: absolute;
  top: 20%;
  left: 20%;
  font-size: 2.7em;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
   @media (max-width: 600px) {
    height: 200px;  // 50% of the original height
    top: 5%;
  }
  @media screen and (orientation: landscape) and (max-width: 800px) {
    display: none; // Hide title text in mobile landscape mode
  }
   @media (max-width: 600px) {
    height: 200px;  // 50% of the original height
    top: 45%;
    display: none;
  }
`;

const MobileTitle = styled.h1`
  display: none;
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

  @media screen and (orientation: landscape) and (max-width: 800px) {
    display: none; // Hide logo in mobile landscape mode
  }
   @media (max-width: 600px) {
    height: 200px;  // 50% of the original height
    top: 45%;
    display: none;
  }

  @media screen and (orientation: landscape) and (max-width: 300px) {
    display: none; // Hide logo in mobile landscape mode
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





const StyledButton = styled.button`
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6);
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
  transition: all 0.3s ease-in-out;

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
  }

  @media (max-width: 500px) {
    font-size: 0.9rem; // further decrease font size
    padding: 6px 12px; // further decrease padding
    height: 50px; // further decrease height
    width: 120px; // further decrease width
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




export default function TabletHome() {

  const descriptionElementRef = useRef(null);

  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [bylawsOpen, setBylawsOpen] = useState(false);
  const [rosterOpen, setRosterOpen] = useState(false);
  const [partyOpen, setPartyOpen] = useState(false);

  const [raceOpen, setRaceOpen] = useState(false);
  const [officerOpen, setOfficerOpen] = useState(false);
  const [openCrewSignup, setOpenCrewSignup] = useState(false); // State to control CrewSignup dialog

  const handleCrewSignupOpen = () => setOpenCrewSignup(true); // Function to open CrewSignup dialog
  const handleCrewSignupClose = () => setOpenCrewSignup(false); // Function to close CrewSignup dialog















  const handleOpen = () => {
    setOpen(true);
  };


  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);



  const handleClose = () => {
    setOpen(false);
  };

  const handlePartyDialogOpen = () => {
    setPartyOpen(true);
  };

  useEffect(() => {
    if (partyOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [partyOpen]);

  const handlePartyclose = () => {
    setPartyOpen(false);
  };







  return (
    <Section1Styled id="sectionHome">
      <main className={styles.main}>

        <Logo src="https://i.imgur.com/QmF9MdD.png" alt="Logo" />

        <Title>Port Washington<br />Yacht Club<br /></Title>
        <MobileTitle>Members Section</MobileTitle>

        <ButtonContainer>
          <ButtonRow>


            <MembershipDialog open={open} onClose={handleClose} scroll="paper" />
            <StyledButton onClick={handleOpen} style={{ color: '#87faa8' }}>Member Form</StyledButton>

            <StyledButton onClick={handleCrewSignupOpen}>Crew Signup</StyledButton> {/* Button to launch CrewSignup dialog */}
            <CrewSignup open={openCrewSignup} onClose={handleCrewSignupClose} /> {/* CrewSignup dialog */}

            <StyledButton onClick={handlePartyDialogOpen}>Private Party Form</StyledButton> {/* New Button */}
            <PrivatePartyDialog open={partyOpen} onClose={handlePartyclose} scroll="paper" />
          </ButtonRow>
        </ButtonContainer>





      </main>
    </Section1Styled >
  );
}
