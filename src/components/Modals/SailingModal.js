import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const ModalTitle = styled.h2`
  margin-top: -40px;
  text-align: center;
  borderBottom: '1px solid gray';
  @media (max-width: 600px) {
    margin-top: -20px;
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

const StyledImage = styled.img`
height: 400px;
  padding-left: 10px;
`;
const ImageWrapper = styled.div`

`;

const StyledText = styled.div`
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
   overflow-y: hidden; 
  overflow-x: hidden; 
  @media (max-width: 600px) {
    flex-direction: column;
    
  }
`;

export default function SailingModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Sailing Programs Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
          width: '80%',
          height: '60%',
          margin: 'auto',
          overflowX: 'hidden',
          padding: '5%',
          boxShadow: '10px 10px 25px rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          '@media (max-width: 600px)': {
            width: '90%',
          }
        }
      }}
    >
      <ModalTitle style={{ textAlign: 'center', borderBottom: '1px solid gray' }}>Sailing Info</ModalTitle>
      <ContentWrapper>
        <ImageWrapper>
          <StyledImage src='' alt='Sailing Info' />
        </ImageWrapper>
        <StyledText>
          <p></p>
        </StyledText>
      </ContentWrapper>
      <div style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)' }}>
        <StyledButton onClick={onRequestClose}>Close</StyledButton>
      </div>
    </Modal >
  );
}
