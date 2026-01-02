import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from "src/components/Header/Header";
import HeaderLinks from 'src/components/Header/HeaderLinks';
import Services from "src/components/Sections/Services";
import Events from "src/components/Sections/Events";
import Contact from "src/components/Sections/Contact";
import Porthole from "src/components/Sections/Porthole";
import Weather from '../components/Sections/Weather';
import styles from 'src/styles/Home.module.scss';
import ScrollToTop from "react-scroll-to-top";
import styled from 'styled-components';
import "src/styles/Home.module.scss";

// Import all the dialog components
import HistoryDialog from '../components/Dialog/History';
import MembershipDialog from '../components/Dialog/MembershipOnline';
import LinksDialog from '../components/Dialog/Links';
import RaceInfoDialog from '../components/Dialog/RaceInfo';
import OfficerDialog from '../components/Dialog/Officers';
import BoardDialog from '../components/Dialog/Board';
import RaceResultsDialog from '../components/Dialog/RaceResults';
import RRDialog from '../components/Dialog/RR';

// Import Firebase for images
import { firestore as db } from '../../firebase.js';

// Styled Components
const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #CDC2A4 0%, #BBAC83 100%);
  padding-top: 125px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(135, 206, 250, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(109, 212, 253, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  gap: 10px;
  flex-wrap: wrap;
  animation: slideDown 0.8s ease-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const TabButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #87CEFA, #6dd4fd)' : 'rgba(0,0,0,0.7)'};
  color: ${props => props.active ? '#000' : '#E8E3D5'};
  border: 2px solid ${props => props.active ? '#87CEFA' : '#FAF9F6'};
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 8px 25px rgba(135, 206, 250, 0.4)' : '5px 5px 15px rgba(0, 0, 0, 0.3)'};
  transform: ${props => props.active ? 'translateY(-2px)' : 'translateY(0)'};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #87CEFA, #6dd4fd)' : 'rgba(0,0,0,0.9)'};
    border-color: #87CEFA;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(135, 206, 250, 0.4);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 12px 20px;
  }
`;

const ContentContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 85vh;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.15), 0 10px 30px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
`;

const PageContent = styled.div`
  width: 100%;
  height: 85vh;
  position: relative;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${props => `url(${props.imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.95;
  z-index: 1;
  transition: all 0.5s ease-in-out;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const ContentOverlay = styled.div`
  position: relative;
  z-index: 2;
  padding: 40px;
  color: #E8E3D5;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
  animation: fadeInUp 0.5s ease-out;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #E8E3D5;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #FAF9F6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const ActionButton = styled.button`
  background: rgba(0, 0, 0, 0.7);
  color: #E8E3D5;
  border: 2px solid #FAF9F6;
  border-radius: 10px;
  padding: 15px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    border-color: #87CEFA;
    color: #996515;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(135, 206, 250, 0.4);
  }
  
  &.highlight {
    color: #87faa8;
  }
`;

const SpecialButton = styled(ActionButton)`
  background: linear-gradient(135deg, #87CEFA, #6dd4fd);
  color: #000;
  border-color: #87CEFA;
  font-weight: bold;
  
  &:hover {
    background: linear-gradient(135deg, #6dd4fd, #87CEFA);
    color: #000;
  }
`;

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  background-color: #5c5a55;
  border-top: 2px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #E8E3D5;
  
  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid #E8E3D5;
    border-top: 4px solid #87CEFA;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 10px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function NewHome() {
  const [activeTab, setActiveTab] = useState(0);
  const [imageURLs, setImageURLs] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(true);
  
  // Dialog states
  const [historyOpen, setHistoryOpen] = useState(false);
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);
  const [raceInfoOpen, setRaceInfoOpen] = useState(false);
  const [officerOpen, setOfficerOpen] = useState(false);
  const [boardOpen, setBoardOpen] = useState(false);
  const [raceResultsOpen, setRaceResultsOpen] = useState(false);
  const [rrOpen, setRROpen] = useState(false);

  const tabs = [
    { name: "Welcome", key: "welcome" },
    { name: "Membership", key: "membership" },
    { name: "Club Info", key: "club-info" },
    { name: "Sailing", key: "sailing" }
  ];

  // Load images from Firebase with fallback to placeholder images
  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      try {
        const imagePromises = [0, 1, 2, 3].map(async (index) => {
          try {
            const doc = await db.collection('homePageImages').doc(`image${index}`).get();
            return doc.exists ? doc.data().url : '';
          } catch (error) {
            console.error(`Error loading image ${index}:`, error);
            return '';
          }
        });
        
        const images = await Promise.all(imagePromises);
        
        // Use placeholder images if Firebase images are empty
        const placeholderImages = [
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Beautiful yacht on water
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Sailing boat
          'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2026&q=80', // Yacht/sailing image
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'  // Luxury yacht
        ];
        
        const finalImages = images.map((image, index) => image || placeholderImages[index]);
        setImageURLs(finalImages);
      } catch (error) {
        console.error('Error loading images:', error);
        // Use placeholder images if Firebase fails completely
        const placeholderImages = [
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2026&q=80',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ];
        setImageURLs(placeholderImages);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadImages();
  }, []);

  // Tab content configurations
  const tabContents = [
    {
      title: "Port Washington Yacht Club",
      subtitle: "Port Washington, WI",
      imageUrl: imageURLs[0],
      buttons: [
        { text: "Club History", onClick: () => setHistoryOpen(true), className: "" },
        { text: "Become a Member", onClick: () => setMembershipOpen(true), className: "highlight" },
        { text: "Sailing Info", onClick: () => setRaceInfoOpen(true), className: "" },
        { text: "Officers", onClick: () => setOfficerOpen(true), className: "" },
        { text: "Board", onClick: () => setBoardOpen(true), className: "" },
        { text: "Race Results", onClick: () => setRaceResultsOpen(true), className: "" }
      ]
    },
    {
      title: "Become a Member of PWYC",
      subtitle: "Embrace the thrill of sailing and boating while enjoying exclusive member benefits like access to special events, networking opportunities, and a community of like-minded enthusiasts.",
      imageUrl: imageURLs[1],
      buttons: [
        { text: "Become a Member", onClick: () => setMembershipOpen(true), className: "highlight" },
        { text: "Club History", onClick: () => setHistoryOpen(true), className: "" },
        { text: "Useful Links", onClick: () => setLinksOpen(true), className: "" }
      ]
    },
    {
      title: "Port Washington Yacht Club",
      subtitle: "Port Washington, WI",
      imageUrl: imageURLs[2],
      buttons: [
        { text: "Board Members", onClick: () => setBoardOpen(true), className: "" },
        { text: "Officers", onClick: () => setOfficerOpen(true), className: "" },
        { text: "Club History", onClick: () => setHistoryOpen(true), className: "" }
      ]
    },
    {
      title: "PWYC Sailing Information",
      subtitle: "Access sailing resources, race information, and club events",
      imageUrl: imageURLs[3],
      buttons: [
        { text: "Rules", onClick: () => window.open("https://www.ussailing.org/competition/rules-officiating/the-racing-rules-of-sailing-2021-2024/#the-rules", "_blank"), className: "" },
        { text: "Race Results", onClick: () => setRaceResultsOpen(true), className: "" },
        { text: "Sailing Info", onClick: () => setRaceInfoOpen(true), className: "" }
      ]
    }
  ];

  return (
    <div>
      <Header
        brand="Port Washington Yacht Club"
        rightLinks={<HeaderLinks />}
        fixed
        color="dark"
        changeColorOnScroll={{
          height: 50,
          color: "dark",
        }}
      />
      
      <MainContainer>
        <TabContainer>
          {tabs.map((tab, index) => (
            <TabButton
              key={tab.key}
              active={activeTab === index}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </TabButton>
          ))}
        </TabContainer>

        <ContentContainer>
          <PageContent>
            {isLoading ? (
              <LoadingSpinner>Loading content...</LoadingSpinner>
            ) : (
              <>
                <BackgroundImage imageUrl={tabContents[activeTab].imageUrl} />
                <ContentOverlay key={activeTab}>
                  <Title>{tabContents[activeTab].title}</Title>
                  <Subtitle>{tabContents[activeTab].subtitle}</Subtitle>
                  
                  <ButtonGrid>
                    {tabContents[activeTab].buttons.map((button, index) => (
                      <ActionButton
                        key={index}
                        onClick={button.onClick}
                        className={button.className}
                      >
                        {button.text}
                      </ActionButton>
                    ))}
                  </ButtonGrid>
                </ContentOverlay>
              </>
            )}
          </PageContent>
        </ContentContainer>

        {/* Special Rendezvous Race Button */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <SpecialButton onClick={() => setRROpen(true)}>
            2025 Rendezvous Race
          </SpecialButton>
        </div>
      </MainContainer>

      {/* Additional Sections */}
      <Services />
      <Events />
      <Weather />
      <Contact />

      <Footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
        <div>
          <div style={{ marginTop: "5vh" }} />
          <ScrollToTop smooth top='600' />
        </div>
      </Footer>

      {/* Dialogs */}
      <HistoryDialog open={historyOpen} onClose={() => setHistoryOpen(false)} scroll="paper" />
      <MembershipDialog open={membershipOpen} onClose={() => setMembershipOpen(false)} scroll="paper" />
      <LinksDialog open={linksOpen} onClose={() => setLinksOpen(false)} scroll="paper" />
      <RaceInfoDialog open={raceInfoOpen} onClose={() => setRaceInfoOpen(false)} scroll="paper" />
      <OfficerDialog open={officerOpen} onClose={() => setOfficerOpen(false)} scroll="paper" />
      <BoardDialog open={boardOpen} onClose={() => setBoardOpen(false)} scroll="paper" />
      <RaceResultsDialog open={raceResultsOpen} onClose={() => setRaceResultsOpen(false)} scroll="paper" />
      <RRDialog open={rrOpen} onClose={() => setRROpen(false)} scroll="paper" />
    </div>
  );
}
