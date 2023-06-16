import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const StyledText = styled.p`
  text-align: center;
  color: black;
`;

const StyledLink = styled.a`
  color: #0000EE;
  text-decoration: underline;
`;

const StyledTextBody = styled.p`
  text-align: center;
  color: black;
  margin-bottom: 20%;
`;

const StyledImage = styled.img`
  height: auto;
  width: 50%;
  padding-left: 10px;
  @media (max-width: 600px) {
    width: 25%;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

const CenteredDialogTitle = styled(DialogTitle)`
  text-align: center;
`;

const LinksDialog = ({ open, onClose, scroll }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <CenteredDialogTitle id="scroll-dialog-title">PWYC History</CenteredDialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <ImageWrapper>
          <StyledImage src="" alt="Club History" />
        </ImageWrapper>
        <StyledText>
          <p>Here is some space to put links.</p>
        </StyledText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LinksDialog;
