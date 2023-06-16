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

const HistoryDialog = ({ open, onClose, scroll }) => {
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
                    <StyledImage src="/images/PWYCHistorysmall.jpg" alt="Club History" />
                </ImageWrapper>
                <StyledText>
                    <p>The establishment of the Port Washington Yacht Club dates back to 1956 when a group of pleasure boaters, led by Harbor Master Alfred Freese and Wm. F. Schanen Jr., came together with the purpose of enhancing the safety of the then perilous Port Washington harbor.</p>
                    <p>In 1972, the club obtained a lease from the city for an old bathhouse situated on the beach, just one block north of the marina. This bathhouse was subsequently transformed into the club's current clubhouse, which features a bar, kitchen facilities, a lounge, a spacious social area with dining tables, and a dance floor. Recently, the members of the club purchased the building outright from the city, becoming the sole owners of their clubhouse.</p>
                </StyledText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default HistoryDialog;
