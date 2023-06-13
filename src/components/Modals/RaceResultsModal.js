import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Menu, Button, MenuItem, SwipeableDrawer, List, ListItem, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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
  height: 400px;
  padding-left: 10px;
`;
const ImageWrapper = styled.div``;

const StyledText = styled.div`
  padding: 20px;
`;

const Results = styled.div`
  width: 80%;
  @media (max-width: 600px) {
    width: 100%;
  }
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

export default function RaceResultsModal({ isOpen, onRequestClose }) {
  const [anchor, setAnchor] = useState('Past Results');
  const [state, setState] = useState({
    bottom: false
  });

  const [open2023, setOpen2023] = useState(false);
  const [open2022, setOpen2022] = useState(false);
  const [openArchives, setOpenArchives] = useState(false);

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const handleClick2023 = () => {
    setOpen2023(!open2023);
  };

  const handleClick2022 = () => {
    setOpen2022(!open2022);
  };

  const handleClickArchives = () => {
    setOpenArchives(!openArchives);
  };

  const list = anchor => (
    <List>
      <ListItem button onClick={handleClick2023}>
        <ListItemText primary="2023" />
        {open2023 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2023} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button onClick={toggleDrawer(anchor, false)}>
            <ListItemText primary="File 1" />
          </ListItem>
          <ListItem button onClick={toggleDrawer(anchor, false)}>
            <ListItemText primary="File 2" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick2022}>
        <ListItemText primary="2022" />
        {open2022 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2022} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button onClick={toggleDrawer(anchor, false)}>
            <ListItemText primary="File 3" />
          </ListItem>
          <ListItem button onClick={toggleDrawer(anchor, false)}>
            <ListItemText primary="File 4" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClickArchives}>
        <ListItemText primary="Archives" />
        {openArchives ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openArchives} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button onClick={toggleDrawer(anchor, false)}>
            <ListItemText primary="File 5" />
          </ListItem>
          <ListItem button onClick={toggleDrawer(anchor, false)}>
            <ListItemText primary="File 6" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Signup"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        },
        content: {
          width: '90%', // Adjust the width value here
          height: '80%',
          margin: 'auto',
          borderRadius: '20px',
          overflowX: 'hidden',
          padding: '5%',
          boxShadow: '10px 10px 25px rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          '@media (max-width: 600px)': {
            width: '90%'
          }
        }
      }}
    >
      <ModalTitle>Race Results</ModalTitle>

      <ContentWrapper>
        <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </SwipeableDrawer>
        <Results>
          <embed src="/assets/RaceResults/Saturday 6-10-23 corrected.pdf" width="100%" height="600" type="application/pdf" />
        </Results>

      </ContentWrapper>
      <div style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)' }}>
        <StyledButton onClick={onRequestClose}>Close</StyledButton>
      </div>
    </Modal>
  );
}
