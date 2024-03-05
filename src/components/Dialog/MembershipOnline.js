import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';
import firebase from 'firebase/app';
import { firestore as db } from '../../../firebase';
import Checkbox from '@material-ui/core/Checkbox';
import ReactSignatureCanvas from 'react-signature-canvas';
import { functions } from '../../../firebase'; // Import the initialized functions module
import { Alert, Dialog, Snackbar, DialogTitle, DialogContent, DialogActions, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, TextField, Typography, Box, Link } from '@mui/material';


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

const CenteredDialogTitle = styled(DialogTitle)`
  text-align: center;
`;

const BlueCheckbox = styled(Checkbox)`
  &.Mui-checked {
    color: #1976d2; /* Blue color for checked checkboxes */
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BlueRadio = styled(Radio)`
  &.Mui-checked {
    color: #1976d2; /* Blue color for checked radio buttons */
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  /* Your existing styles */

  @media (max-width: 700px) { /* Adjust the max-width as per your breakpoint */
    margin-bottom: -0px; /* Adjust the negative margin as needed */
  }
`;

const FormLink = styled(DialogTitle)`
  /* Your existing styles */

  @media (max-width: 700px) { /* Adjust the max-width as per your breakpoint */
display:none;  
}
`;


const MembershipDialogOnline = ({ open, onClose, scroll }) => {
    const [uploadSnackbarOpen, setUploadSnackbarOpen] = useState(false);
    const [uploadSnackbarMessage, setUploadSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('');
    const [submissionComplete, setSubmissionComplete] = useState(false); // New state to track submission completion


    const [openForm, setOpenForm] = useState(false);
    const [form, setForm] = useState({
        date: '',
        applicantName: '',
        address: '',
        city: '',
        state: '',
        phone: '',
        email: '',
        boatName: '',
        typeMake: '',  // Adding typeMake field for boat type and make
        boatLocation: '',  // Adding boatLocation field for boat slip and location
        occupation: '',
        employers: '',  // Adding employers field
        hobbies: '',
        ownBoat: 'Yes', // Default value
        crewBoat: '',   // Adding crewBoat field for boat crew information
        sponsor1: '',   // Adding sponsor1 field
        interests: [],  // Changing interests to an array to hold multiple selections
        sponsor1length: '', // Adding sponsor1length field
        sponsor1how: '',    // Adding sponsor1how field
        sponsor2: '',   // Adding sponsor2 field
        sponsor2length: '', // Adding sponsor2length field
        sponsor2how: '',    // Adding sponsor2how field
        requirementsChecked: false,  // Adding requirementsChecked field
        myExpectations: '', // Adding myExpectations field
        ourExpectations: '',    // Adding ourExpectations field
    });


    const sigPadRef = useRef({});


    const validateForm = () => {
        // Define all the required fields
        const requiredFields = ['date', 'applicantName', 'address', 'city', 'state', 'hobbies', 'phone', 'email', 'occupation', 'interests', 'ownBoat', 'crewBoat', 'sponsor1', 'sponsor1length', 'sponsor1how', 'sponsor2', 'sponsor2length', 'sponsor2how', 'requirementsChecked', 'myExpectations', 'ourExpectations'];
    
        // If the user owns a boat, add the boat information fields to the required fields list
        if (form.ownBoat === 'Yes') {
            requiredFields.push('boatName', 'typeMake', 'boatLocation');
        }
    
        // Check if all required fields are filled in
        const isValid = requiredFields.every(field => !!form[field]);
    
        setIsFormValid(isValid);
    };

    useEffect(() => {
        if (submissionComplete && !uploadSnackbarOpen && !errorSnackbarOpen) {
            onClose(); // Close the modal
            setSubmissionComplete(false); // Reset submission state for next time
        }
    }, [submissionComplete, uploadSnackbarOpen, errorSnackbarOpen, onClose]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        validateForm();
    };

    useEffect(() => {
        validateForm();
    }, [form]);


    const handleSubmit = async () => {
      
      

        // Create a new object with all the form data, including the signature
        const completeForm = { ...form, signature: signatureImage };

        // Check if the form is valid before submitting
        if (!isFormValid) {
            setErrorSnackbarOpen(true);
            setErrorSnackbarMessage('Please fill in all required fields.');
            return;
        }
        const signatureImage = sigPadRef.current.toDataURL();

        try {
            // Write to Firestore
            const docRef = await db.collection('newApplications').add(completeForm);
            console.log(`Document written with ID: ${docRef.id}`);

            // Call Firebase function
            const sendNewApplicationEmail = functions.httpsCallable('sendNewApplicationEmail');
            const emailResponse = await sendNewApplicationEmail(completeForm);

            // Check if the email was sent successfully
            if (emailResponse.data && emailResponse.data.status === 'success') {
                console.log('New application email sent');
                setUploadSnackbarOpen(true);
                setUploadSnackbarMessage('Application submitted successfully!');
                setSnackbarSeverity('success');
                handleClose();
            } else {
                throw new Error('Failed to send email');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorSnackbarOpen(true);
            setErrorSnackbarMessage('An error occurred while submitting the application. Please try again.');
            setSnackbarSeverity('error');
        }
    };






    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return; // Do not close if the user clicks away
        }
        // Reset Snackbar and submission states
        setUploadSnackbarOpen(false);
        setErrorSnackbarOpen(false);
        setSubmissionComplete(false);

        onClose(); // Close the modal
    };



    const handleClickOpen = () => {
        setOpenForm(true);
    };

    const handleClose = () => {
        setOpenForm(false);
    };

    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        if (form.interests.includes(value)) {
            setForm((prev) => ({ ...prev, interests: prev.interests.filter(item => item !== value) }));
        } else {
            setForm((prev) => ({ ...prev, interests: [...prev.interests, value] }));
        }
        validateForm();
    };

    return (


        <Dialog
            open={open}
            onClose={onClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth maxWidth="md"
        >
            <StyledDialogTitle id="form-dialog-title" >Membership Application</StyledDialogTitle>
            <FormLink variant="body1" style={{ marginTop: -40, marginLeft: 640 }}>
          Click {' '}
          <Link href="/images/PWYC Membership Form.pdf" target="_blank" rel="noopener">
            Here
          </Link>{' '}
        for a PDF (Offline) form</FormLink>
            <DialogContent>
                
                {/* Applicant Information */}
                <TextField
                        onChange={handleChange}
                        name="date"
                        label="Date"
                        type="date" // Set the type to "date" to enable the date picker
                        value={form.date}
                        fullWidth
                        margin="dense"
                        InputLabelProps={{
                            shrink: true, // This ensures the label doesn't overlap the selected date
                        }}
                        />            
                        
                            <TextField onChange={handleChange} name="applicantName" margin="dense" label="Name(s) of Applicant" fullWidth />
                <TextField onChange={handleChange} name="city" margin="dense" label="Home City" fullWidth />
                <TextField onChange={handleChange} name="state" margin="dense" label="State" fullWidth />
                <TextField onChange={handleChange} name="occupation" margin="dense" label="Occupation(s)" fullWidth />
                <TextField onChange={handleChange} name="employers" margin="dense" label="Employer(s)" fullWidth />
                <TextField onChange={handleChange} name="hobbies" margin="dense" label="Hobbies or Special Interests (including those that maybe valuable to the Club)" fullWidth />
                <br />
                <br />
                <Typography variant="body1" color="textPrimary" gutterBottom>
                    Do you own a boat?
                </Typography>
                <RadioGroup
                    name="ownBoat"
                    value={form.ownBoat}
                    onChange={handleChange}
                >
                  
                    <FormControlLabel
                        value="No"
                        control={<BlueRadio />}
                        label="No"
                    />
                      <FormControlLabel
                        value="Yes"
                        control={<BlueRadio />}
                        label="Yes"
                    />
                    <FormControlLabel
                        value="Intend to in the near future"
                        control={<BlueRadio />}
                        label="Intend to in the near future"
                    />
                </RadioGroup>
                {form.ownBoat === 'Yes' && (
        <>
         <br />
            <Typography variant="body1" color="textPrimary" gutterBottom>
                Tell us about her:
            </Typography>
            <TextField onChange={handleChange} name="boatName" margin="dense" label="Boat Name" fullWidth />
            <TextField onChange={handleChange} name="typeMake" margin="dense" label="Sail or Power and Make of boat" fullWidth />
            <TextField onChange={handleChange} name="boatLocation" margin="dense" label="Slip and location of boat" fullWidth />
        </>
    )}
                <br />
                <br />


                <Typography variant="body1" color="textPrimary" gutterBottom>
                    If you do not own a boat, do you regularly crew on a boat?
                </Typography>

                <RadioGroup
                    name="crewBoat"
                    value={form.crewBoat}  // Use form.crewBoat instead of crewBoat
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value="Yes"
                        control={<BlueRadio />}
                        label="Yes"
                    />
                    <FormControlLabel
                        value="No"
                        control={<BlueRadio />}
                        label="No"
                    />
                    <FormControlLabel
                        value="I would be interested in doing so"
                        control={<BlueRadio />}
                        label="I would be interested in doing so"
                    />
                </RadioGroup>
                <br />
                <br />

                <br />
                <br /> <br />
                <br />

                <Typography variant="body1" color="textPrimary" gutterBottom>
                    CLUB SPONSORS:
                </Typography>
                <TextField onChange={handleChange} name="sponsor1" margin="dense" label="1) Print Name of Sponsor one" fullWidth />
                <TextField onChange={handleChange} name="sponsor1length" margin="dense" label="How long have you known this sponsor" fullWidth />
                <TextField onChange={handleChange} name="sponsor1how" margin="dense" label="Nature of acquaintance?" fullWidth />

                <TextField onChange={handleChange} name="sponsor2" margin="dense" label="2) Print Name of Sponsor two" fullWidth />
                <TextField onChange={handleChange} name="sponsor2length" margin="dense" label="How long have you known this sponsor" fullWidth />
                <TextField onChange={handleChange} name="sponsor2how" margin="dense" label="Nature of acquaintance?" fullWidth />


                <div style={{ textAlign: 'center', margin: '20px 0' }}>
               
                    <Typography variant="body1" color="textPrimary" gutterBottom>
                        The above portion of this application shall be posted for 30 days to allow Club Membership review
                        per PWYC ByLaws.
                    </Typography>
                </div>
                <br />
                <br />

                <TextField onChange={handleChange} name="address" margin="dense" label="Address (where you want to receive correspondence)" fullWidth />
                <TextField onChange={handleChange} name="phone" margin="dense" label="Phone number" fullWidth />
                <TextField onChange={handleChange} name="email" margin="dense" label="Email Address" fullWidth />

                <TextField onChange={handleChange} name="myExpectations" margin="dense" label=" What are your expectations from membership in the PWYC? " fullWidth />
                <TextField onChange={handleChange} name="ourExpectations" margin="dense" label="What can the PWYC expect from you?" fullWidth />
                <br />
                <br />
                <br />
                <br />

                <Typography variant="body1" color="textPrimary" gutterBottom>
                    Volunteerism helps build good will, better friendships and makes our Club work
                    as the founders intended. What areas might you be interested in helping out?
                </Typography>
                <br />


                <CheckboxContainer>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={true} // Set this to true to make the checkbox permanently checked
                                onChange={handleCheckboxChange}
                                value="Fish Day Fundraiser"
                                className="blue-checkbox"
                            />
                        }
                        label="Fish Day Fundraiser (our big event, all hands on deck)"
                    />

                    <FormControlLabel
                        control={
                            <BlueCheckbox
                                checked={form.interests.includes('Bartending')}
                                onChange={handleCheckboxChange}
                                value="Bartending"
                                className="blue-checkbox"
                            />
                        }
                        label="Bartending"
                    />

                    <FormControlLabel
                        control={
                            <BlueCheckbox
                                checked={form.interests.includes('Committee Boat for Race events')}
                                onChange={handleCheckboxChange}
                                value="Committee Boat for Race events"
                                className="blue-checkbox"
                            />
                        }
                        label="Committee Boat for Race events"
                    />

                    <FormControlLabel
                        control={
                            <BlueCheckbox
                                checked={form.interests.includes('Club Building Improvements')}
                                onChange={handleCheckboxChange}
                                value="Club Building Improvements"
                                className="blue-checkbox"
                            />
                        }
                        label="Club Building Improvements"
                    />

                    <FormControlLabel
                        control={
                            <BlueCheckbox
                                checked={form.interests.includes('Club Committees & Leadership')}
                                onChange={handleCheckboxChange}
                                value="Club Committees & Leadership"
                                className="blue-checkbox"
                            />
                        }
                        label="Club Committees & Leadership"
                    />

                    <FormControlLabel
                        control={
                            <BlueCheckbox
                                checked={form.interests.includes('Set up, cooking or cleaning at Club parties and events')}
                                onChange={handleCheckboxChange}
                                value="Set up, cooking or cleaning at Club parties and events"
                                className="blue-checkbox"
                            />
                        }
                        label="Set up, cooking or cleaning at Club parties and events"
                    />
                </CheckboxContainer>

                <br />
                <br />
                <br />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={form.requirementsChecked}
                            onChange={(e) => setForm((prev) => ({ ...prev, requirementsChecked: e.target.checked }))}
                            required // Add the required attribute
                        />
                    }
                    label="I have read and understand the “Requirements for Membership” outlined on the “Become A Member” page of the PWYC Website."
                />
                <div style={{ margin: '20px 0' }}>
                <Typography variant="h6" gutterBottom>Signature</Typography>
        <Box border={1} borderColor="grey.500" borderRadius="borderRadius" p={2}>
          <ReactSignatureCanvas ref={sigPadRef} penColor="black" canvasProps={{ width: 875, height: 198, className: 'sigCanvas' }} />
        </Box>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                Cancel
            </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>

            <Snackbar
                open={uploadSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose} // Use the new handler here
            >
                <Alert onClose={() => setUploadSnackbarOpen(false)} severity={snackbarSeverity}>
                    {uploadSnackbarMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={errorSnackbarOpen}
                autoHideDuration={6000}
                          >
                <Alert onClose={() => setErrorSnackbarOpen(false)} severity="error">
                    {errorSnackbarMessage}
                </Alert>
            </Snackbar>





        </Dialog>
    );
};

export default MembershipDialogOnline;
