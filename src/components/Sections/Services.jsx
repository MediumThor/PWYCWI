import React, { useState } from 'react';
import "src/styles/Home.module.scss";
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss'


const Section1Styled = styled.div`

  background-color: #000000;
  padding-top: 150px;
    padding-bottom: 50px;
    margin-bottom: -70px;
    margin-top: -150px

 
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  color: gray;

  @media (min-width: 1169px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width:100vw;
  }
`;


const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 20px;
  flex-basis: 0; // Add this line
  flex-grow: 1; // And this line

  img {
    max-width: 100%;
    height: auto;
  }

  p {
    max-width: 400px;
  }
  

  @media (min-width: 769px) {
    p {
      max-width: none;
    }
  }
`;


const ImageWrapper = styled.div`
position: relative;
  height: 300px;
  width: 400px;
  margin-bottom: 10px;

  @media (max-width: 1200px) {
    max-width: 90vw; // 90% of the viewport width
  }

  @media (max-width: 600px) {
    max-width: 90vw; // 90% of the viewport width
  }
   @media (max-width: 500px) {
    width: 90%; // Here too
    max-width: 90vw; // 90% of the viewport width
    margin-bottom: -50px;
  }
    @media (max-width: 400px) {
          width: 120%; // Here too
    max-width: 120vw; // 90% of the viewport width
    margin-bottom: -20px;
  }
`;

const StyledImageTitle = styled.h3`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  text-align: center;
  color: white;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;

  @media (max-width: 600px) {
    width: 100%; 
  }
  
`;


const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.clamped ? '7' : 'none'};
  -webkit-box-orient: vertical;  
  overflow: hidden;
  width: 85%; // Reduce this value to make the text column narrower.
  margin: auto; // Center the text column.
 @media (max-width: 600px) {
    width: 95%;
  }
`;


const Button = styled.button`
  background-color: transparent;
  border: none;
  color: gray;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

export default function Section1() {
  const [isClamped1, setClamped1] = useState(true);
  const [isClamped2, setClamped2] = useState(true);
  const [isClamped3, setClamped3] = useState(true);

  return (
    <Section1Styled id="section1">
      <main className={styles.main}>

        <Wrapper>
          <Column>
            <ImageWrapper>
              <StyledImageTitle>Cruising & Fishing</StyledImageTitle>
              <Image src='https://media.discordapp.net/attachments/1090123749300379740/1108561597561057310/Harbor.jpg?width=1382&height=1036' alt='Image 1' />
            </ImageWrapper>

            <Text clamped={isClamped1}>
              <p>Embark on delightful cruising trips to various ports alongside fellow members of the yacht club. These trips offer the opportunity to explore new destinations and enjoy the camaraderie of like-minded boating enthusiasts.</p>

              <p> Engage in thrilling fishing tournaments, including the highly anticipated Lloyd Purnell Annual Fishing Tournament. This tournament celebrates the art of fishing, and awards are presented to the most accomplished anglers who demonstrate exceptional skill and success in their endeavors. It's an exciting opportunity to showcase your fishing prowess and compete among fellow members of the yacht club.</p>
            </Text>
            <Button onClick={() => setClamped1(!isClamped1)}>{isClamped1 ? 'Show more +' : 'Show less'}</Button>
          </Column>
          <Column>
            <ImageWrapper>
              <StyledImageTitle>Social Functions</StyledImageTitle>
              <Image src='https://cdn.discordapp.com/attachments/1090123749300379740/1108617807920386109/IMG_3937.jpg' alt='Image 2' />
            </ImageWrapper>

            <Text clamped={isClamped2}>
              <p>The Club offers a diverse range of activities throughout the year, ensuring an engaging social calendar. Members can look forward to an abundance of enjoyable parties and informal group trips that take place at any time of the year.</p>

              <p>Furthermore, the Club actively participates in the city's Fish Day celebration and takes part in various other community events. This involvement includes contributing funds towards school scholarships and making the Club's facilities available for charitable fundraising events.</p>

              <p>During the summer months, the clubhouse bar is open every Friday evening. This welcoming space serves not only Club members but also visiting boaters from other yacht clubs, providing a vibrant atmosphere for all to enjoy.</p>
            </Text>
            <Button onClick={() => setClamped2(!isClamped2)}>{isClamped2 ? 'Show more +' : 'Show less'}</Button>
          </Column>
          <Column>
            <ImageWrapper>
              <StyledImageTitle>Sail Racing</StyledImageTitle>
              <Image src='https://media.discordapp.net/attachments/1090123749300379740/1108561598282481664/Karisma.jpg?width=1382&height=1036' alt='Image 3' />
            </ImageWrapper>

            <Text clamped={isClamped3}>
              <p>The Port Washington Yacht Club organizes an exciting Saturday Buoy racing series that caters to both racing class and cruising class boats. These thrilling races take place on most weekends from June through September.</p>

              <p> In addition to the regular buoy races, there are two notable long-distance weekend races. One race involves sailing to and from Sheboygan, while the other race takes participants to and from Milwaukee. These races add an element of fun, and individual awards are presented to deserving participants.</p>

              <p> Furthermore, the Port Washington Yacht Club proudly sponsors the renowned Clipper Cup race, which spans across the lake. Additionally, the club hosts the exhilarating 'Double Handed' race, which takes place along the west shore and across the lake. Both of these races culminate at the Port Washington Harbor,
                where exciting award parties are held at the yacht club, creating a memorable and celebratory atmosphere.</p>
            </Text>
            <Button onClick={() => setClamped3(!isClamped3)}>{isClamped3 ? 'Show more +' : 'Show less'}</Button>
          </Column>
        </Wrapper>
      </main>
    </Section1Styled >
  );
}
