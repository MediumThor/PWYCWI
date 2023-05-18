import styled from 'styled-components';
import React, { useRef } from "react";
import { SectionContentBlock } from '../base2/base';
import { FaFacebook } from "react-icons/fa";

const Section3Styled = styled.div`background-color: black;`;

const Footer = styled.footer`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #333;
  color: white;
`;

const FooterLink = styled.a`
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
  width: 250px;
  height: 250px;
`;

export default function Section3() {
  return (
    <Section3Styled id="section3">
      <SectionContentBlock>
        {/* Your Section Content */}
      </SectionContentBlock>
      <Footer>
        <MapImage src="https://cdn.discordapp.com/attachments/1090123749300379740/1108616374680567938/image.png" alt="Map" />
        <FooterLink href="https://www.google.com/maps/place/Port+Washington+Yacht+Club/@43.3918745,-87.8681159,17z/data=!3m1!4b1!4m6!3m5!1s0x8804ea1cbd453539:0x7d30452aaee626c4!8m2!3d43.3918706!4d-87.865541!16s%2Fg%2F1tfpq7zy">
          Visit us! (Click for Map)
        </FooterLink>
        <FooterLink href="mailto:your-email@example.com">Contact Us</FooterLink>
        <FacebookLink href="https://www.facebook.com/PWYCWI">
          <FaFacebook style={{ marginRight: '10px' }} /> Facebook
        </FacebookLink>
        <p>430 N Lake St Port, Port Washington, WI 53074</p>
      </Footer>
    </Section3Styled>
  );
}
