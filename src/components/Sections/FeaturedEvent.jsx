import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import styles from 'src/styles/Home.module.scss'
import "src/styles/styles.module.scss";
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Tooltip from '@material-ui/core/Tooltip';


const Section2Styled = styled.div`
    background-color: #000000;
    margin-top: -80px;
    margin-bottom: -200px;
    color: #fff;
    padding: %;
`;

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 20px;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const Image = styled.img`
    max-width: 300px;
    height: auto;
    margin-right: 20px;

    @media (max-width: 600px) {
        margin-right: 0;
        margin-bottom: 20px;
    }
`;

const Description = styled.div`
    flex-grow: 1;
    font-size: 1.5rem;
`;

const FlyerLink = styled.a`
    display: block;
    color: #fff;
    text-decoration: underline;
    margin-top: 20px;
`;
const FlyerWrapper = styled.div`
    width: 50vw;
    height: 110vh;
    position: relative;
    display: flex;
    flex-direction: column; // Arrange children vertically
    justify-content: center; // Centers the PDF horizontally
    align-items: center; // Centers items vertically in the column
  
    @media (max-width: 600px) {
        width: 100%;
        height: auto;
    }
`;
const EventFlyer = styled.div`
    width: 60%; // Adjusted from 65% to 40%
    height: 60%; // Adjusted from 65% to 40%
  
    @media (max-width: 600px) {
        width: 70%; // Adjust this as needed
        height: 70%; // Adjust this as needed
    }
`;

const CarouselWrapper = styled.div`
margin-top: 10%;
margin-left: 10%;
    width: 50vw;
    height: 100vh;
    position: relative;
  
    @media (max-width: 600px) {
        width: 100%;
        height: auto;
    }
`;

const StyledCarousel = styled(Carousel)`
    width: 90%; // adjust these values
    height: 50vh; // adjust these values

    @media (max-width: 600px) {
        width: 100%;
        height: auto;
    }
`;

const DownloadButton = styled.a`
    display: inline-block;
    border: 2px solid #fff;
    color: #fff;
    background: transparent;
    text-decoration: none;
    padding: 10px 20px;
    font-size: 1em;
    margin-top: 3px;
    border-radius: 5px;
    transition: color 0.3s ease;

    &:hover {
        color: lightblue;
    }
`;


const flyerFile = "/assets/Other/2023 Venetian Night Entry Form.pdf"; // PDF file path


export default function Section6() {
      return (
            <Section2Styled id="section6">
                  <main className={styles.main3}>
                        <Wrapper>
                              <CarouselWrapper>
                                    <StyledCarousel
                                          showArrows={true}
                                          infiniteLoop={true}
                                          showStatus={false}
                                          showIndicators={false}
                                          showThumbs={false}
                                          autoPlay={true}
                                          dynamicHeight={false}
                                    >
                                          {/* Replace with your images */}
                                          <div>
                                                <img src="/assets/Other/VenetianNight/1.jpeg" alt="Event Image 1" />
                                          </div>
                                          <div>
                                                <img src="/assets/Other/VenetianNight/2.jpeg" alt="Event Image 2" />
                                          </div>
                                          <div>
                                                <img src="/assets/Other/VenetianNight/3.jpg" alt="Event Image 3" />
                                          </div>
                                          <div>
                                                <img src="/assets/Other/VenetianNight/4.jpg" alt="Event Image 4" />
                                          </div>
                                          <div>
                                                <img src="/assets/Other/VenetianNight/5.jpeg" alt="Event Image 5" />
                                          </div>
                                          <div>
                                                <img src="/assets/Other/VenetianNight/6.jpeg" alt="Event Image 6" />
                                          </div>
                                          <div>
                                                <img src="/assets/Other/VenetianNight/7.jpg" alt="Event Image 7" />
                                          </div>
                                          {/* Add more images as needed */}
                                    </StyledCarousel>
                              </CarouselWrapper>


                              <Description>
                                    <FlyerWrapper>
                                          <EventFlyer>
                                                <img src="https://cdn.discordapp.com/attachments/1090123749300379740/1134856884726288484/image.png" alt="Flyer" style={{ maxWidth: '100%', height: 'auto' }} />
                                          </EventFlyer>
                                          <Tooltip title="Download the flyer, fill out and submit to the Club" arrow>
                                                <DownloadButton href={`${flyerFile}#toolbar=0`} download>Register</DownloadButton>
                                          </Tooltip>
                                    </FlyerWrapper>
                              </Description>
                        </Wrapper>
                  </main>
            </Section2Styled>
      );
}
