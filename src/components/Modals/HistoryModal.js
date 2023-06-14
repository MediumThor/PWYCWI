import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const ModalTitle = styled.h2`
  margin-top: 1%;
  text-align: center;
  borderBottom: '1px solid gray';
  color: #000;  // make text black
  @media (max-width: 600px) {
  }
`;

const StyledButton = styled.button`
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.3);
  z-index: 2;
  font-size: 1.4rem;
  border-radius: 5px;
  border: 2px solid white;
  background-color: #000000;
  color: white;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    color: #996515;
    border-color: #87CEFA;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  }
`;



const StyledText = styled.div`
margin-bottom: 20%;
  padding: 20px;
  color: #000;  // make text black
`;



const ImageWrapper = styled.div`
margin-top: 5%;
`;


const StyledImage = styled.img`
  height: auto;  // let the browser decide the height based on the aspect ratio
  width: 100%;  // occupy the full width of the parent container
  padding-left: 10px;
  @media (max-width: 600px) {
    width: 25%;  // limit width to 25% under 600px screen width
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-y: auto;  // makes content scrollable vertically when it overflows
  overflow-x: hidden; 
  margin-bottom: 40px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
export default function HistoryModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Signup"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1000 // Set a higher value for the overlay

        },
        content: {
          width: '80%',
          height: '80%',
          margin: 'auto',
          borderRadius: '20px',
          overflowX: 'none',
          padding: '5%',
          boxShadow: '10px 10px 25px rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001, // Set a higher value for the content

          '@media (max-width: 600px)': {
            width: '90%'
          }
        }
      }}
    >
      <ModalTitle>Club History</ModalTitle>
      <ContentWrapper>
        <ImageWrapper>
          <StyledImage src='/images/PWYCHistorysmall.jpg' alt='Club History' />
        </ImageWrapper>
        <StyledText>
          <p>The establishment of the Port Washington Yacht Club dates back to 1956 when a group of pleasure boaters, led by Harbor Master Alfred Freese and Wm. F. Schanen Jr., came together with the purpose of enhancing the safety of the then perilous Port Washington harbor.</p>
          <p>In 1972, the club obtained a lease from the city for an old bathhouse situated on the beach, just one block north of the marina. This bathhouse was subsequently transformed into the club's current clubhouse, which features a bar, kitchen facilities, a lounge, a spacious social area with dining tables, and a dance floor. Recently, the members of the club purchased the building outright from the city, becoming the sole owners of their clubhouse.</p>
        </StyledText>
      </ContentWrapper>
      <div style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)' }}>
        <StyledButton onClick={onRequestClose}>Close</StyledButton>
      </div>
    </Modal >
  );
}
