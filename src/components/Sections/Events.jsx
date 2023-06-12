import React, { useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


// Your events data
const events = [
  { title: 'Event 1', date: '2023-06-13', time: '10:00 AM', description: 'This is a description.', image: '/path/to/image1.jpg' },
  { title: 'Event 2', date: '2023-06-14', time: '12:00 PM', description: 'This is another description.', image: '/path/to/image2.jpg' },
  { title: 'Event 3', date: '2023-06-15', time: '02:00 PM', description: 'Yet another description.', image: '/path/to/image3.jpg' },
  { title: 'Event 4', date: '2023-06-16', time: '04:00 PM', description: 'And one more description.', image: '/path/to/image4.jpg' },
];

export default function Section2() {
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


const Section2Styled = styled.div`
  background: linear-gradient( #171615, #2e2d2a);

  background: linear-gradient( #CDC2A4, #171615);
  min-height: 800px; // Adjust this value as needed
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


const FacebookFeedWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;  // Adjust this as needed
  width: 100%;       // Add this line
`;

const Caption = styled.h2`
  margin-top: 60px;

  text-align: center;
  color: #242424;
  font-family: 'Arial', sans-serif;
  margin-bottom: 120px;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  background: #000000;
  border-radius: 20px;
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
  color: #242424;
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


