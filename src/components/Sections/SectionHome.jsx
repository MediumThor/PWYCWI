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

const Section1Styled = styled.div`
  width:100%;
  margin-top: 100px;
  background-color: black;
`;

const BackgroundBox = styled.div`
  position: relative;
  width: 100%;
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
`;

const SubTitle = styled.h1`
  position: absolute;
  top: 67%;
  left: 24%;
  font-size: .4em;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.img`
  position: absolute;
  top: 35%;  // Adjust this value as needed to position the logo correctly under the title
  left: 10%;  // Adjust this value to align the logo with the title
  height: 400px;  // Adjust this value as needed to size the logo correctly
  width: auto;
`;

const FlexContainer = styled.div`
 position: absolute;
  top: 20%;
  left: 60%;
  display: flex;
  justify-content: start;
  align-items: center;
`;


export default function SectionHome() {
  const { account, activateBrowserWallet, deactivate, chainId } = useEthers()
  const userBalance = useEtherBalance(account)
  const [address, setAddress] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [totalSupply, setTotalSupply] = useState(false)

  return (
    <Section1Styled id="sectionHome">
      <main className={styles.main}>
        <BackgroundBox>
          <Parallax
            blur={{ min: -20, max: 20 }}
            strength={400}
            bgImage="https://cdn.discordapp.com/attachments/1090123749300379740/1108559911656357990/IMG_3286.jpg"
            bgImageAlt="Background"
            bgImageStyle={{ height: '100%', width: '100%' }}
          >

            <Title>Port Washington<br />Yacht Club</Title>

            <Logo src="https://cdn.discordapp.com/attachments/1090123749300379740/1108610068833902663/PWYC_FLAG.png" alt="Logo" />
            <FlexContainer>


            </FlexContainer><div style={{ height: '100vh' }} />
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
