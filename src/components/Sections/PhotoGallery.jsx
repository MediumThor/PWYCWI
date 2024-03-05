import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { firestore as db } from '../../../firebase';


const PhotoGalleryStyled = styled.div`
  background-color: #000000;
  margin-top: -50px;
  margin-bottom: 200px;
  display: flex; // Add display: flex back
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;

const GalleryWrapper = styled.div`
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

const GalleryContainer = styled.div`
  background-color: #000000;
  width: 1200px; // Default width for larger screens
  height: 600px;
  margin: 0 auto; // Center the container

  @media screen and (orientation: landscape) and (max-width: 800px) {
    width: 80%;
    height: auto; // Allow the height to adjust automatically
  }

  @media (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;


const GalleryImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 600px; // Set to the desired height
  width: 100%;
  

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain; // Maintain the aspect ratio
  }
`;

const Caption = styled.p`
    color: #fff; // Example: set text color to white
    font-size: 14px;
    text-align: center;
    // Add other styling as needed
`;



const PhotoGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const ref = db.collection('galleryImages').orderBy('sequence');
        const unsubscribe = ref.onSnapshot(snapshot => {
            const fetchedImages = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                fetchedImages.push({ url: data.url, caption: data.caption }); // Include the caption
            });
            setImages(fetchedImages);
        });
        return () => unsubscribe();
    }, []);

    return (
        <PhotoGalleryStyled id="photoGallery">
            <GalleryWrapper>
                <GalleryContainer>
                    <Carousel>
                        {images.map((imageObj, index) => (
                            <GalleryImageContainer key={index}>
                                <img src={imageObj.url} alt="" />
                                <p className="legend">{imageObj.caption}</p>
                            </GalleryImageContainer>
                        ))}
                    </Carousel>
                </GalleryContainer>
            </GalleryWrapper>
        </PhotoGalleryStyled>
    );
};

export default PhotoGallery;
