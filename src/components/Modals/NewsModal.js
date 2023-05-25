import React from 'react';
import Modal from 'react-modal'; // import the react-modal package
import styled from 'styled-components';

const ModalTitle = styled.h2`
  margin-top: -40px;
  @media (max-width: 600px) {
    margin-top: -20px;
  }
`;

const StyledButton = styled.button`
  // add this line to set a fixed height
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

export default function NewsModal({ isOpen, onRequestClose }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="News"
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
            <ModalTitle style={{ textAlign: 'center', borderBottom: '1px solid gray' }}>News</ModalTitle>
            {/* Insert Club History content here */}
            <div style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)' }}>
                <StyledButton onClick={onRequestClose}>Close</StyledButton>
            </div>
        </Modal>
    );
}
