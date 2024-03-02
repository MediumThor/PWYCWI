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
            <div style={{padding: '42.6% 0 0 0', position: 'relative'}}>
                    <iframe 
                        src="https://player.vimeo.com/video/918698315?badge=0&autopause=0&player_id=0&app_id=58479" 
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                        style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}} 
                        title="Sailing1">
                    </iframe>
                </div>
                <script src="https://player.vimeo.com/api/player.js"></script>
           
            </VideoWrapper>
            <QuoteSlider />
        </SectionStyled>
    );
}

const SectionStyled = styled.div`
  background: linear-gradient( #171615, #2e2d2a);

  min-height: 600px;
  justify-content: center;
  margin-bottom: 100px;
  
     box-shadow: inset -20px -20px 240px rgba(0, 0, 0, 1),
inset 20px 20px 240px rgba(0, 0, 0, 1);


      @media (max-width: 768px) {
     min-height: 00px;


  }
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


      @media (max-width: 768px) {
   padding-bottom: 20px;

  }
`;


