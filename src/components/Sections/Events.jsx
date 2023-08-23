import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { keyframes, css } from 'styled-components';
import { useRef } from 'react';
import { firestore } from '../../../firebase';
import { Document, Page } from 'react-pdf';



const Section2Styled = styled.div`
  background: linear-gradient( #171615, #2e2d2a);
  background: linear-gradient( #CDC2A4, #171615);
    background: linear-gradient( #2e2d2a, #171615);
     box-shadow: inset -20px -20px 240px rgba(0, 0, 0, 1),
inset 20px 20px 240px rgba(0, 0, 0, 1);

  min-height: 850px; // Adjust this value as needed
  justify-content: center;
  margine-bottom: 120px;
`;

const Wrapper = styled.div`
padding-top: 120px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 80vw;
  @media (max-width: 1080px) {
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

      @media (max-width: 768px) {
   display: none;
  }
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

    @media (max-width: 768px) {
   display: none;
  }
`;
const FacebookFeedWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 2%;
  margin-top: 50px;  // Adjust this as needed
  width: 100%;       // Add this line

   @media (max-width: 500px) {
    display:none;
  }
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
  flex-direction: column; // Change this to column
  align-items: center;
  background: #000000;
  border-radius: 20px;
  border: 2px solid #E8E3D5;
  padding: 20px;
  margin-right: 15px;
  margin-left: 15px;


  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Description = styled.p`
  color: #898989;
  font-family: 'Arial', sans-serif;
  overflow: auto;
  max-height: 150px; // or whatever height you find appropriate
`;

const Title = styled.h3`
  color: #ffffff;
  font-family: 'Arial', sans-serif;
`;

const DateTime = styled.p`
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
margin-top: 20px;
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
  max-width: 300px;
  max-height: 400px;
     @media (max-width: 768px) {
   max-height: 300px;
     max-width: 200px;

  }
`;

const InfoWrapper = styled.div`
  flex: 1;
  padding: 10px;
`;




export default function Section2() {


  const [events, setEvents] = useState([]);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [loading, setLoading] = useState(true);

  const titleRef = useRef(null);

  useEffect(() => {
    const ref = firestore.collection('events');
    const unsubscribe = ref.onSnapshot(snapshot => {
      const fetchedEvents = [];
      snapshot.forEach(doc => {
        fetchedEvents.push(doc.data());
      });
      setEvents(fetchedEvents);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);



  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };




  if (loading) {
    return <div>Loading events...</div>;
  }
  return (
    <Section2Styled id="section2">
      <main>
        <ServicesBackground>
          <Caption>Join us for our public events! We welcome everyone to participate and enjoy these special occasions with us.</Caption>
        </ServicesBackground>

        <Wrapper>
          <RightDiv>
            <Slider {...settings}>
              {events.map((event, i) => (
                <EventCard key={i} event={event} />
              ))}
            </Slider>
          </RightDiv>
          <FacebookFeedWrapper>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FPWYCWI&tabs=timeline&width=900&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=832489078225536"
              width="500"
              height="800"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allowFullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
            </iframe>
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
