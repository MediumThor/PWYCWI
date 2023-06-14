import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import QuoteSlider from '../QuoteSlider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SectionWithVideo() {
    const videoRef = useRef(null);
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting),
            {
                rootMargin: '0px',
                threshold: 0.5
            }
        );
        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isIntersecting && videoRef.current) {
            videoRef.current.play();
        } else if (!isIntersecting && videoRef.current) {
            videoRef.current.pause();
        }
    }, [isIntersecting]);

    return (
        <SectionStyled id="sectionWithVideo">
            <VideoWrapper>
                <video ref={videoRef} muted loop>
                    <source src="https://cdn.discordapp.com/attachments/1090123749300379740/1117675999186915358/Sailing1.mp4" type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
            </VideoWrapper>
            <QuoteSlider />
        </SectionStyled>
    );
}

const SectionStyled = styled.div`
  background: linear-gradient( #171615, #2e2d2a);

  min-height: 600px;
  justify-content: center;
  
 box-shadow: inset -20px -20px 240px rgba(0, 0, 0, 1),
inset 20px 20px 240px rgba(0, 0, 0, 1);
`;

const VideoWrapper = styled.div`
padding-top: 100px;
padding-bottom: -220px;

  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  video {
    width: 100%;
    height: auto;
  }
`;
