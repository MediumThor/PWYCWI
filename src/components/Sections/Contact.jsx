import styled from 'styled-components';
import React from 'react';
import { FaFacebook } from "react-icons/fa";

const Section3Styled = styled.div`
  background: linear-gradient( #171615, #2e2d2a);
  padding-top: 00px;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 20px;
  justify-content: center;
  padding: 30px;
   @media (max-width: 600px) {
  grid-template-columns: repeat(1, 1fr);
    text-align: center;
  }
`;

const OfficersSection = styled.div`
 padding-top: 100px;
`;
const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 20px;
  justify-content: center;
  padding: 30px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: gray; // changes the text color to light gray
`;

const InfoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Footer = styled.footer`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #333;
  color: white;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterText = styled.p`
  padding: 10px ; // Added padding
`;

const Title = styled.p`
color: White;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
    padding: 10px ; // Added padding


  &:hover {
    color: lightgray;
  }
`;

const FacebookLink = styled(FooterLink)`
  display: flex;
  align-items: center;
  font-size: 1.2em;
    padding: 10px ; // Added padding

`;

const MapImage = styled.img`
  width: 370px;
  height: 300px;
  border-radius: 10px; 
  transition: all 1.0s ease-in-out;  // Add transition for smooth hover effect
  @media (max-width: 600px) {
    width: 230px;
    height: 230px;
  }
  &:hover {
    filter: brightness(1.0);  // Makes the image slightly darker on hover
    border: 0px solid white;  // Adds a 1px white border on hover
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.9);  // Adds a white box-shadow on hover
    cursor: pointer;  // Changes the cursor to a pointer on hover
  }
`;


const OfficersTitle = styled.h2`
  text-align: center;
  color: white;
  margin-bottom: 20px;
  padding-bottom: 20px; // Adjust this value as needed
  border-bottom: 1px solid darkgray;
  width: 80vw; // Sets the width of the title (and therefore the line)
  margin: 0 auto; // Centers the title horizontally
`;



export default function Section3() {


  return (
    <Section3Styled id="section3">

      <Footer>
        <FooterLink href="https://www.google.com/maps/place/Port+Washington+Yacht+Club/@43.3918745,-87.8681159,17z/data=!3m1!4b1!4m6!3m5!1s0x8804ea1cbd453539:0x7d30452aaee626c4!8m2!3d43.3918706!4d-87.865541!16s%2Fg%2F1tfpq7zy">
          <MapImage src="https://cdn.discordapp.com/attachments/1090123749300379740/1108616374680567938/image.png" alt="Map" />
        </FooterLink>
        <FooterLink href="mailto:your-email@example.com">Contact Us</FooterLink>
        <FacebookLink href="https://www.facebook.com/PWYCWI">
          <FaFacebook style={{ marginRight: '10px' }} /> Facebook
        </FacebookLink>
        <FooterText>430 N Lake St Port, Port Washington, WI 53074</FooterText>
      </Footer>
    </Section3Styled >
  );
}

