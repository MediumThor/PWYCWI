import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { keyframes, css } from 'styled-components';
import { useRef, useState } from 'react';



const Section2Styled = styled.div`
  background: linear-gradient( #171615, #2e2d2a);

  background: linear-gradient( #CDC2A4, #171615);
    background: linear-gradient( #2e2d2a, #171615);
     box-shadow: inset -20px -20px 240px rgba(0, 0, 0, 1),
inset 20px 20px 240px rgba(0, 0, 0, 1);

  min-height: 850px; // Adjust this value as needed
  justify-content: center;
`;

const Wrapper = styled.div`
padding-top: 120px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 80vw;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;



const slideInFromLeft = keyframes`
 100% {
    transform: translateY(0%);
    opacity: 1;
  }
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
 
`;


const ServicesBackground = styled.div`
  display: flex; // Center the child element
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 60px;
  padding-top: 160px;
  margin-top: -90px;
  margin-bottom: -90px;
  background-color: black;
  box-shadow: 10px 20px 20px 2px rgba(0,0,0,0.5);
`;

const ServicesTitle = styled.h1`

  text-align: center;
  font-size: 3em;
  color: #E8E3D5;
  overflow: hidden;
  padding-top: 20px;
  margin-top: -180px;
  padding-bottom: 10px;
  margin-bottom: -90px;
  background-color: Black;
  transform: translateY(100%);


  ${props => props.isIntersecting && css`
    animation: ${slideInFromLeft} 1.2s ease-in-out forwards;
  `}
`;
const FacebookFeedWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;  // Adjust this as needed
  width: 100%;       // Add this line
`;

const Caption = styled.h2`
  margin-top: 60px;

  text-align: center;
  color: #E8E3D5;
  font-family: 'Arial', sans-serif;
  margin-bottom: 120px;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  background: #000000;
  border-radius: 20px;
  border: 2px solid #E8E3D5;
  padding: 20px;
  margin-right: 15px;
  margin-left: 15px;

  opacity: 0;
  animation: slideFade 2s forwards;

  @keyframes slideFade {
    0% {
      transform: translateX(-50%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Title = styled.h3`
  color: #ffffff;
  font-family: 'Arial', sans-serif;
`;

const DateTime = styled.p`
  color: #898989;
  font-family: 'Arial', sans-serif;
`;

const Description = styled.p`
  color: #898989;
  font-family: 'Arial', sans-serif;
`;


const LeftDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RightDiv = styled.div`
  flex: 1;
  padding: 20px;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;



const ImageWrapper = styled.div`
  flex: 1;
  padding: 10px;
`;

const Image = styled.img`
  max-width: 200px;
  max-height: 200px;
`;

const InfoWrapper = styled.div`
  flex: 2;
  padding: 10px;
`;




// Your events data
const events = [
  { title: 'Double-Handed Race', date: '2023-06-18', time: '10:00 AM', description: 'This is a description.', image: '/path/to/image1.jpg' },
  { title: 'Queens Cup', date: '2023-06-30', time: '12:00 PM', description: 'https://www.ssyc.org/queen-s-cup-race.', image: '/path/to/image2.jpg' },
  { title: 'Event 3', date: '2023-06-15', time: '02:00 PM', description: 'Yet another description.', image: '/path/to/image3.jpg' },
  { title: 'Event 4', date: '2023-06-16', time: '04:00 PM', description: 'And one more description.', image: '/path/to/image4.jpg' },
];

export default function Section2() {

  const [isIntersecting, setIsIntersecting] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.unobserve(titleRef.current);
  }, []); // empty dependency array to run effect once


  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  useEffect(() => {
    // Check if the SDK has been loaded
    if (document.getElementById('facebook-jssdk')) {
      return;
    }

    // Create a script element
    let script = document.createElement('script');
    script.id = 'facebook-jssdk';

    // Set the script source
    script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v8.0&autoLogAppEvents=1';

    // Insert the script into the body
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (window.FB) {
      const container = document.querySelector('.fb-page');
      if (container) {
        window.FB.XFBML.parse(container);
      }
    }
  }, ['.fb-page']);


  return (
    <Section2Styled id="section2">
      <main>
        <ServicesBackground>
          <ServicesTitle isIntersecting={isIntersecting} ref={titleRef}>Events</ServicesTitle>
        </ServicesBackground>
        <Wrapper>
          <LeftDiv>
          </LeftDiv>
          <RightDiv>
            <Caption>Join us for our public events! We welcome everyone to participate and enjoy these special occasions with us.</Caption>

            <Slider {...settings}>
              {events.map((event, i) => (
                <EventCard key={i} event={event} />
              ))}
            </Slider>
          </RightDiv>
          <FacebookFeedWrapper>
            <div
              className="fb-page"
              dangerouslySetInnerHTML={{
                __html: `
      <div class="fb-page" 
        data-href="https://www.facebook.com/PWYCWI" 
        data-tabs="timeline" 
        data-width="800px" 
        data-height="500px" 
        data-small-header="false" 
        data-adapt-container-width="true" 
        data-hide-cover="false" 
        data-show-facepile="true">
      </div>
      `,
              }}
            />
          </FacebookFeedWrapper>

        </Wrapper>

      </main>
    </Section2Styled>
  );
}

// EventCard component
function EventCard({ event }) {
  return (
    <Card>
      <ImageWrapper>
        <Image src={event.image} alt={event.title} />
      </ImageWrapper>
      <InfoWrapper>
        <Title>{event.title}</Title>
        <DateTime>{event.date} {event.time}</DateTime>
        <Description>{event.description}</Description>
      </InfoWrapper>
    </Card>
  );
}

// Styled components


