import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const OfficerInfo = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const OfficerTitle = styled.h3`
display: flex;
justify-content: center;
  color: #333;
  margin-bottom: 0;
`;

const OfficerName = styled.h4`
display: flex;
justify-content: center;
  color: #666;
  margin-top: 5px;
`;

const OfficerDuties = styled.p`
display: flex;
justify-content: center;
  color: #333;
`;

const OfficerEmail = styled.a`
display: flex;
justify-content: center;
  color: #0000EE;
  text-decoration: underline;
`;

const CenteredDialogTitle = styled(DialogTitle)`
  text-align: center;
`;




const BoardDialog = ({ open, onClose, scroll }) => {

  const boardData = [
    {
      name: 'Bill Schanen IV',
    },
    {
      name: 'Greta Schanen',
    },
    {
      name: 'Ken Paulson',
    },
    {
      name: 'Bill Prince',
    },
    {
      name: 'Rich Reichelsdorfer',
    },
    {
      name: 'Lynn Brown',
    },
    {
      name: 'Dennis Cherny',
    },
    {
      name: 'Joe Eernisse',

    },

    // add more items here...
  ];


  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth={true} // Makes the dialog responsive
      maxWidth={"sm"}
    >
      <CenteredDialogTitle id="scroll-dialog-title">Board Members</CenteredDialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        {boardData.map((officer, index) => (
          <OfficerInfo key={index}>
            <OfficerName>{officer.name}</OfficerName>
            <OfficerEmail href={`mailto:${officer.email}`}>Email: {officer.email}</OfficerEmail>
          </OfficerInfo>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoardDialog;
