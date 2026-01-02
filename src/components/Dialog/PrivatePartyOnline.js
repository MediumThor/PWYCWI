import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, TextField, Typography, Box, Link } from '@mui/material';
import { firestore as db, auth } from '../../../firebase';
import ReactSignatureCanvas from 'react-signature-canvas';
import { functions } from '../../../firebase'; // Import the initialized functions module
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';
import Cookies from 'js-cookie';


const StyledDialogTitle = styled(DialogTitle)`
  /* Your existing styles */

  @media (max-width: 700px) { /* Adjust the max-width as per your breakpoint */
    margin-bottom: -120px; /* Adjust the negative margin as needed */
  }
`;


const FormLink = styled(DialogTitle)`
  /* Your existing styles */

  @media (max-width: 700px) { /* Adjust the max-width as per your breakpoint */
display:none;  
}
`;

const PrivatePartyForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    eventName: '',
    memberName: '',
    telephone: '',
    address: '',
    email: '',
    dateOfEvent: '',
    preparationTimeStart: '',
    preparationTimeEnd: '',
    partyTimeStart: '',
    partyTimeEnd: '',
    cleanupTimeStart: '',
    cleanupTimeEnd: '',
    numberOfMembers: '', // Added this field
    numberOfNonMembers: '', // Added this field
    barRequested: 'No',
    barTimeStart: '',
    barTimeEnd: '',
    catering: '',
    band: '',
    otherServices: '',
    functionDescription: '',
  });

  const sigPadRef = useRef({});

  const [barRequested, setBarRequested] = useState('No');
  const [uploadSnackbarOpen, setUploadSnackbarOpen] = useState(false);
  const [uploadSnackbarMessage, setUploadSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Added state for Snackbar severity
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('');
  const [totalCost, setTotalCost] = useState(0);


  const calculateTotalCost = () => {
    let cost = 0;
    const numberOfPeople = parseInt(formData.numberOfMembers) + parseInt(formData.numberOfNonMembers);

    if (numberOfPeople <= 50) {
      cost += 5000; // $50.00
    } else if (numberOfPeople > 50 && numberOfPeople <= 999) {
      cost += 8500; // $85.00
    }

    if (formData.barRequested === 'Yes') {
      cost += 3500; // $35.00 for bar usage
    }

    const eventDate = new Date(formData.dateOfEvent);
    const eventTimeEnd = formData.partyTimeEnd.split(':');
    const eventEndHour = parseInt(eventTimeEnd[0], 10);

    // Check if the event is on a Saturday
    const isSaturday = eventDate.getDay() === 5;

    // Check if the event is in season (April 1st - October 31st)
    const isInSeason = eventDate.getMonth() >= 3 && eventDate.getMonth() <= 9; // Month is 0-indexed

    // Check if the event ends after 6:00 PM
    const isAfter6PM = eventEndHour >= 18;

    if (isSaturday && isInSeason && isAfter6PM) {
      cost = 40000; // $400.00 for events past 6:00 PM on Saturdays in season
    }

    setTotalCost(cost); // Update the total cost state
  };

  // Call calculateTotalCost whenever relevant form data changes
  useEffect(() => {
    calculateTotalCost();
    // Add other form fields as dependencies if they affect the cost
  }, [formData.dateOfEvent, formData.partyTimeEnd, formData.numberOfMembers, formData.numberOfNonMembers, formData.barRequested]);

  // Auto-populate user information when dialog opens
  useEffect(() => {
    if (open) {
      const loadUserData = async () => {
        try {
          const authUser = auth.currentUser;
          const isSpecialUser = Cookies.get('specialUser') === 'true';

          if (authUser) {
            // User is authenticated via Firebase Auth
            // Get email from auth user
            const userEmail = authUser.email;
            
            // Try to get member data from Firestore
            try {
              const token = await authUser.getIdTokenResult();
              
              let memberData = null;
              if (token.claims.admin) {
                // Admins are in the 'users' collection
                const userSnapshot = await db.collection('users').doc(authUser.uid).get();
                if (userSnapshot.exists) {
                  const userData = userSnapshot.data();
                  memberData = {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userEmail || userData.email,
                    phone: userData.phone,
                    address: userData.address,
                  };
                }
              } else {
                // Regular members are in the 'members' collection
                const memberSnapshot = await db.collection('members').where('authUid', '==', authUser.uid).limit(1).get();
                if (!memberSnapshot.empty) {
                  const memberDoc = memberSnapshot.docs[0].data();
                  memberData = {
                    firstName: memberDoc.firstName,
                    lastName: memberDoc.lastName,
                    email: userEmail || memberDoc.email,
                    phone: memberDoc.phone,
                    address: memberDoc.address,
                  };
                }
              }

              if (memberData) {
                setFormData(prev => ({
                  ...prev,
                  email: memberData.email || '',
                  memberName: `${memberData.firstName || ''} ${memberData.lastName || ''}`.trim(),
                  telephone: memberData.phone || prev.telephone,
                  address: memberData.address || prev.address,
                }));
              } else if (userEmail) {
                // Fallback: just set email if we have it
                setFormData(prev => ({
                  ...prev,
                  email: userEmail,
                }));
              }
            } catch (error) {
              console.error('Error fetching member data:', error);
              // Still try to set email if available
              if (userEmail) {
                setFormData(prev => ({
                  ...prev,
                  email: userEmail,
                }));
              }
            }
          } else if (isSpecialUser) {
            // YachtMember special user - they need to enter their email manually
            // We can't auto-populate without knowing which member they are
            console.log('Special user (YachtMember) detected - please enter your email address');
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      };

      loadUserData();
    }
  }, [open]);






  const handleBarChange = (event) => {
    const { value } = event.target;
    setBarRequested(value);
    setFormData({ ...formData, barRequested: value });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const validateForm = () => {
    let isValid = true;
    const requiredFields = [
      'eventName', 'memberName', 'telephone', 'address', 'email', 'dateOfEvent',
      'preparationTimeStart', 'preparationTimeEnd', 'partyTimeStart', 'partyTimeEnd',
      'cleanupTimeStart', 'cleanupTimeEnd', 'numberOfMembers', 'numberOfNonMembers',
      'catering', 'band', 'otherServices', 'functionDescription',
      // Notice 'barRequested' is not in the list
    ];

    // Check required fields
    isValid = requiredFields.every(field => formData[field] !== undefined && formData[field] !== '');

    // Validate email format - must be a valid email address (not "YachtMember" or other usernames)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      isValid = false;
    }

    // Additional check for bar times if bar is requested
    if (formData.barRequested === 'Yes') {
      isValid = isValid && formData.barTimeStart !== '' && formData.barTimeEnd !== '';
    }

    console.log('FormData:', formData);
    console.log('IsValid:', isValid);

    setIsFormValid(isValid);
    return isValid; // Return the validity for immediate use
  };


  const handleSubmit = async () => {
    const formIsValid = validateForm();

    if (!formIsValid) {
      setErrorSnackbarOpen(true);
      // Check if email is invalid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        setErrorSnackbarMessage('Please enter a valid email address. "YachtMember" is a username, not an email address.');
      } else {
        setErrorSnackbarMessage('Please fill in all required fields.');
      }
      return;
    }

    const signatureImage = sigPadRef.current.toDataURL();
    const completeFormData = {
      ...formData,
      signature: signatureImage,
      totalCost: totalCost // Include totalCost in the data sent to the Cloud Function
    };

    try {
      const docRef = await db.collection('privatePartyApplications').add(completeFormData);
      console.log(`Document written with ID: ${docRef.id}`);

      // Call the sendPrivatePartyEmail cloud function and pass completeFormData including totalCost
      const sendEmail = functions.httpsCallable('sendPrivatePartyEmail');
      await sendEmail(completeFormData).then(result => {
        console.log(result); // Log the result from the cloud function
      }).catch(error => {
        console.error("Error sending email:", error);
      });

      // Set Snackbar state for successful submission and invoice notification
      setUploadSnackbarOpen(true);
      setUploadSnackbarMessage('Application submitted successfully! An invoice has been sent to your email.');
      setSnackbarSeverity('success');

      // Delay closing the dialog to ensure Snackbar is visible
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Error:', error);
      setErrorSnackbarOpen(true);
      setErrorSnackbarMessage('An error occurred while submitting the application. Please try again.');
      setSnackbarSeverity('error');
    }
  };



  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <StyledDialogTitle>Private Party Application 
        <FormLink variant="body1" style={{ marginTop: -40, marginLeft: 640 }}>
          Click {' '}
          <Link href="assets/Other/PWYC Private Party Application.pdf" target="_blank" rel="noopener">
            Here
          </Link>{' '}
        for a PDF (Offline) form</FormLink>
        </StyledDialogTitle>
      
      <DialogContent>
        <TextField label="Event Name" name="eventName" value={formData.eventName} onChange={handleChange} fullWidth margin="dense" />
        <TextField label="Member Name" name="memberName" value={formData.memberName} onChange={handleChange} fullWidth margin="dense" />
        <TextField
          label="Date of Event"
          type="date"
          name="dateOfEvent"
          value={formData.dateOfEvent}
          onChange={handleChange}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
        />        <TextField label="Number of Members" name="numberOfMembers" value={formData.numberOfMembers} onChange={handleChange} fullWidth margin="dense" />
        <TextField label="Number of Non-Members" name="numberOfNonMembers" value={formData.numberOfNonMembers} onChange={handleChange} fullWidth margin="dense" />
        <TextField label="Telephone" name="telephone" value={formData.telephone} onChange={handleChange} fullWidth margin="dense" />
        <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth margin="dense" />
        <TextField 
          label="Email" 
          name="email" 
          type="email"
          value={formData.email} 
          onChange={handleChange} 
          fullWidth 
          margin="dense"
          helperText={formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Please enter a valid email address' : ''}
          error={formData.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
        />
        <Typography variant="h6" gutterBottom>Event Timing</Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="subtitle1">Preparation Time</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="time"
              name="preparationTimeStart"
              value={formData.preparationTimeStart}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" textAlign="center">to</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="time"
              name="preparationTimeEnd"
              value={formData.preparationTimeEnd}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Party Time</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="time"
              name="partyTimeStart"
              value={formData.partyTimeStart}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" textAlign="center">to</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="time"
              name="partyTimeEnd"
              value={formData.partyTimeEnd}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Clean up Time</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="time"
              name="cleanupTimeStart"
              value={formData.cleanupTimeStart}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" textAlign="center">to</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="time"
              name="cleanupTimeEnd"
              value={formData.cleanupTimeEnd}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Grid>
        </Grid>
        {/* Continue adding fields for all required details */}

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Bar Requested?</FormLabel>
          <RadioGroup row name="barRequested" value={barRequested} onChange={handleBarChange}>
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        {barRequested === 'Yes' && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="subtitle1">Bar Time</Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                type="time"
                name="barTimeStart"
                value={formData.barTimeStart}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" textAlign="center">to</Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                type="time"
                name="barTimeEnd"
                value={formData.barTimeEnd}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
            </Grid>
          </Grid>
        )}

        <Typography variant="body1" gutterBottom>
          Bar usage fee $35.00 (does not include bartender’s fee – see below)
        </Typography>
        <Typography variant="body1">
          Bartender to be paid directly by the person having the party. Bartender to be paid $12 per hour plus appropriate tips commensurate with bar service.
        </Typography>


        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>Outside Services</Typography>

          <TextField
            label="Catering (Name and Address)"
            name="catering"
            value={formData.catering}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />

          <TextField
            label="Band (Name and Address)"
            name="band"
            value={formData.band}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />

          <TextField
            label="Other Services (Name and Address)"
            name="otherServices"
            value={formData.otherServices}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Function Details</Typography>
          <TextField
            label="Describe Function in Detail"
            name="functionDescription"
            value={formData.functionDescription}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="dense"
          />
        </Box>



        <Typography variant="h6" gutterBottom>Signature</Typography>
        <Box border={1} borderColor="grey.500" borderRadius="borderRadius" p={2}>
          <ReactSignatureCanvas ref={sigPadRef} penColor="black" canvasProps={{ width: 875, height: 198, className: 'sigCanvas' }} />
        </Box>

        {/* Disclaimer */}
        <Typography variant="body2" style={{ marginTop: 20 }}>
          By submitting this application, I agree to the{' '}
          <Link href="assets/Other/PWYC Private Party Application.pdf" target="_blank" rel="noopener">
            Terms and Conditions
          </Link>{' '}
          of the PWYC Private Party Rules and Regulations.
        </Typography>

      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
      <Snackbar open={uploadSnackbarOpen} autoHideDuration={6000} onClose={() => setUploadSnackbarOpen(false)}>
        <Alert onClose={() => setUploadSnackbarOpen(false)} severity={snackbarSeverity}>
          {uploadSnackbarMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={errorSnackbarOpen} autoHideDuration={6000} onClose={() => setErrorSnackbarOpen(false)}>
        <Alert onClose={() => setErrorSnackbarOpen(false)} severity="error">
          {errorSnackbarMessage}
        </Alert>
      </Snackbar>

      <Typography variant="h6" align="center" style={{ margin: '20px' }}>
        Total Cost: ${totalCost / 100} {/* Convert cents to dollars */}
        <PleaseDeliver>Please deliver the above amount to the club. Please note that payment is required for the board to approve your event</PleaseDeliver>
      </Typography>
    </Dialog>
  );
};

export default PrivatePartyForm;


const PleaseDeliver = styled.div`
 font-size: 0.6rem;
`;

