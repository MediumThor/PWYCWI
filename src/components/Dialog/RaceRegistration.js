import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import firebase from 'firebase/app';
import { firestore as db } from '../../../firebase';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { functions } from '../../../firebase';
import Checkbox from '@mui/material/Checkbox';



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

const EntryRequirements = styled.p`
  margin-top: 16px;
  line-height: 1.5;
   font-size: 0.5rem;

  text-align: center; // Centers the text
`;

const ReleaseFormLink = styled.a`
  color: #0000EE;
  text-decoration: underline;
`;

const RaceRegistrationDialog = ({ open, onClose, scroll }) => {
    const [uploadSnackbarOpen, setUploadSnackbarOpen] = useState(false);
    const [uploadSnackbarMessage, setUploadSnackbarMessage] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false); // New state for checkbox


    const [openForm, setOpenForm] = useState(false);
    const [form, setForm] = useState({
        boatName: '',
        sailNumber: '',
        boatMakeModel: '',
        owner: '',
        yachtClub: '',
        captain: '',
        address: '',
        phoneNumber: '',
        email: '',
        lmphrf: '',
        category: 'Spinnaker', // Default selection
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const validateForm = () => {
        for (let field in form) {
            if (form[field] === '') {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            db.collection('raceRegistrations').add(form)
                .then((docRef) => {
                    console.log('Document written with ID: ', docRef.id);
                    // Call the Cloud Function to send the email
                    const sendRaceRegistrationEmail = functions.httpsCallable('sendRaceRegistrationEmail');
                    sendRaceRegistrationEmail(form)
                        .then(() => {
                            setUploadSnackbarOpen(true);
                            setUploadSnackbarMessage('Registration submitted successfully! Emails sent.');
                            handleClose();
                        })
                        .catch((error) => {
                            console.error('Error sending email: ', error);
                            setUploadSnackbarOpen(true);
                            setUploadSnackbarMessage('Registration submitted successfully! But there was an error sending the emails.');
                        });
                })
                .catch((error) => {
                    console.error('Error adding document: ', error);
                    setUploadSnackbarOpen(true);
                    setUploadSnackbarMessage('An error occurred. Please try again.');
                });
        } else {
            setUploadSnackbarOpen(true);
            setUploadSnackbarMessage('All fields must be filled out.');
        }
    };

    const handleClickOpen = () => {
        setOpenForm(true);
    };

    const handleClose = () => {
        setOpenForm(false);
    };


    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: 'lightgray', // Set your desired background color
                },
            }}
        >
            <CenteredDialogTitle id="scroll-dialog-title">2023 PWYC Rendezvous Regatta Registration </CenteredDialogTitle>
            <DialogContent>
                <TextField onChange={handleChange} name="boatName" margin="dense" label="Boat Name" fullWidth InputProps={{
                    style: { fontSize: '0.6rem' } // Adjust the font size as needed
                }} />
                <TextField onChange={handleChange} name="sailNumber" margin="dense" label="Sail Number" fullWidth InputProps={{
                    style: { fontSize: '0.6rem' } // Adjust the font size as needed
                }} />
                <TextField onChange={handleChange} name="boatMakeModel" margin="dense" label="Boat Make/Model" fullWidth InputProps={{
                    style: { fontSize: '0.6rem' } // Adjust the font size as needed
                }} />
                <TextField onChange={handleChange} name="owner" margin="dense" label="Owner" fullWidth InputProps={{
                    style: { fontSize: '0.6rem' } // Adjust the font size as needed
                }} />
                <TextField onChange={handleChange} name="yachtClub" margin="dense" label="Yacht Club" fullWidth InputProps={{
                    style: { fontSize: '0.6rem' } // Adjust the font size as needed
                }} />
                <TextField onChange={handleChange} name="captain" margin="dense" label="Captain" fullWidth InputProps={{
                    style: { fontSize: '0.6rem' } // Adjust the font size as needed
                }} />
                <TextField onChange={handleChange} name="address" margin="dense" label="Address" fullWidth InputProps={{
                    style: { fontSize: '0.6rem' } // Adjust the font size as needed
                }} />
                <TextField onChange={handleChange} name="phoneNumber" margin="dense" label="Phone Number" fullWidth InputProps={{
                    style: { fontSize: '0.6rem' } // Adjust the font size as needed
                }} />
                <TextField onChange={handleChange} name="email" margin="dense" label="Email" fullWidth InputProps={{
                    style: { fontSize: '0.6rem' } // Adjust the font size as needed
                }} />
                <TextField onChange={handleChange} name="lmphrf" margin="dense" label="LMPHRF" fullWidth InputProps={{
                    style: { fontSize: '0.6rem' } // Adjust the font size as needed
                }} />
                <RadioGroup row name="category" value={form.category} onChange={handleChange}>
                    <FormControlLabel value="Spinnaker" control={<Radio />} label="Spinnaker" />
                    <FormControlLabel value="Jib and Main" control={<Radio />} label="Jib and Main" />
                </RadioGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={agreeToTerms}
                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                            required // Make the checkbox mandatory
                        />
                    }
                    label="I acknowledge that I have read and agree to the terms of release and waiver of liability" />
            </DialogContent>

            <EntryRequirements>
                <br />*Waiver and <ReleaseFormLink href="/assets/SailingInfo/PWYC Registration 2023.pdf" target="_blank">Release form</ReleaseFormLink>


                <br />  If using the online form please either bring
                <br />LMPHRF certificate to the registration table;
                <br />A rating will be assigned to boats without a handicap.
                <br />


            </EntryRequirements>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button onClick={handleSubmit} color="primary">Submit</Button>
            </DialogActions>
            <Snackbar open={uploadSnackbarOpen} autoHideDuration={6000} onClose={() => setUploadSnackbarOpen(false)}>
                <Alert onClose={() => setUploadSnackbarOpen(false)} severity={uploadSnackbarMessage === 'All fields must be filled out.' ? "error" : "success"}>
                    {uploadSnackbarMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};


export default RaceRegistrationDialog;
