import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useEffect, useRef } from 'react';
import CourseToggle from '../RaceCourseButton';


const raceCourseImage1 = 'https://media.discordapp.net/attachments/1090123749300379740/1134866004544061550/PWYC_COURSE_2023-1.jpg?width=794&height=1028';
const raceCourseImage2 = 'https://media.discordapp.net/attachments/1090123749300379740/1134866005009645609/PWYC_COURSE_2023-2.jpg?width=794&height=1028';


const Section1Styled = styled.div`
  background: linear-gradient(45deg, #171615 50%, #2e2d2a 100%);
  padding-top: 0px;
  padding-bottom: 70px;
  margin-bottom: 80px;
  margin-top: -0px
@media (max-width: 768px) {

  margin-bottom: -30px;
  }
     @media (max-width: 640px) {
         padding-top: 60px    }
  
`;




const scrollIn = keyframes`
  0% {
    transform: translateX(280%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromLeft = keyframes`
  0% {
    transform: translateX(-250%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`;

const ServicesBackground = styled.div`
  display: flex; // Center the child element
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 60px;
  padding-top: 160px;
  margin-top: -90px;
  margin-bottom: -90px;
  background-color: black;
  box-shadow: 10px 20px 20px 2px rgba(0,0,0,0.5);

      @media (max-width: 768px) {
   display: none;
  }
`;

const ServicesTitle = styled.h1`
  text-align: center;
  font-size: 3em;
  color: #E8E3D5;
  overflow: hidden;
  padding-top: 20px;
  margin-top: -180px;
  padding-bottom: 10px;
  margin-bottom: -90px;
  background-color: Black;
    transform: translateX(-100%);  // Position the text off the screen initially


  ${props => props.isIntersecting && css`
    animation: ${slideInFromLeft} 1.2s ease-in-out forwards;
  `}

      @media (max-width: 1268px) {
   display: none;
  }
`;



const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;

  @media (max-width: 768px) {
  }
`;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
    max-width: 600px;
  margin-right: 40px;
  box-shadow: 10px 20px 20px 2px rgba(0,0,0,0.5);
 @media (max-width: 1280px) {
    margin-right: 0px;;
  }

`;


const Tab = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.expanded ? 'center' : 'center'};
  align-items: ${props => props.expanded ? 'center' : 'center'};
  padding-top: ${props => props.expanded ? '20px' : '0px'};
  height: ${props => props.expanded ? '400px' : '100px'};
  width: 100%;  // Change the width to 100%
  background-color: ${props => props.expanded ? '#333' : '#444'};
  color: #E8E3D5;
  font-size: 20px;
  border: 2px solid #E8E3D5;
  transition: all 0.9s ease-in-out;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: ${props => props.expanded ? '0px' : '-1px'}; 

  &:hover {
    background-color: #345;
    border: 2px solid #ffffff;
  }
`;



const ImageWrapper = styled.div`
  width: 800px;
  height: 600px;
  border-radius: 10px;
  overflow: hidden;

   @media (max-width: 1280px) {
    display: none;
  }
  
`;


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px; // Added border-radius
  // Apply the fade-in animation
  animation: ${fadeIn} 2.8s ease-in-out;
`;

const TabTitle = styled.div`
  flex: ${props => props.expanded ? '1' : '0'};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => props.expanded ? '1' : '1'}; // Added opacity change on expand
`;



const TabDescription = styled.div`
  flex: ${props => props.expanded ? '20' : '0'};
  overflow: hidden;
  padding: ${props => props.expanded ? '16px' : '0'};
  transition: all 0.9s ease-in-out;
  opacity: ${props => props.expanded ? '0' : '0'}; 
  text-align: left;
  font-size: ${props => props.expanded ? '0.95rem' : '1.05rem'};

  // Add this block to apply the fade-in animation
  ${props => props.expanded && css`
    animation: ${fadeIn} 1.0s ease-in-out forwards 0.9s;
  `}

   @media (max-width: 768px) {
      font-size: ${props => props.expanded ? '.8rem' : '.9rem'};

  }

    @media (max-width: 468px) {
      font-size: ${props => props.expanded ? '.7rem' : '.7rem'};

  }
`;



export default function Section1() {
  const [activeTab, setActiveTab] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const titleRef = useRef(null);


  const images = [
    'https://i.imgur.com/0j8dlXj.jpeg',
    'https://i.imgur.com/Ppp5a9q.jpeg',
    'https://i.imgur.com/ASxToRS.jpeg'
  ];

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current instanceof Element) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []); // empty dependency array to run effect once



  return (
    <Section1Styled id="section1">
      <ServicesBackground>
        <ServicesTitle isIntersecting={isIntersecting} ref={titleRef}>Services</ServicesTitle>
      </ServicesBackground>


      <CourseToggle imageSrc1={raceCourseImage1} imageSrc2={raceCourseImage2} />



      <MainWrapper>

        <TabWrapper>
          <Tab expanded={activeTab === 0} onClick={() => setActiveTab(0)}>
            <TabTitle expanded={activeTab === 0}>Cruising & Fishing</TabTitle>
            <TabDescription expanded={activeTab === 0}>
              <p>Embark on delightful cruising trips to various ports alongside fellow members of the yacht club. These trips offer the opportunity to explore new destinations and enjoy the camaraderie of like-minded boating enthusiasts.</p>
              <p> Engage in thrilling fishing tournaments, including the highly anticipated Lloyd Purnell Annual Fishing Tournament. This tournament celebrates the art of fishing, and awards are presented to the most accomplished anglers who demonstrate exceptional skill and success in their endeavors. It's an exciting opportunity to showcase your fishing prowess and compete among fellow members of the yacht club.</p>
            </TabDescription>
          </Tab>
          <Tab expanded={activeTab === 1} onClick={() => setActiveTab(1)}>
            <TabTitle expanded={activeTab === 1}>Social Functions</TabTitle>
            <TabDescription expanded={activeTab === 1}>
              <p>The Club offers a diverse range of activities throughout the year, ensuring an engaging social calendar. Members can look forward to an abundance of enjoyable parties and informal group trips that take place at any time of the year.</p>

              <p>Furthermore, the Club actively participates in the city's Fish Day celebration and takes part in various other community events. This involvement includes contributing funds towards school scholarships and making the Club's facilities available for charitable fundraising events.</p>

              <p>During the summer months, the clubhouse bar is open every Friday evening. This welcoming space serves not only Club members but also visiting boaters from other yacht clubs, providing a vibrant atmosphere for all to enjoy.</p>
            </TabDescription>
          </Tab>
          <Tab expanded={activeTab === 2} onClick={() => setActiveTab(2)}>
            <TabTitle expanded={activeTab === 2}>Sail Racing</TabTitle>
            <TabDescription expanded={activeTab === 2}>
              <p>The Port Washington Yacht Club organizes an exciting Saturday Buoy racing series that caters to both racing class and cruising class boats. These thrilling races take place on most weekends from June through September.</p>

              <p> Additionally, there are two notable long-distance weekend races. One race involves sailing to and from the Niagra wreck at Harrington beach, while the other race takes participants to and from Sheboygan. These races add an element of fun, and individual awards are presented to deserving participants.</p>

              <p> The Port Washington Yacht Club proudly sponsors the renowned Clipper Cup race, which spans across the lake. Additionally, the club hosts the exhilarating 'Double Handed' race, which takes place along the west shore. Both of these races culminate at the Port Washington Harbor,
                where award parties are held at the club, creating a memorable and celebratory atmosphere.</p>
            </TabDescription>
          </Tab>
        </TabWrapper>
        <ImageWrapper>
          <Image key={activeTab} src={images[activeTab]} alt={`Service ${activeTab + 1}`} />
        </ImageWrapper>
      </MainWrapper>
    </Section1Styled >
  );
}
