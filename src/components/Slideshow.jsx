import React, { useState } from 'react';
import styled from 'styled-components';

// Import images
import image01 from '../Porthole/01.png';
import image02 from '../Porthole/02.png';
import image03 from '../Porthole/03.png';
import image04 from '../Porthole/04.png';
import image05 from '../Porthole/05.png';
import image06 from '../Porthole/06.png';
import image07 from '../Porthole/07.png';
import image08 from '../Porthole/08.png';
import image09 from '../Porthole/09.png';
import image10 from '../Porthole/10.png';

const Image = styled.img`
  width: 60vw;
  height: auto;
  cursor: pointer;

  @media (max-width: 700px) {
    cursor: zoom-in;
  }
`;

const FullScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(90deg);
  z-index: 1000;
`;

const FullScreenImage = styled.img`
  max-width: 100vw;
  max-height: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5em;
  right: 1em;
  border: none;
  background: transparent;
  font-size: 2em;
  color: white;
  cursor: pointer;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  font-size: 2em;
  color: white;
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slideshow = () => {
    const images = [image01, image02, image03, image04, image05, image06, image07, image08, image09, image10];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleNext = () => setCurrentImageIndex((currentImageIndex + 1) % images.length);
    const handlePrev = () => setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
    const handleFullscreen = () => {
        if (window.innerWidth <= 700) setIsFullscreen(true);
    }

    return (
        <Wrapper>
            <Button onClick={handlePrev}>&lt;</Button>
            <Image src={images[currentImageIndex]} alt="Slideshow" onClick={handleFullscreen} />
            <Button onClick={handleNext}>&gt;</Button>
            {isFullscreen && (
                <FullScreenWrapper>
                    <CloseButton onClick={() => setIsFullscreen(false)}>X</CloseButton>
                    <Button onClick={handlePrev} style={{ position: 'absolute', left: '10px', bottom: '10px' }}>&lt;</Button>
                    <FullScreenImage src={images[currentImageIndex]} alt="Fullscreen view" />
                    <Button onClick={handleNext} style={{ position: 'absolute', right: '10px', bottom: '10px' }}>&gt;</Button>
                </FullScreenWrapper>
            )}
        </Wrapper>
    );
};

export default Slideshow;
