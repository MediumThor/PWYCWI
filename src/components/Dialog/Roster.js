import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useState } from 'react';



// ...

const StyledText = styled.p`
  text-align: center;
  color: black;
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

const Roster = styled.div`
  width: 100 vw;
  height:
  @media (max-width: 600px) {
    width: 100%;
  }
`;



const RosterDialog = ({ open, onClose, scroll }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const pdfFile = "/assets/Other/PWYC Roster 2023 - SJ.6.29.pdf"; // PDF file path


  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth={true} // Makes the dialog responsive
      maxWidth={"lg"} // Defines the maximum width the dialog can take
    >
      <CenteredDialogTitle id="scroll-dialog-title">Roster</CenteredDialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <ImageWrapper>
        </ImageWrapper>
        <StyledText>

          <Roster>
            <embed src={pdfFile} // Path to the PDF file
              width="100%"
              height="100%"
              type="application/pdf"
              style={{ minHeight: '100vh' }}  // 60% of the viewport height
            />
          </Roster>

        </StyledText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RosterDialog;
