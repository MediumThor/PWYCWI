import React, { useState } from 'react'
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss'

import "src/styles/styles.module.scss";

const Section2Styled = styled.div`background-color: #000000;`;



export default function Section5() {
      return (
            <Section2Styled id="section5">
                  <main className={styles.main3}>
                        <ForecastWrapper>
                              <StyledIframe
                                    src="https://www.meteoblue.com/en/weather/widget/three/port-washington_united-states_5267776?geoloc=fixed&nocurrent=0&noforecast=0&days=7&tempunit=FAHRENHEIT&windunit=KNOT&layout=light"
                                    frameBorder="0"
                                    scrolling="NO"
                                    allowTransparency="true"
                                    style={{ width: '950px', height: '340px' }}
                                    sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
                              />
                              <div>
                                    <a href="https://www.meteoblue.com/en/weather/week/port-washington_united-states_5267776?utm_source=weather_widget&utm_medium=linkus&utm_content=three&utm_campaign=Weather%2BWidget"
                                          target="_blank" rel="noopener noreferrer">meteoblue</a>
                              </div>
                        </ForecastWrapper>
                        <Wrapper>
                              <StyledIframe
                                    name="wind-map"
                                    id="wind-map"
                                    src="https://embed.windy.com/embed2.html?lat=43.422&lon=-87.858&detailLat=44.503&detailLon=-87.981&width=650&height=450&zoom=10&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
                                    frameBorder="0"
                                    width="600"
                                    height="450"
                              />
                              <StyledIframe
                                    name="wind-map"
                                    id="wind-map"
                                    src="https://embed.windy.com/embed2.html?lat=43.683&lon=-87.744&detailLat=43.683&detailLon=-87.744&width=650&height=450&zoom=8&level=surface&overlay=rain&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
                                    frameBorder="0"
                                    width="600"
                                    height="450"
                              />

                              <div id="cont_3274e04d0de5cc52126b6266c50babe3">
                                    <script type="text/javascript" async src="https://www.theweather.com/wid_loader/3274e04d0de5cc52126b6266c50babe3"></script>
                              </div>
                        </Wrapper>
                  </main>
            </Section2Styled>
      );
}

const ForecastWrapper = styled.div`
 min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 600px) {
    display:none;
  }
`;


const StyledIframe = styled.iframe`
  align: top;
  frameborder: 0;
  scrolling: no;
  allowtransparency: no;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
