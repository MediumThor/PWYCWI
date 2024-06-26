import React, { useState } from 'react'
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss'

import "src/styles/styles.module.scss";

const Section2Styled = styled.div`
  background: linear-gradient(#2e2d2a, #171615);
  background: linear-gradient(#2e2d2a, #171615);

  padding-top: 100px;
  padding-bottom: 470px;
  display: flex;
  justify-content: center;
  align-items: center;
     box-shadow: inset -20px -20px 240px rgba(0, 0, 0, 1),
inset 20px 20px 240px rgba(0, 0, 0, 1);
  
  @media (max-width: 600px) {
        padding-bottom: 00px;

   
    
  }

`;

const ImageWrapper = styled.div`
  border: 2px solid #E8E3D5;
  border-radius: 20px;
  padding: 10px;
  overflow: hidden;
  width: 75%;
  
              box-shadow: 10px 20px 20px 2px rgba(0,0,0,0.7);

                @media (max-width: 600px) {
                  width: 90%;
      border: 0px solid black;

  }
`;


const ForecastWrapper = styled.div`
  padding-top: 0px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  border-radius: 20px; // Added border-radius


  @media (max-width: 600px) {
      margin-bottom: 0px;
    display:none;
    
  }
   @media (max-width: 1200px) {
    
      padding-top: 40px;
  margin-bottom: 30px;
  }
`;


const StyledIframe = styled.iframe`
  align: top;
  frameborder: 0;
  scrolling: no;
  border: 2px solid black;
  border-radius: 20px; // Added border-radius
  max-width: 90%;
  height: 300px;

  @media (max-width: 600px) {

    width: 90%;
      border: 0px solid black;
        border-radius: 0px; // Added border-radius
      height: 240px;
       padding-top: 20px;

  }
   @media (max-width: 1200px) {
    width: 90%;
  }
`;

const Wrapper = styled.div`

  min-height: 40vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;





export default function Section5() {
  return (
    <Section2Styled id="section5">
      <ImageWrapper>

        <ForecastWrapper>

          <StyledIframe
            src="https://www.meteoblue.com/en/weather/widget/three/port-washington_united-states_5267776?geoloc=fixed&nocurrent=0&noforecast=0&days=7&tempunit=FAHRENHEIT&windunit=KNOT&layout=light"
            frameBorder="0"
            scrolling="NO"
            style={{ width: '1200px', height: '340px' }}
            sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
          />

        </ForecastWrapper>
        <Wrapper>
          <StyledIframe
            name="wind-map"
            id="wind-map"
            src="https://embed.windy.com/embed2.html?lat=43.422&lon=-87.858&detailLat=44.503&detailLon=-87.981&width=650&height=450&zoom=10&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
            frameBorder="0"
            width="480"
            height="350"
          />
          <StyledIframe
            name="wind-map"
            id="wind-map"
            src="https://embed.windy.com/embed2.html?lat=43.683&lon=-87.744&detailLat=43.683&detailLon=-87.744&width=650&height=450&zoom=8&level=surface&overlay=rain&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
            frameBorder="0"
            width="480"
            height="350"
          />


        </Wrapper>
      </ImageWrapper>

    </Section2Styled>
  );
}

