import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase/app';
import { firestore as db } from '../../../firebase';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



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

const MembershipDialog = ({ open, onClose, scroll }) => {
    const [uploadSnackbarOpen, setUploadSnackbarOpen] = useState(false);
    const [uploadSnackbarMessage, setUploadSnackbarMessage] = useState('');

    const [openForm, setOpenForm] = useState(false);
    const [form, setForm] = useState({
        applicantName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
        spouseName: '',
        boatName: '',
        make: '',
        length: '',
        occupation: '',
        interests: '',
        // ... other fields
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        db.collection('newApplications').add(form)
            .then((docRef) => {
                console.log('Document written with ID: ', docRef.id);
                setUploadSnackbarOpen(true); // Open the Snackbar
                setUploadSnackbarMessage('Application submitted successfully!'); // Set the message
                handleClose();
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
                setUploadSnackbarOpen(true); // Open the Snackbar
                setUploadSnackbarMessage('An error occurred. Please try again.'); // Set the error message
            });
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
        >
            <CenteredDialogTitle id="scroll-dialog-title">Apply for Membership to PWYC</CenteredDialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <StyledText>
                    Requirements for membership are: <br /><br />
                    Interest in boating (boat ownership is not required) <br />
                    A completed application including signatures of two current PWYC members <br />
                    $25 check (non-refundable application fee)
                </StyledText>
                <p>Once you submit your application, it will be displayed on the Club bulletin board for a period of 30 days. During this time, the membership will have the opportunity to review your application. After the 30-day period, your application will be presented to the Board of Directors for their evaluation and approval.

                    Upon successful approval, you will receive notification of your acceptance as a member. This notification will be provided by the Fleet Captain and/or through an announcement in the upcoming edition of the Porthole, the Club's newsletter.</p>

                <p>After approval, the Club Treasurer will contact you to inform you about the applicable fees that need to be paid. These fees include a one-time building assessment charge of $250 and prorated dues based on the current annual dues of $300.

                    As a member, you will enjoy the rights, privileges, and responsibilities outlined in the Club By-Laws. We strongly encourage active participation in Club activities. To proceed,<br /><br />

                    <StyledLink href="/images/PWYC Membership Form.pdf" target="_blank"> please click here</StyledLink> <br /><br />to access and complete the Member Information form, which can be printed out for your convenience.
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>




            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open Membership Form
            </Button>
            <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
                <DialogTitle id="form-dialog-title">Membership Application</DialogTitle>
                <DialogContent>
                    {/* Applicant Information */}
                    <TextField onChange={handleChange} name="applicantName" margin="dense" label="Applicant Name" fullWidth />
                    <TextField onChange={handleChange} name="address" margin="dense" label="Address" fullWidth />
                    <TextField onChange={handleChange} name="city" margin="dense" label="City" fullWidth />
                    <TextField onChange={handleChange} name="state" margin="dense" label="State" fullWidth />
                    <TextField onChange={handleChange} name="zip" margin="dense" label="Zip" fullWidth />
                    <TextField onChange={handleChange} name="phone" margin="dense" label="Phone" fullWidth />
                    <TextField onChange={handleChange} name="email" margin="dense" label="Email" fullWidth />


                    {/* Family Members Information */}
                    <TextField onChange={handleChange} name="spouseName" margin="dense" label="Spouse Name" fullWidth />
                    {/* Additional fields for children's names, etc. */}

                    {/* Boat Information */}
                    <TextField onChange={handleChange} name="boatName" margin="dense" label="Boat Name" fullWidth />
                    <TextField onChange={handleChange} name="make" margin="dense" label="Make" fullWidth />
                    <TextField onChange={handleChange} name="length" margin="dense" label="Length" fullWidth />
                    {/* Additional fields for boat information */}

                    {/* Additional Information */}
                    <TextField onChange={handleChange} name="occupation" margin="dense" label="Occupation" fullWidth />
                    <TextField onChange={handleChange} name="interests" margin="dense" label="Interests" fullWidth />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={uploadSnackbarOpen}
                autoHideDuration={6000}
                onClose={() => setUploadSnackbarOpen(false)}
            >
                <Alert onClose={() => setUploadSnackbarOpen(false)} severity="success">
                    {uploadSnackbarMessage}
                </Alert>
            </Snackbar>


        </Dialog>
    );
};

export default MembershipDialog;
