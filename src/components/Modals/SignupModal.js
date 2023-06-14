import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { TextField, Button, FormControlLabel, Checkbox, Radio, RadioGroup } from '@material-ui/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const ModalTitle = styled.h2`
  margin-top: 1%;
    margin-top: -40px;
  text-align: center;
  borderBottom: '1px solid gray';
  color: #000; 
  
  @media (max-width: 600px) {
  }
`;

const StyledButton = styled.button`
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



const StyledText = styled.div`
margin-bottom: 20%;
  padding: 20px;
  color: #000;  // make text black
`;



const ImageWrapper = styled.div`
margin-top: 5%;
`;


const StyledImage = styled.img`
  height: auto;  // let the browser decide the height based on the aspect ratio
  width: 100%;  // occupy the full width of the parent container
  padding-left: 10px;
  @media (max-width: 600px) {
    width: 25%;  // limit width to 25% under 600px screen width
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-y: auto;  // makes content scrollable vertically when it overflows
  overflow-x: hidden; 
  margin-bottom: 40px;
  color: Black;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin: 10px 0;
    width: 40%;
  }
`;

export default function SignupModal({ isOpen, onRequestClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    html2canvas(document.querySelector("#capture")).then(canvas => {
      document.body.appendChild(canvas);  // if you want see your screenshot
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("download.pdf");
    });
  };

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
      <ModalTitle style={{ textAlign: 'center', borderBottom: '1px solid gray' }}>Membership Application</ModalTitle>
      <ContentWrapper>
        <form id="capture" onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField {...register('dateOfApplication', { required: "Date of application is required" })} placeholder="Date of Application" type="date" />
          {errors.dateOfApplication && <p>{errors.dateOfApplication.message}</p>}

          <StyledTextField {...register('name')} placeholder="Name(s) of Applicant" />
          <StyledTextField {...register('homeCity')} placeholder="Home City" />
          <StyledTextField {...register('state')} placeholder="State" />
          <StyledTextField {...register('occupation')} placeholder="Occupation(s)" />
          <StyledTextField {...register('employer')} placeholder="Employer(s)" />
          <StyledTextField {...register('hobbiesOrSpecialInterests')} placeholder="Hobbies or Special Interests" multiline />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, marginRight: '10px' }}>
              <RadioGroup {...register('boatOwnership')}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes, I own a boat" />
                <FormControlLabel value="no" control={<Radio />} label="No, I don't own a boat" />
                <FormControlLabel value="intend" control={<Radio />} label="I intend to own a boat in the near future" />
              </RadioGroup>
              {errors.boatOwnership && <p>Please select a boat ownership status</p>}
            </div>

            <div style={{ flex: 1, marginLeft: '10px' }}>
              <RadioGroup {...register('crewStatus')}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes, I regularly crew on a boat" />
                <FormControlLabel value="no" control={<Radio />} label="No, I don't regularly crew on a boat" />
                <FormControlLabel value="interested" control={<Radio />} label="I would be interested in doing so" />
              </RadioGroup>
              {errors.crewStatus && <p>Please select a crew status</p>}
            </div>
          </div>


          <StyledTextField {...register('boatName')} placeholder="Name of your boat" />
          <StyledTextField {...register('boatType')} placeholder="Sail or Power Make of boat" />
          <StyledTextField {...register('boatLocation')} placeholder="Slip and location of boat" />

          <StyledTextField {...register('sponsor1')} placeholder="Print Name & Signature of Sponsor 1" />
          <StyledTextField {...register('sponsor1Acquaintance')} placeholder="How long have you known the candidate and nature of acquaintance?" multiline />
          <StyledTextField {...register('sponsor2')} placeholder="Print Name & Signature of Sponsor 2" />
          <StyledTextField {...register('sponsor2Acquaintance')} placeholder="How long have you known the candidate and nature of acquaintance?" multiline />

          <StyledTextField {...register('address')} placeholder="Address" multiline />
          <StyledTextField {...register('email')} placeholder="Email Address(s)" />
          <StyledTextField {...register('phone')} placeholder="Phone number(s)" />

          <StyledTextField {...register('expectations')} placeholder="What are your expectations from membership in the PWYC?" multiline />
          <StyledTextField {...register('contributions')} placeholder="What can the PWYC expect from you?" multiline />

          <StyledTextField {...register('volunteerInterests')} placeholder="What areas might you be interested in helping out?" multiline />

          <FormControlLabel control={<Checkbox {...register('readRequirements')} />} label="I have read and understand the 'Requirements for Membership' outlined on the 'Become A Member' page of the PWYC Website." />
          {errors.readRequirements && <p>You must read and understand the requirements for membership</p>}

          <div style={{ position: 'absolute', left: '50%', gap: '30px', bottom: '20px', transform: 'translateX(-50%)' }}>
            <StyledButton onClick={onRequestClose}>Close</StyledButton>
            <StyledButton type="submit">Submit</StyledButton>
          </div>
        </form>
      </ContentWrapper>
      <div style={{ position: 'absolute', left: '50%', gap: '30px', bottom: '20px', transform: 'translateX(-50%)' }}>

      </div>
    </Modal>
  );
}