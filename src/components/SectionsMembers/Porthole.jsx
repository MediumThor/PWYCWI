import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { firestore as db } from '../../../firebase';

const Section4Styled = styled.div`
  background-color: #000000;
  margin-top: -150px;
  display: flex; // Add display: flex back
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  margin-top: 50px;
  background-color: #000000;
  width: 100%; // Ensure that it takes the full width
  display: flex;
  flex-direction: column; // Use column for mobile by default
  justify-content: center;
  align-items: center;

  @media (min-width: 1169px) {
  background-color: #000000;
    flex-direction: row; // Use row for desktop
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const CarouselContainer = styled.div`
  background-color: #000000;
  width: 900px; // Default width for larger screens
  height: 600px;
  margin: 0 auto; // Center the container

  @media screen and (orientation: landscape) and (max-width: 800px) {
    width: 100%;
    height: auto; // Allow the height to adjust automatically
  }

  @media (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;


const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;


const Section4 = () => {
      const [images, setImages] = useState([]);

      useEffect(() => {
            const ref = db.collection('portholeImages').orderBy('sequence');
            const unsubscribe = ref.onSnapshot(snapshot => {
                  const fetchedImages = [];
                  snapshot.forEach(doc => {
                        fetchedImages.push(doc.data().url);
                  });
                  setImages(fetchedImages);
            });
            return () => unsubscribe();
      }, []);

      return (
            <Section4Styled id="section4">
                  <Wrapper>
                        <CarouselContainer>
                              <Carousel>
                                    {images.map((image, index) => (
                                          <ImageContainer key={index}>
                                                <img src={image} alt="" />
                                          </ImageContainer>
                                    ))}
                              </Carousel>
                        </CarouselContainer>
                  </Wrapper>
            </Section4Styled>
      );
};

export default Section4;
