import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Box, Tabs, Tab } from '@mui/material';

const ModalTitle = styled.h2`
  margin-top: -40px;
  text-align: center;
  border-bottom: 1px solid gray;
  color: black;


  @media (max-width: 600px) {
    margin-top: -20px;
  }
`;

const StyledButton = styled.button`
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.3);
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
    border-color: #87cefa;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  }
`;

const StyledImage = styled.img`
  height: 000px;
  padding-left: 10px;
`;
const ImageWrapper = styled.div``;

const StyledText = styled.div`
  padding: 20px;
  color: Black;
`;

const TabBox = styled.div`
  margin-top: 0px;
  text-align: center;
  color: black;
  top: calc(1%);
  z-index: 1;
`;



const ContentWrapper = styled.div`
  display: flex;
  border: 2px solid black;
  overflow: auto; /* Change to 'auto' to enable scrolling */
  min-height: 0;
  height: 100%;
  width: 100%;
`;


export default function SailingModal({ isOpen, onRequestClose }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel({ children, value, index }) {
    return <div hidden={value !== index}>{value === index && children}</div>;
  }

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
      <ModalTitle>Sailing Info</ModalTitle>
      <TabBox>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="NOR" />
            <Tab label="SI" />
            <Tab label="Course" />
            <Tab label="Registration" />

          </Tabs>
        </Box>
      </TabBox>

      <ContentWrapper>
        <TabPanel value={value} index={0}>
          <embed src="/assets/SailingInfo/PWYC NOR 2023.pdf" width="350%" height="100%" type="application/pdf" />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <embed src="/assets/SailingInfo/PWYC SI 2023.pdf" width="350%" height="100%" type="application/pdf" />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <embed src="/assets/SailingInfo/PWYC COURSE 2023.pdf" width="350%" height="100%" type="application/pdf" />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <embed src="/assets/SailingInfo/PWYC Registration 2023.pdf" width="350%" height="100%" type="application/pdf" />
        </TabPanel>

      </ContentWrapper>
      <div style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)' }}>
        <StyledButton onClick={onRequestClose}>Close</StyledButton>
      </div>
    </Modal>
  );
}
