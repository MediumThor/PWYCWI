import React from "react";
import { Parallax, Background } from "react-parallax";
import styled from 'styled-components';

const ParallaxImage = () => (
    <Section1Styled>
        <Parallax strength={500}>
            <Background className="custom-bg">
                <div
                    style={{
                        height: 2000,
                        width: 2000,
                        position: 'relative',
                        backgroundImage: "url('https://cdn.discordapp.com/attachments/1090123749300379740/1118328813265375333/litha-bacchi-highresscreenshot00039.jpg')"
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    }} />
                </div>
            </Background>
            <div style={{ textAlign: 'center' }}>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <h2 style={{
                    fontFamily: "'Pirata One', cursive",
                    fontSize: '3em', // adjust as needed
                    fontStyle: 'italic'
                }}>“It isn't that life ashore is distasteful to me. But life at sea is better.”</h2>
                <p>Francis Drake</p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </Parallax>
    </Section1Styled>
);

const Section1Styled = styled.div`
margin-top:20px;
  width:100%;
  background-color: #ffffff;
`;

export default ParallaxImage;
