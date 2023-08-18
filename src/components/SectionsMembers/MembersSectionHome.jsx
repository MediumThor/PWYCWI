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
import { useRef } from 'react';

import HistoryDialog from '../Dialog/History';
import MembershipDialog from '../Dialog/Membership';
import RaceInfoDialog from '../Dialog/RaceInfo';
import BoardModal from '../Modals/BoardModal';
import OfficersModal from '../Modals/OfficersModal';
import BylawsDialog from '../Dialog/ByLaws';
import RosterDialog from '../Dialog/Roster';
import OfficerDialog from '../Dialog/Officers';
import BoardDialog from '../Dialog/Board';
import CrewSignup from './Components/CrewSignup';


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




export default function SectionHome() {

  const scrollRef = useRef(null);
  const [activePage, setActivePage] = useState(0);
  const [showAlert, setShowAlert] = useState(true);


  const [historyOpen, setHistoryOpen] = useState(false);
  const descriptionElementRef = useRef(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [isSailingModalOpen, setIsSailingModalOpen] = useState(false);
  const [showSecondAlert, setShowSecondAlert] = useState(true);
  const [showThirdAlert, setShowThirdAlert] = useState(true);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isOfficersModalOpen, setIsOfficersModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [bylawsOpen, setBylawsOpen] = useState(false);
  const [rosterOpen, setRosterOpen] = useState(false);

  const [raceOpen, setRaceOpen] = useState(false);
  const [officerOpen, setOfficerOpen] = useState(false);

  const [boardOpen, setBoardOpen] = useState(false);


  const [openCrewSignup, setOpenCrewSignup] = useState(false); // State to control CrewSignup dialog

  const handleCrewSignupOpen = () => setOpenCrewSignup(true); // Function to open CrewSignup dialog
  const handleCrewSignupClose = () => setOpenCrewSignup(false); // Function to close CrewSignup dialog



  const handleBoardDialogOpen = () => {
    setBoardOpen(true);
  };

  useEffect(() => {
    if (boardOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [boardOpen]);

  const handleBoardclose = () => {
    setBoardOpen(false);
  };


  const handleOfficerDialogOpen = () => {
    setOfficerOpen(true);
  };

  useEffect(() => {
    if (officerOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [officerOpen]);

  const handleOfficerclose = () => {
    setOfficerOpen(false);
  };



  const handleRaceDialogOpen = () => {
    setRaceOpen(true);
  };

  useEffect(() => {
    if (raceOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [raceOpen]);

  const handleRaceClose = () => {
    setRaceOpen(false);
  };



  const handleBylawsDialogOpen = () => {
    setBylawsOpen(true);
  };

  useEffect(() => {
    if (bylawsOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [bylawsOpen]);

  const handleBylawsclose = () => {
    setBylawsOpen(false);
  };


  const handleRosterDialogOpen = () => {
    setRosterOpen(true);
  };

  useEffect(() => {
    if (rosterOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [rosterOpen]);

  const handleRosterclose = () => {
    setRosterOpen(false);
  };






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

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };




  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    });

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);




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

  const handleBoardOpen = () => {
    setIsBoardModalOpen(true);
  };

  const handleBoardClose = () => {
    setIsBoardModalOpen(false);
  };

  const handleOfficersOpen = () => {
    setIsOfficersModalOpen(true);
  };

  const handleOfficersClose = () => {
    setIsOfficersModalOpen(false);
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

  const scrollToPage = (pageIndex) => {
    const scrollContainer = scrollRef.current;
    const pageWidth = scrollContainer.clientWidth;
    scrollContainer.scrollTo({
      top: 0,
      left: pageIndex * pageWidth,
      behavior: 'smooth'
    });
  }

  const handleScroll = () => {
    const scrollContainer = scrollRef.current;
    const pageWidth = scrollContainer.clientWidth;
    const currentPage = Math.round(scrollContainer.scrollLeft / pageWidth);
    setActivePage(currentPage);
  }








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
            <MobileTitle>Members Section</MobileTitle>
            <ButtonContainer>
              <ButtonRow>

                <StyledButton onClick={handleHistoryDialogOpen} >Club History</StyledButton>
                <HistoryDialog open={historyOpen} onClose={handleHistoryClose} scroll="paper" />

                <MembershipDialog open={open} onClose={handleClose} scroll="paper" />
                <StyledButton onClick={handleOpen} style={{ color: '#87faa8' }}>Member Form</StyledButton>

                <StyledButton onClick={handleRaceDialogOpen}>Sailing Info</StyledButton> {/* New Button */}
                <RaceInfoDialog open={raceOpen} onClose={handleRaceClose} scroll="paper" />

                <StyledButton onClick={handleBylawsDialogOpen}>By-laws</StyledButton> {/* New Button */}
                <BylawsDialog open={bylawsOpen} onClose={handleBylawsclose} scroll="paper" />
              </ButtonRow>
              <ButtonRow>

                <StyledButton onClick={handleRosterDialogOpen}>Roster</StyledButton> {/* New Button */}
                <RosterDialog open={rosterOpen} onClose={handleRosterclose} scroll="paper" />

                <StyledButton onClick={handleOfficerDialogOpen}>Officers</StyledButton> {/* New Button */}
                <OfficerDialog open={officerOpen} onClose={handleOfficerclose} scroll="paper" />

                <StyledButton onClick={handleBoardDialogOpen}>Board</StyledButton> {/* New Button */}
                <BoardDialog open={boardOpen} onClose={handleBoardclose} scroll="paper" />

                <StyledButton onClick={handleCrewSignupOpen}>Crew Signup</StyledButton> {/* Button to launch CrewSignup dialog */}
                <CrewSignup open={openCrewSignup} onClose={handleCrewSignupClose} /> {/* CrewSignup dialog */}
              </ButtonRow>
            </ButtonContainer>


            {/**   <StyledButton onClick={handleLinkDialogOpen} >Useful Links</StyledButton>
          <LinksDialog open={linkOpen} onClose={handleLinkClose} scroll="paper" /> */}

            <BoardModal isOpen={isBoardModalOpen} onRequestClose={handleBoardClose} />
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
