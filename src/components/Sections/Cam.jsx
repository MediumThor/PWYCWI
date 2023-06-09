import React from 'react';
import styled from 'styled-components';

const Section4Styled = styled.div`
  background-color: #000000;
  padding-top: 100px;
  margin-top: -300px;
  margin-bottom: 70px;
  height: 900px;
  text-align: center; // This will center the link
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  left: 25%;
  padding-top: 56.25%;
  overflow: hidden;
`;

const WebcamIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0%;
  width: 50%;
  height: 50%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const WebcamLink = styled.a`
  position: relative;
  top: -350px; // Adjust this value as needed
  color: #ffffff; // Change this to the color you want for the link
  text-decoration: none; // This removes the underline
  transition: 0.3s; // This makes the hover effect transition smoothly

  &:hover {
    cursor: pointer; // This changes the cursor to a pointer on hover
    filter: brightness(80%); // This reduces the brightness of the link on hover
  }
`;


const Cam = () => {
      return (
            <Section4Styled id="section6">
                  <main>
                        <Wrapper>
                              <WebcamIframe
                                    src="https://api.wetmet.net/widgets/stream/frame.php?ruc=10-06-01&width=&height="
                                    title="Webcam"
                              />


                        </Wrapper>
                        <WebcamLink href="http://www.lakerart.com/links.htm" target="_blank" rel="noopener noreferrer">
                              Other Great Lakes Webcams
                        </WebcamLink>
                  </main>
            </Section4Styled>
      );
};

export default Cam;
