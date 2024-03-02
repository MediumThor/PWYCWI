import React, { useEffect } from 'react'
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss'
import CrewCards from './Components/CrewCards';

export default function CrewCardsSection() {
  return (
    <Section2Styled id="section2">
      <main className={styles.main3}>
        <Title>Captains Quarters</Title> {/* Title added here */}
        <Wrapper>
          <CrewCards />
        </Wrapper>
      </main>
    </Section2Styled>
  );
}

const Section2Styled = styled.div`
  background: linear-gradient(#171615, #2e2d2a);
  padding-top: 90px;
  padding-bottom: 40px;
  @media (max-width: 600px) {
    padding-top: 90px;
  }
`;

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.h1` // Styled component for the title
  font-size: 36px;
  font-weight: bold;
  color: #f0e9e2;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
  font-family: 'Pirate', sans-serif; // You can use a pirate-themed font if available
`;

