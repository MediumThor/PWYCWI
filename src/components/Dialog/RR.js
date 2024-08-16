import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const StyledButton = styled.a`
  text-decoration: none;
`;

const StyledImage = styled.img`
  height: auto;
  width: 80%;
  padding-left: 10px;
  @media (max-width: 600px) {
    width: 100%;
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

const HistoryDialog = ({ open, onClose, scroll }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth={"md"} 
    >
      <CenteredDialogTitle id="scroll-dialog-title">2024 Rendezvous Race</CenteredDialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <ImageWrapper>
          <StyledImage src="https://i.imgur.com/kQYvc4z.png" alt="2024 Rendezvous Race Flyer" />
        </ImageWrapper>
        <StyledButtonWrapper>
          <StyledButton href="assets/Other/_Rendezvous Entry Form 2024.pdf" download>
            <Button variant="contained" color="primary">Download Entry Form</Button>
          </StyledButton>
          <StyledButton href="assets/Other/Rendezvous Liability Waiver.pdf" download>
            <Button variant="contained" color="primary">Download Liability Waver</Button>
          </StyledButton>
          <StyledButton href="assets/Other/Port Washington YC Rendezvous NOR 2024.pdf" download>
            <Button variant="contained" color="primary">Download NOR</Button>
          </StyledButton>
        </StyledButtonWrapper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HistoryDialog;
