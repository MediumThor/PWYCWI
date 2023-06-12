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
                    <source src="/sailingVidTest2.mp4" type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
            </VideoWrapper>
            <QuoteSlider />
        </SectionStyled>
    );
}

const SectionStyled = styled.div`
  background: #000000;
  min-height: 600px;
  justify-content: center;
`;

const VideoWrapper = styled.div`
padding-top: 100px;
padding-bottom: -110px;

  width: 100%;
  max-width: 70%;
  margin: 0 auto;
  video {
    width: 100%;
    height: auto;
  }
`;
