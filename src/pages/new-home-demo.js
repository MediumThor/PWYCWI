import React, { useState } from 'react';
import styled from 'styled-components';
import "src/styles/Home.module.scss";

// Simple Header Component
const SimpleHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 15px 0;
  border-bottom: 2px solid #87CEFA;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Brand = styled.h1`
  color: #E8E3D5;
  font-size: 1.5rem;
  margin: 0;
  font-weight: bold;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.a`
  color: #E8E3D5;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(135, 206, 250, 0.2);
    color: #87CEFA;
  }
`;

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
  min-height: 70vh;
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
  height: 100%;
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
  opacity: 0.8;
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

const DemoMessage = styled.div`
  background: rgba(135, 206, 250, 0.9);
  color: #000;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

export default function NewHomeDemo() {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    { name: "Welcome", key: "welcome" },
    { name: "Membership", key: "membership" },
    { name: "Club Info", key: "club-info" },
    { name: "Sailing", key: "sailing" }
  ];

  // Beautiful sailing images from Unsplash
  const imageURLs = [
    'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  ];

  // Tab content configurations
  const tabContents = [
    {
      title: "Port Washington Yacht Club",
      subtitle: "Port Washington, WI",
      imageUrl: imageURLs[0],
      buttons: [
        { text: "Club History", onClick: () => alert("Club History dialog would open here"), className: "" },
        { text: "Become a Member", onClick: () => alert("Become a Member dialog would open here"), className: "highlight" },
        { text: "Sailing Info", onClick: () => alert("Sailing Info dialog would open here"), className: "" },
        { text: "Officers", onClick: () => alert("Officers dialog would open here"), className: "" },
        { text: "Board", onClick: () => alert("Board dialog would open here"), className: "" },
        { text: "Race Results", onClick: () => alert("Race Results dialog would open here"), className: "" }
      ]
    },
    {
      title: "Become a Member of PWYC",
      subtitle: "Embrace the thrill of sailing and boating while enjoying exclusive member benefits like access to special events, networking opportunities, and a community of like-minded enthusiasts.",
      imageUrl: imageURLs[1],
      buttons: [
        { text: "Become a Member", onClick: () => alert("Become a Member dialog would open here"), className: "highlight" },
        { text: "Club History", onClick: () => alert("Club History dialog would open here"), className: "" },
        { text: "Useful Links", onClick: () => alert("Useful Links dialog would open here"), className: "" }
      ]
    },
    {
      title: "Port Washington Yacht Club",
      subtitle: "Port Washington, WI",
      imageUrl: imageURLs[2],
      buttons: [
        { text: "Board Members", onClick: () => alert("Board Members dialog would open here"), className: "" },
        { text: "Officers", onClick: () => alert("Officers dialog would open here"), className: "" },
        { text: "Club History", onClick: () => alert("Club History dialog would open here"), className: "" }
      ]
    },
    {
      title: "PWYC Sailing Information",
      subtitle: "Access sailing resources, race information, and club events",
      imageUrl: imageURLs[3],
      buttons: [
        { text: "Rules", onClick: () => window.open("https://www.ussailing.org/competition/rules-officiating/the-racing-rules-of-sailing-2021-2024/#the-rules", "_blank"), className: "" },
        { text: "Race Results", onClick: () => alert("Race Results dialog would open here"), className: "" },
        { text: "Sailing Info", onClick: () => alert("Sailing Info dialog would open here"), className: "" }
      ]
    }
  ];

  return (
    <div>
      <SimpleHeader>
        <HeaderContent>
          <Brand>Port Washington Yacht Club</Brand>
          <NavLinks>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/new-home-demo">New Home Demo</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </NavLinks>
        </HeaderContent>
      </SimpleHeader>
      
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
            <BackgroundImage imageUrl={tabContents[activeTab].imageUrl} />
            <ContentOverlay key={activeTab}>
              <Title>{tabContents[activeTab].title}</Title>
              <Subtitle>{tabContents[activeTab].subtitle}</Subtitle>
              
              <DemoMessage>
                🎉 Demo Mode: Click any button to see the tab navigation in action!
              </DemoMessage>
              
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
          </PageContent>
        </ContentContainer>

        {/* Special Rendezvous Race Button */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <SpecialButton onClick={() => alert("2025 Rendezvous Race dialog would open here")}>
            2025 Rendezvous Race
          </SpecialButton>
        </div>
      </MainContainer>

      <Footer>
        <div style={{ color: '#E8E3D5' }}>
          © 2025 Port Washington Yacht Club. All rights reserved.
        </div>
      </Footer>
    </div>
  );
}


