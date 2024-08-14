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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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

const OfficerImage = styled.img`
  margin-top: 30px;
  max-width: 230px;
  border-radius: 3%;
  margin-bottom: 10px;
`;

const CenteredDialogTitle = styled(DialogTitle)`
  text-align: center;
`;

const OfficerDialog = ({ open, onClose, scroll }) => {
  const officerData = [
    {
      title: 'COMMODORE',
      name: 'Troy Bretl',
      duties: 'Finances & Roster',
      email: 'commodore@pwycwi.com',
      image: 'PWYCWI HEADSHOTS/gallery/7.jpg' 

    },
    {
      title: 'VICE COMMODORE',
      name: 'Joe Eernisse',
      duties: 'House/Maintenance & Fish Day',
      email: 'vicecommodore@pwycwi.com',
      image: 'PWYCWI HEADSHOTS/gallery/8.jpg' 

    },
    {
      title: 'REAR COMMODORE ',
      name: 'Stacey Berg',
      duties: 'Private Parties & Club Social Parties',
      email: 'rearcommodore@pwycwi.com',
      image: 'PWYCWI HEADSHOTS/gallery/placeholder.png' 


    },
    {
      title: 'SECRETARY',
      name: 'Sara Janeshek',
      duties: 'Correspondence & Archives',
      email: 'secretary@pwycwi.com',
      image: 'PWYCWI HEADSHOTS/gallery/12.jpg' 

    },
    {
      title: 'TREASURER',
      name: 'Chuck Motl',
      duties: 'Finances & Roster',
      email: 'treasurer@pwycwi.com',
      image: 'PWYCWI HEADSHOTS/gallery/9.jpg' 

    },
    {
      title: 'FLEET CAPTAIN',
      name: 'Mark Lackovic',
      duties: 'New Membership & Race Events',
      email: 'fleetcaptain@pwycwi.com',
      image: 'PWYCWI HEADSHOTS/gallery/placeholder.png' 

    }
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
      <CenteredDialogTitle id="scroll-dialog-title">Officers</CenteredDialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        {officerData.map((officer, index) => (
          <OfficerInfo key={index}>
            <OfficerImage src={`/${officer.image}`} alt={officer.name} />
            <OfficerTitle>{officer.title}</OfficerTitle>
            <OfficerName>{officer.name}</OfficerName>
            <OfficerDuties>Duties: {officer.duties}</OfficerDuties>
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

export default OfficerDialog;
