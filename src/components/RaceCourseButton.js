import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: none; // Initially hide the button
  margin: auto; // Center the button
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6);
  font-size: 1.3rem;
  border-radius: 5px;
  border: 2px solid #FAF9F6;
  background-color: rgb(0,0,0,0.7);
  color: #E8E3D5;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;  // Add transition for smooth hover effect

  &:hover {
    color: #996515;
    border-color: #87CEFA;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8);
    background-color: rgb(0,0,0,0.9);
  }

  @media (max-width: 600px) {
    display: block; // Show the button on small screens
  }

  @media (max-width: 700px) {
    font-size: 1rem; // decrease font size
    padding: 8px 16px; // decrease padding
  }

  @media (max-width: 640px) {
    font-size: .9rem; // decrease font size
    padding: 2px 15px; // decrease padding
  }
`;

const Image = styled.img`
  max-width: 100%; // Limit the size of the image
  max-height: 100%;
`;

export default function CourseToggle({ imageSrc1, imageSrc2 }) {
    const [currentImage, setCurrentImage] = React.useState(null);

    const handleClick = () => {
        if (!currentImage) {
            setCurrentImage(imageSrc1);
        } else if (currentImage === imageSrc1) {
            setCurrentImage(imageSrc2);
        } else {
            setCurrentImage(imageSrc1);
        }
    };

    const getButtonText = () => {
        if (!currentImage) {
            return "Show Race Course Map";
        } else if (currentImage === imageSrc1) {
            return "Show Race Course List";
        } else {
            return "Show Race Course Map";
        }
    }

    return (
        <div>
            <Button onClick={handleClick}>{getButtonText()}</Button>
            {currentImage && <Image src={currentImage} alt="Race Course" />}
        </div>
    );
}
