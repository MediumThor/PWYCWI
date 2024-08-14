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
display: none;
justify-content: center;
  color: #0000EE;
  text-decoration: underline;
  
`;

const OfficerNumber = styled.a`
display: flex;
justify-content: center;
  color: #000000;
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




const BoardDialog = ({ open, onClose, scroll }) => {

  const boardData = [
    {
      title: 'Immediate Past Commodore',
      name: 'Terry White',
      number: '262-339-0841',
      image: 'PWYCWI HEADSHOTS/gallery/1.jpg' 

    },
    {
      title: 'Second Past Commodore',
      name: 'Bill Schanen IV',
      number: '262-483-3994',
      image: 'PWYCWI HEADSHOTS/gallery/10.jpg' 
    },
   
  
    {
      title: 'SECOND YEAR DIRECTORS:',
      name: 'Lynn Brown',
      number: '414-828-7787',
      image: 'PWYCWI HEADSHOTS/gallery/3.jpg' 

    },
    {
      title: '',
      name: 'Dennis Cherny',
      number: '414-333-4138',
      image: 'PWYCWI HEADSHOTS/gallery/2.jpg' 

    },
    {
      title: '',
      name: 'Heather Huggett',
      number: '414-899-3468',
      image: 'PWYCWI HEADSHOTS/gallery/5.jpg'
    },

    {
      title: 'DIRECTORS:',
      name: 'Brian Kenzdor',
      number: '262-208-1320 ',
      image: 'PWYCWI HEADSHOTS/gallery/placeholder.png' 

    },

    {
      title: '',
      name: 'Doug Podzilni',
      number: '414-716-5249',
      image: 'PWYCWI HEADSHOTS/gallery/4.jpg'

    },

    {
      title: '',
      name: 'Gary Pritzlaff',
      number: '470-249-7126',
      image: 'PWYCWI HEADSHOTS/gallery/6.jpg' 

    },

    {
      title: 'RACE DIRECTOR',
      name: 'Dan Garcia',
      number: '414-217-7790',
      image: 'PWYCWI HEADSHOTS/gallery/11.jpg' 
    },


    {
      title: 'PORTHOLE EDITOR',
      name: 'Bill Prince',
      number: '262-483-3994',
      image: 'PWYCWI HEADSHOTS/gallery/placeholder.png' 
    },

    {
      title: 'BAR MANAGER',
      name: 'Dina Bell',
      number: '414-861-0668',
      image: 'PWYCWI HEADSHOTS/gallery/1.jpg' 
    },

    {
      title: 'WEBMASTER',
      name: 'Ryan Barbian',
      number: 'tech@pwycwi.com',
      image: 'PWYCWI HEADSHOTS/gallery/13.jpg' 
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

            <OfficerTitle>{officer.title}</OfficerTitle>
            <OfficerName>{officer.name}</OfficerName>
            <OfficerNumber> {officer.number}</OfficerNumber>
            <OfficerImage src={`/${officer.image}`} alt={officer.name} />

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
