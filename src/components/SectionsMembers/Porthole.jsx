import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import Slideshow from 'src/components/Slideshow.jsx';
import { firestore as db } from '../../../firebase';
import { Carousel } from 'react-responsive-carousel'; // You might need to install this package
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Section4Styled = styled.div`
  background-color: #000000;
  margin-top: -150px;
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Wrapper = styled.div`
  margin-top: 150px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CarouselContainer = styled.div`
  margin-top: 50px;

  width: 900px; // Adjust width as needed
  height: 600px; // Adjust height as needed
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
            const ref = db.collection('portholeImages').orderBy('sequence'); // Order by the 'sequence' field
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
                  <main>
                        <CarouselContainer>

                              <Carousel >
                                    {images.map((image, index) => (
                                          <ImageContainer key={index}>
                                                <img src={image} alt="" />
                                          </ImageContainer>
                                    ))}
                              </Carousel>
                        </CarouselContainer>

                  </main>

            </Section4Styled>
      );
};




export default Section4;
