

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
  width:100%;
  height: 100vh;
  padding-top: 60px;
  background-color: #000000;
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
margin-top: 30px;
  flex: none;
  width: 90vw;
  height: 90vh;
  scroll-snap-align: start;
  
`;

const PageContainer = styled.div`
  flex: none;
  width: 90vw;
  height: 80vh;
  scroll-snap-align: start;
  overflow-y: hidden; 
  overflow-x: hidden; 

  border-radius: 15px;


`;

const ScrollIndicator = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 0px solid white;
  background-color: ${props => props.active ? '#87CEFA' : 'lightgray'};
  margin: 20px;
  cursor: pointer;
`;

const IndicatorContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  z-index: 1000;
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
        <IndicatorContainer>
          {[0, 1, 2, 3].map(i =>
            <ScrollIndicator active={activePage % 4 === i} onClick={() => scrollToPage(i)} key={i} />
          )}
        </IndicatorContainer>
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
    </Section1Styled>
  );
};

export default SectionHome;