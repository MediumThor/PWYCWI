import React, { useState } from 'react';
import "src/styles/Home.module.scss";
import styled from 'styled-components';
import styles from 'src/styles/Home.module.scss'


const Section1Styled = styled.div`

  background-color: black;
  padding-top: 150px;
    margin-bottom: -100px;

  .active {
    border-bottom: 10px solid white;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  color: gray;

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;


const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 20px;

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
  height: 300px;
  width: 400px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
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
  width: 75%; // Reduce this value to make the text column narrower.
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

              <Image src='https://media.discordapp.net/attachments/1090123749300379740/1108561597561057310/Harbor.jpg?width=1382&height=1036' alt='Image 1' />
            </ImageWrapper>

            <Text clamped={isClamped1}>
              <p>Enjoy cruising trips to other ports with yacht club members.
                Participate in fishing tournaments including the Lloyd Purnell Annual Fishing Tournament with awards given for the most successful fishermen.</p>          </Text>
            <Button onClick={() => setClamped1(!isClamped1)}>{isClamped1 ? '' : 'Show less'}</Button>
          </Column>
          <Column>
            <ImageWrapper>

              <Image src='https://cdn.discordapp.com/attachments/1090123749300379740/1108617807920386109/IMG_3937.jpg' alt='Image 2' />
            </ImageWrapper>

            <Text clamped={isClamped2}>
              <p>Club activities include a year round social calendar that not only consists of a full schedule of fun parties, but also informal group trips anytime during the year.
                In addition, the Club participates in the city's Fish Day celebration and is involved in other community activities. Such activities include contributing funds to school scholarships and making the club available for charitable fund raising events.
                The clubhouse bar is open each Friday evening during the summer months for use by its members and visiting boaters from other yacht clubs.</p>
            </Text>
            <Button onClick={() => setClamped2(!isClamped2)}>{isClamped2 ? 'Show more +' : 'Show less'}</Button>
          </Column>
          <Column>
            <ImageWrapper>

              <Image src='https://media.discordapp.net/attachments/1090123749300379740/1108561598282481664/Karisma.jpg?width=1382&height=1036' alt='Image 3' />
            </ImageWrapper>

            <Text clamped={isClamped3}>
              <p>Saturday Buoy racing series for both racing class and cruising class boats, are held on most weekends, June through September.
                Two long distant weekend races, one to and from Shebo

                ygan and the other to and from Milwaukee are fun races for which individual awards are given.
                The Port Washington Yacht Club sponsors the across the lake Clipper Cup race and hosts the west shore and across the lake 'Double Handed' race. Both races finish at Port Washington Harbor with award parties held at the yacht club.</p>
            </Text>
            <Button onClick={() => setClamped3(!isClamped3)}>{isClamped3 ? 'Show more +' : 'Show less'}</Button>
          </Column>
        </Wrapper>
      </main>
    </Section1Styled>
  );
}
