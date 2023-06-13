import styled from 'styled-components';
import React from 'react';
import { FaFacebook } from "react-icons/fa";

const Section3Styled = styled.div`
  background: linear-gradient( #171615, #2e2d2a);
  margin-top: -260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

    @media (max-width: 640px) {
        margin-top: 70px;

    ;
  }
`;

const HistorySection = styled.div`
  padding-bottom: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const HistoryHeading = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
`;

const HistoryText = styled.p`
  font-size: 1.2em;
  text-align: center;
  max-width: 800px;
`;



const Footer = styled.footer`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #333;
  color: white;
  border-radius: 10px;

  @media (max-width: 740px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
`;

const FooterText = styled.p`
  padding: 10px;
`;

const FooterLink = styled.a`
  padding: 10px;
  color: white;
  text-decoration: none;
  margin-bottom: 30px;

  &:hover {
    color: lightgray;
  }
`;

const MapLink = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    color: lightgray;
  }
`;

const FacebookLink = styled(FooterLink)`
  display: flex;
  align-items: center;
  font-size: 1.2em;
`;

const MapImage = styled.img`
  width: 100%;
  max-width: 370px;
  height: auto;
  border-radius: 10px;
  transition: all 1.0s ease-in-out;

  &:hover {
    filter: brightness(0.8);
    cursor: pointer;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: none;
  }
`;


export default function Section3() {
  return (
    <Section3Styled id="section3">
      <HistorySection>

        <HistoryText>
          The Port Washington Yacht Club was founded in 1935 by a group of sailing enthusiasts.
          Over the years, we have grown into a community of boaters of all kinds, from sailors to fishermen.
          We're proud of our rich history and we're committed to fostering a love for boating in the Port Washington community.
        </HistoryText>
      </HistorySection>
      <Footer>
        <FooterSection>
          <MapLink href="https://www.google.com/maps/place/Port+Washington+Yacht+Club/@43.3918745,-87.8681159,17z/data=!3m1!4b1!4m6!3m5!1s0x8804ea1cbd453539:0x7d30452aaee626c4!8m2!3d43.3918706!4d-87.865541!16s%2Fg%2F1tfpq7zy">
            <MapImage src="https://cdn.discordapp.com/attachments/1090123749300379740/1108616374680567938/image.png" alt="Map" />
          </MapLink>
        </FooterSection>
        <FooterSection>
          <FooterLink href="mailto:your-email@example.com">Contact Us</FooterLink>
          <FooterLink href="/tos">Terms of Service</FooterLink>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="mailto:tech@pwycwi.com">Contact Support</FooterLink>

        </FooterSection>
        <FooterSection>
          <FacebookLink href="https://www.facebook.com/PWYCWI">
            <FaFacebook style={{ marginRight: '10px' }} /> Facebook
          </FacebookLink>
        </FooterSection>
        <FooterSection>
          <FooterText>
            430 N Lake St Port, Port Washington, WI 53074 <br />
          </FooterText>
          <FooterText>
            © {new Date().getFullYear()} Port Washington Yacht Club. All Rights Reserved.
          </FooterText>
        </FooterSection>
      </Footer>
    </Section3Styled>
  );
}




