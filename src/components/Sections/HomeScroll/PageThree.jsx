

import React from 'react';
import { useRef } from 'react';
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
import NewsModal from '../../Modals/NewsModal';
import EventsModal from '../../Modals/EventsModal';
import MembershipModal from '../../Modals/MembershipModal';
import OfficersModal from '../../Modals/OfficersModal';
import BoardModal from '../../Modals/BoardModal';
import HistoryDialog from '../../Dialog/History';
import { firestore as db } from '../../../../firebase'; // Make sure to import Firestore


const Section1Styled = styled.div`

  width:100%;
  background-color: #ffffff;
`;

const BackgroundBox = styled.div`
  position: relative;
  width: 110vw;
  height: 100%;
  font-size: 40px;
  color: #22C984;
  background-color: #000000;

 
`;

const Title = styled.h1`
  position: absolute;
  top: 0%;
  left: 10%;
  font-size: 1.7em;
  font-weight: bold;
  color: #E8E3D5;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
    transition: opacity 2s ease-in-out;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};


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
    @media screen and (orientation: landscape) and (max-height: 800px) {
  left: 15%;

    }
     @media screen and (orientation: landscape) and (max-width: 800px) {
    display: none; // Hide title text in mobile landscape mode
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
  }
  @media (max-width: 500px) {
    height: 80px;  // 50% of the original height
    top: 35%;
    left: 15%;
    font-size: .7em;
  }
  @media (max-width: 400px) {
    height: 80px;  // 50% of the original height
    top: 15%;
    left: 15%;
    font-size: .7em;
  }

     @media screen and (orientation: landscape) and (max-height: 700px) {
display: none;
    }
     @media screen and (orientation: landscape) and (max-width: 800px) {
    display: none; // Hide title text in mobile landscape mode
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 10%;  
  left: 65%;  
  height: 40%; 
  width: auto;

   @media (max-width: 1000px) {
    height: 200px;  // 50% of the original height
    top: 45%;
    display: none;
  }

  @media (max-width: 600px) {
    height: 200px;  // 50% of the original height
    top: 45%;
    display: none;
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
  left: 50%;
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

   @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;

    left: 70%;
    top: 50%;
    gap: .1em;
  }

  @media (max-width: 600px) {
    justify-content: center;
    top: 50%;
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
    top: 50%; 
    left: 50%;

    
  }
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
      transition: all 0.3s ease-in-out;  // Add transition for smooth hover effect


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
    height: 70px;
    width: 120px;
  }
   @media (max-width: 640px) {
    font-size: 1rem; // decrease font size
    padding: 5px 25px; // decrease padding

  }
`;




export default function PageThree() {

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isOfficersModalOpen, setIsOfficersModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const [historyOpen, setHistoryOpen] = useState(false);
  const descriptionElementRef = useRef(null);
  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [imageURL, setImageURL] = useState(''); // State variable to hold the image URL



  useEffect(() => {
    const ref = db.collection('homePageImages').doc('image2'); // Change to the correct document ID
    ref.get().then(doc => {
      if (doc.exists) {
        setImageURL(doc.data().url); // Assuming the URL is stored in the 'url' field
      }
    });
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



  return (
    <Section1Styled id="sectionHome">
      <main className={styles.main}>
        <BackgroundBox>
          <Parallax
            blur={{ min: -15, max: 15 }}
            strength={300}
            bgImage={imageURL} // Use the imageURL from state
            bgImageAlt="Background"
            bgImageStyle={{
              backgroundSize: 'contain', // Make sure the image fits within the container
              height: '125vh', // Set a specific height (adjust as needed)
              width: 'auto', // Maintain the aspect ratio
              top: '-20%', // Adjust the top property to move the image up or down

            }}
          >
            <Logo src="https://i.imgur.com/QmF9MdD.png" alt="Logo" />

            <Title ref={titleRef} isVisible={isVisible}>
              Port Washington<br />Yacht Club
            </Title>            <Location>Port Washington,WI</Location>
            {/** 
            <ButtonContainer>
              <StyledButton onClick={handleBoardOpen}>Board Members</StyledButton>
              <StyledButton onClick={handleOfficersOpen}>Officers</StyledButton>
              <StyledButton onClick={handleHistoryDialogOpen} >Club History</StyledButton>
              <HistoryDialog open={historyOpen} onClose={handleHistoryClose} scroll="paper" />


            </ButtonContainer>

            */}
            <BoardModal isOpen={isBoardModalOpen} onRequestClose={handleBoardClose} />
            <OfficersModal isOpen={isOfficersModalOpen} onRequestClose={handleOfficersClose} />
            <MembershipModal isOpen={isMemberModalOpen} onRequestClose={handleMemberClose} />


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
