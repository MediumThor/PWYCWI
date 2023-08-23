import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import styles from 'src/styles/Home.module.scss'
import "src/styles/styles.module.scss";
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Tooltip from '@material-ui/core/Tooltip';
import RaceRegistrationDialog from '../Dialog/RaceRegistration';


const Section2Styled = styled.div`
    background-color: #000000;
    margin-top: -80px;
    margin-bottom: -100px;
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
    width: 50%; // Adjusted from 65% to 40%
    height: 50%; // Adjusted from 65% to 40%
  
    @media (max-width: 600px) {
        width: 70%; // Adjust this as needed
        height: 70%; // Adjust this as needed
    }
`;

const CarouselWrapper = styled.div`
margin-top: 10%;
margin-left: 0%;
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
    margin-top: 24px;
    border-radius: 5px;
    transition: color 0.3s ease;
    margin-right: 40px;
    cursor: pointer; // Add this line

    &:hover {
        color: lightblue;
    }
`;

const RegisterButton = styled.a`
    display: inline-block;
    border: 2px solid #fff;
    color: #fff;
    background: transparent;
    text-decoration: none;
    padding: 10px 20px;
    font-size: 1em;
    margin-top: 24px;
    border-radius: 5px;
    transition: color 0.3s ease;
    margin-right: 40px;
    cursor: pointer; // Add this line

    &:hover {
        color: lightgreen;
    }
`;

const Caption = styled.h2`
  margin-top: 60px;
    font-size: 1em;

  text-align: center;
  color: #E8E3D5;
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px;
`;


const flyerFile = "/assets/Other/Rendezvous Entry Form 2023.pdf"; // PDF file path
const norFile = "/assets/Other/Rendezvous NOR-SI entry 2023.pdf"

export default function FeaturedEvent2() {
      const [dialogOpen, setDialogOpen] = useState(false);

      const handleOpenDialog = () => {
            setDialogOpen(true);
      };

      const handleCloseDialog = () => {
            setDialogOpen(false);
      };
      return (
            <Section2Styled id="section6">
                  <main className={styles.main3}>
                        <Wrapper>
                              <CarouselWrapper>
                                    <Description>
                                          <FlyerWrapper>
                                                <Caption>
                                                      Registration forms will be available the morning of the race at the club and are due by 9:00 am.
                                                </Caption>
                                                <EventFlyer>
                                                      <img src="https://cdn.discordapp.com/attachments/1090123749300379740/1143703455429570651/image.png" alt="Flyer" style={{ maxWidth: '100%', height: 'auto' }} />
                                                </EventFlyer>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                                                      <Tooltip title="Download the form, fill out and submit to the Club" arrow>
                                                            <DownloadButton href={`${flyerFile}#toolbar=0`} download>
                                                                  Register
                                                            </DownloadButton>
                                                      </Tooltip>
                                                      <Tooltip title="Download the NOR" arrow>
                                                            <DownloadButton href={`${norFile}#toolbar=0`} download>
                                                                  NOR
                                                            </DownloadButton>
                                                      </Tooltip>
                                                      <Tooltip title="Online Form" arrow>
                                                            {/* Button to open the Race Registration Dialog */}
                                                            <RegisterButton color="primary" onClick={handleOpenDialog}>
                                                                  Online Form
                                                            </RegisterButton>
                                                      </Tooltip>

                                                </div>
                                          </FlyerWrapper>
                                    </Description>
                              </CarouselWrapper>
                        </Wrapper>
                  </main>
                  {/* Race Registration Dialog Component */}
                  <RaceRegistrationDialog open={dialogOpen} onClose={handleCloseDialog} />
            </Section2Styled>
      );
}