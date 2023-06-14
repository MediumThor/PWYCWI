import React, { useEffect, useRef, useState } from 'react';
import { Parallax, Background } from 'react-parallax';
import styled from 'styled-components';

const ParallaxImage = () => {
    const fadeRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            });
        });

        if (fadeRef.current) {
            observer.observe(fadeRef.current);
        }

        return () => {
            if (fadeRef.current) {
                observer.unobserve(fadeRef.current);
            }
        };
    }, []);

    return (
        <Section1Styled>
            <Parallax strength={400}>
                <Background className="custom-bg">
                    <div
                        style={{
                            height: 2000,
                            width: 2000,
                            position: 'relative',
                            backgroundImage:
                                "url('https://cdn.discordapp.com/attachments/1090123749300379740/1118318156671352942/litha-bacchi-highresscreenshot00042.jpg')",
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            }}
                        />
                    </div>
                </Background>
                <div style={{ textAlign: 'center' }}>
                    <br />
                    <br />
                    <br />
                    <FadeInDiv ref={fadeRef} isVisible={isVisible}>
                        <h2
                            style={{
                                fontFamily: "'Pirata One', cursive",
                                fontSize: '2.5em',
                                fontStyle: 'italic',
                                transition: 'opacity 1s ease-in-out',
                                opacity: isVisible ? 1 : 0,
                            }}
                        >
                            “It isn't that life ashore is distasteful to me. But life at sea is better.”
                        </h2>
                        <p>Francis Drake</p>
                    </FadeInDiv>
                    <br />
                    <br />
                </div>
            </Parallax>
        </Section1Styled>
    );
};

const Section1Styled = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
  background-color: #ffffff;
`;

const FadeInDiv = styled.div`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

export default ParallaxImage;
