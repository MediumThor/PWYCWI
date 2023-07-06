

import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import PageOne from './HomeScroll/PageOne';
import PageTwo from './HomeScroll/PageTwo';
import PageThree from './HomeScroll/PageThree';
import PageFour from './HomeScroll/PageFour';

import BoardModal from '../Modals/BoardModal';
import OfficersModal from '../Modals/OfficersModal';


import HistoryDialog from '../Dialog/History';
import MembershipDialog from '../Dialog/Membership';
import LinksDialog from '../Dialog/Links';
import RaceInfoDialog from '../Dialog/RaceInfo';
import OfficerDialog from '../Dialog/Officers';
import BoardDialog from '../Dialog/Board';
import RaceResultsDialog from '../Dialog/RaceResults';



const Section1Styled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 130px;
  //background-color: #CDC2A4;
  background: linear-gradient( #2e2d2a, #171615);
  //background: linear-gradient( 45deg, #87cefa, #000080);
  //background: linear-gradient( #97b0bb, #97b0bb);
  //background: linear-gradient( #BBAC83, #CDC2A4);
    //background: linear-gradient( #CDC2A4, #BBAC83);

box-shadow: inset -60px -60px 40px rgba(0, 0, 0, .3),inset 60px 60px 40px rgba(0, 0, 0, .3);

 
  
`;

const HorizontalScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  scroll-snap-type: x mandatory;
  &::-webkit-scrollbar {
    width: 0px; /* For Chrome, Safari, and Opera */
  }

  
`;

const PageDiv = styled.div`
margin-top: -70px;
margin-bottom: 30px;

  flex: none;
  width: 90vw;
  height: 75vh;
  scroll-snap-align: start;
   border-radius: 5px;
    border: 6px solid black;
 
 
 @media (max-width: 940px) {
  margin-top: -120px;
                  height: 70vh;
               }
  

 @media (max-width: 640px) {
                    box-shadow: none;
                      margin-top: -120px;
                      width: 100vw;
}

 @media (max-width: 500px) {
    margin-top: -120px;
    
  }
   @media (max-width: 400px) {
    margin-top: -200px;
  height: 65vh;

  }
  
`;

const PageContainer = styled.div`
  flex: none;
  width: 90vw;
  height: 74vh;
  margin-top: -2px;
  scroll-snap-align: start;
  overflow-y: hidden; 
  overflow-x: hidden; 
  

  border-radius: 5px;
      border: 1px solid black;

      @media (max-width: 940px) {
                  height: 70vh;}
   
 @media (max-width: 640px) {
      border-radius: none;
      border: none;}

       @media (max-width: 640px) {
      border-radius: none;
      border: none;
  width: 100vw;
  height: 70vh;

    }




`;

const ScrollIndicator = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: ${props => props.active ? '#87CEFA' : 'lightgray'};
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.9);
  margin: 25px;
  cursor: pointer;
    transition: background-color 0.5s ease-in-out;

   &:hover {
    background-color: #6edd64;
        cursor: pointer;
  }


`;

const IndicatorContainer = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  z-index: 10;
   @media (max-width: 940px) {
                  bottom: 60px;
                }

 @media (max-width: 640px) {         
bottom: 0px;}
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 80%;  
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  grid-template-columns: repeat(2, 3fr);  // create 2 equal width columns
  grid-template-rows: repeat(3, 3fr);     // create 2 equal height rows
  justify-items: center;  // center items horizontally
  align-items: center;    // center items vertically
  gap: 1.1em;
      z-index: +1;  


   @media (max-width: 1200px) {


  }

    @media (max-width: 1040px) {
     display: grid;
  grid-template-rows: repeat(1, 3fr);     // create 2 equal height rows
  grid-template-columns: repeat(3, 1fr);  // create 2 equal width columns

    top: 75%;
      left: 50%;

  }


    @media (max-width: 940px) {
     display: grid;
  grid-template-rows: repeat(1, 3fr);     // create 2 equal height rows
  grid-template-columns: repeat(3, 1fr);  // create 2 equal width columns

    top: 70%;
      left: 50%;

  }

  @media (max-width: 700px) {
    top: 70%;
          left: 50%;
gap: .1em;

  }

  @media (max-width: 500px) {
        top: 60%;
                    grid-template-columns: repeat(2, 1fr);  // create 2 equal width columns

    gap: .1em;
  }

  @media (max-width: 400px) {
    gap: .01em;
      left: 50%;

  }
`;

const StyledButton = styled.button`
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6);
  z-index: 2;
  font-size: 1.3rem;
  border-radius: 5px;
  border: 2px solid #FAF9F6;
  background-color: rgb(0,0,0,0.7);
  color: #E8E3D5;
  padding: 10px 20px;
  cursor: pointer;
  height: 70px;
    width: 140px;
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
     height: 60px;
    width: 100px;
    font-size: .9rem; // decrease font size
    padding: 2px 15px; // decrease padding
    
  }
`;




const SectionHome = () => {
  const scrollRef = useRef(null);
  const [activePage, setActivePage] = useState(0);
  const [showAlert, setShowAlert] = useState(true);

  const pages = [<PageOne />, <PageTwo />, <PageThree />, <PageFour />];

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
  const [linkOpen, setLinkOpen] = useState(false);
  const [raceOpen, setRaceOpen] = useState(false);

  const [officerOpen, setOfficerOpen] = useState(false);

  const [boardOpen, setBoardOpen] = useState(false);
  const [raceResultsOpen, setRaceResultsOpen] = useState(false);



  const handleRaceResultsDialogOpen = () => {
    setRaceResultsOpen(true);
  };

  useEffect(() => {
    if (raceResultsOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [raceResultsOpen]);

  const handleRaceResultsClose = () => {
    setRaceResultsOpen(false);
  };

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



  const handleLinkDialogOpen = () => {
    setLinkOpen(true);
  };

  useEffect(() => {
    if (linkOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [linkOpen]);

  const handleLinkClose = () => {
    setLinkOpen(false);
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

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);



  useEffect(() => {
    const interval = setInterval(() => {
      setActivePage((activePage + 1) % (pages.length * 3));
      scrollToPage((activePage + 1) % (pages.length * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, [activePage]);





  return (
    <Section1Styled id="sectionHome">

      <PageDiv>
        <ButtonContainer>

          <StyledButton onClick={handleHistoryDialogOpen} >Club History</StyledButton>
          <HistoryDialog open={historyOpen} onClose={handleHistoryClose} scroll="paper" />

          <MembershipDialog open={open} onClose={handleClose} scroll="paper" />
          <StyledButton onClick={handleOpen} style={{ color: '#87faa8' }}>Become a Member</StyledButton>

          <StyledButton onClick={handleRaceDialogOpen}>Sailing Info</StyledButton> {/* New Button */}
          <RaceInfoDialog open={raceOpen} onClose={handleRaceClose} scroll="paper" />

          {/**   <StyledButton onClick={handleLinkDialogOpen} >Useful Links</StyledButton>
          <LinksDialog open={linkOpen} onClose={handleLinkClose} scroll="paper" /> */}


          <StyledButton onClick={handleOfficerDialogOpen}>Officers</StyledButton> {/* New Button */}
          <OfficerDialog open={officerOpen} onClose={handleOfficerclose} scroll="paper" />

          <StyledButton onClick={handleBoardDialogOpen}>Board</StyledButton> {/* New Button */}
          <BoardDialog open={boardOpen} onClose={handleBoardclose} scroll="paper" />

          <StyledButton onClick={handleRaceResultsDialogOpen}>Race Results</StyledButton>
          <RaceResultsDialog open={raceResultsOpen} onClose={handleRaceResultsClose} scroll="paper" />

        </ButtonContainer>


        <HorizontalScrollContainer ref={scrollRef}>

          {Array(3).fill().map((_, i) =>
            pages.map((Page, j) => (
              <PageContainer key={`${i}-${j}`}>


                {Page}

              </PageContainer>
            ))
          )}


        </HorizontalScrollContainer>


      </PageDiv>


      <IndicatorContainer>
        {[0, 1, 2, 3].map(i =>
          <ScrollIndicator active={activePage % 4 === i} onClick={() => scrollToPage(i)} key={i} />
        )}
      </IndicatorContainer>

    </Section1Styled>
  );
};

export default SectionHome;
