

import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import PageOne from './HomeScroll/PageOne';
import PageTwo from './HomeScroll/PageTwo';
import PageThree from './HomeScroll/PageThree';
import PageFour from './HomeScroll/PageFour';

const Section1Styled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 110px;
  background: linear-gradient( #2e2d2a, #171615);

 
  
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
margin-top: -60px;
margin-bottom: 30px;

  flex: none;
  width: 90vw;
  height: 80vh;
  scroll-snap-align: start;
   border-radius: 15px;
    border: 1px solid black;
              box-shadow: 10px 20px 20px 2px rgba(0,0,0,0.7);
 
 
 @media (max-width: 940px) {
  margin-top: -260px;
                  height: 70vh;
                margin-bottom: -30px;}
  

 @media (max-width: 640px) {
                    box-shadow: none;
                        border: none;
                      margin-top: -120px;}

 @media (max-width: 500px) {
    margin-top: -120px;
  }
   @media (max-width: 400px) {
    margin-top: -120px;
  }
  
`;

const PageContainer = styled.div`
  flex: none;
  width: 90vw;
  height: 80vh;
  scroll-snap-align: start;
  overflow-y: hidden; 
  overflow-x: hidden; 

  border-radius: 15px;
      border: 3px solid black;

      @media (max-width: 940px) {
                  height: 70vh;}
   
 @media (max-width: 640px) {
      border-radius: none;
      border: none;}

       @media (max-width: 640px) {
      border-radius: none;
      border: none;}



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

   @media (max-width: 640px) {         
  margin: 15px;
}
`;

const IndicatorContainer = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  z-index: 0;
   @media (max-width: 940px) {
                  bottom: 80px;
                }

 @media (max-width: 640px) {         
bottom: 20px;}
`;

const SectionHome = () => {
  const scrollRef = useRef(null);
  const [activePage, setActivePage] = useState(0);

  const pages = [<PageOne />, <PageTwo />, <PageThree />, <PageFour />];

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
    }, 30000);
    return () => clearInterval(interval);
  }, [activePage]);

  return (
    <Section1Styled id="sectionHome">
      <PageDiv>

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