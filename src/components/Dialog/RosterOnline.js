import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
  Checkbox,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  DialogContentText,
  FormControlLabel,
  Switch, 
  Box,
} from '@mui/material';
import styled from 'styled-components';
import { firestore as db, auth } from '../../../firebase';

////////               ROLES                   /////////////

const roles = [
  'Member',
  'Officer',
  'Commodore',
  'Race Director',
  'Fleet Captain',
  'Rear Commodore',
  'Vice Commodore',
  'Secretary',
  'Board Member', ]; 

////////               ROLES                   /////////////





const CenteredDialogTitle = styled(DialogTitle)`
  text-align: center;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

const MemberListContainer = styled.div`
  margin-top: 20px;
  height: 400px; // Fixed height
  overflow-y: auto; // Allow vertical scrolling within the container
  margin-left: 100px;
`;

const StyledDialogContent = styled(DialogContent)`
  max-height: 80vh; // Adjust the height as needed
  overflow-y: auto; // Allow scrolling within the DialogContent if necessary
`;



const MemberAdditionModal = ({ open, onClose, onSubmit, memberData, openSnackbar }) => {
  const [localMemberData, setLocalMemberData] = useState({
    firstName: '',
    lastName: '',
    dateJoined: '',
    birthday: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    membershipType: '',
    hasBoat: '',
    boatName: '',
    notes: '',
    isCaptain: false, // Add isCaptain field
  });

  const [isCaptain, setIsCaptain] = useState(false);


  useEffect(() => {
    if (memberData) {
      setLocalMemberData(memberData);
      setIsCaptain(memberData.isCaptain || false); // Update isCaptain state based on memberData
    } else {
      setLocalMemberData({
        firstName: '',
        lastName: '',
        dateJoined: '',
        birthday: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        membershipType: '',
        hasBoat: '',
        boatName: '',
        notes: '',
        isCaptain: false,
      });
      setIsCaptain(false); // Reset isCaptain state for new member
    }
  }, [memberData]); // Dependency array ensures effect runs when memberData changes




  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalMemberData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };



const generateUniqueMemberId = async () => {
  let unique = false;
  let randomNumber;
  while (!unique) {
    randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate a six-digit random number
    const snapshot = await db.collection('members').where('memberId', '==', randomNumber).get();
    if (snapshot.empty) {
      unique = true; // If no documents are found with the same memberId, the generated number is unique
    }
  }
  return randomNumber;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Include the sendEmail flag in the memberDetails object
  const memberDetails = {
      ...localMemberData,
      memberId: memberData ? memberData.memberId : await generateUniqueMemberId(),
      sendEmail: sendEmail, // Include the sendEmail flag
  };

  if (memberData) {
      // Update existing member
      await db.collection('members').doc(memberData.id).update(memberDetails);
      openSnackbar("Member updated successfully!", "success");
  } else {
      // Add new member
      await db.collection('members').add(memberDetails);
      openSnackbar("Member added successfully!", "success");
  }

  onClose(); // Close the modal after submission

  // Reset the form fields and sendEmail state for the next use
  setLocalMemberData({
      firstName: '',
      lastName: '',
      dateJoined: '',
      birthday: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      membershipType: '',
      hasBoat: '',
      boatName: '',
      notes: '',
      role: '',
  });
  setIsCaptain(false); // Reset isCaptain state
  setSendEmail(true); // Reset sendEmail state
};



  const US_STATES = [
    'AL', 'AK', 'AZ', 'AR', 'CA',
    'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA',
    'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO',
    'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH',
    'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT',
    'VA', 'WA', 'WV', 'WI', 'WY'
  ];


  const [sendEmail, setSendEmail] = useState(true); // Default to true

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add New Member</DialogTitle>
      <DialogContent>
      <Form onSubmit={handleSubmit}> {/* Here we use handleSubmit instead of onSubmit */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              value={localMemberData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={localMemberData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="dateJoined"
              label="Date Joined"
              type="date"
              variant="outlined"
              fullWidth
              value={localMemberData.dateJoined}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="birthday"
              label="Birthday"
              type="date"
              variant="outlined"
              fullWidth
              value={localMemberData.birthday}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={4}>
            <TextField
              name="phone"
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={localMemberData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={localMemberData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              fullWidth
              value={localMemberData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
              <TextField
                name="city"
                label="City"
                variant="outlined"
                fullWidth
                multiline
                rows={1}
                value={localMemberData.city}
                onChange={handleChange}
              />
            </Grid>

            
            <Grid item xs={2}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>State</InputLabel>
                  <Select
                    name="state"
                    value={localMemberData.state || ''}
                    onChange={handleChange}
                    label="State"
                  >
                    {US_STATES.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            <Grid item xs={2}>
              <TextField
                name="zip"
                label="Zip"
                variant="outlined"
                fullWidth
                multiline
                rows={1}
                value={localMemberData.zip}
                onChange={handleChange}
              />
            </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Membership Type</InputLabel>
              <Select
                name="membershipType"
                value={localMemberData.membershipType}
                label="Membership Type"
                onChange={handleChange}
              >
                <MenuItem value="life">Life Member</MenuItem>
                <MenuItem value="regular">Regular Member</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Has Boat?</InputLabel>
              <Select
                name="hasBoat"
                value={localMemberData.hasBoat}
                label="Has Boat?"
                onChange={handleChange}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
            {localMemberData.hasBoat === 'yes' && (
              <TextField
                name="boatName"
                label="Boat Name"
                variant="outlined"
                fullWidth
                value={localMemberData.boatName}
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
            )}
          </Grid>
                          <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      name="role"
                      value={localMemberData.role}
                      label="Role"
                      onChange={handleChange}
                    >
                      {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
          <Grid item xs={12}>
              <TextField
                name="notes"
                label="Notes"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={localMemberData.notes}
                onChange={handleChange}
              />
            </Grid>
           
        
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button type="submit" color="primary">Add/Update Member</Button>
            <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isCaptain}
              onChange={() => setIsCaptain(!isCaptain)}
              name="isCaptain"
            />
          }
          label="Is Captain"
        />
      </Grid>

            <Box display="flex" justifyContent="center" alignItems="center">
              
       <FormControlLabel
        control={
          <Switch
            checked={sendEmail}
            onChange={() => setSendEmail(!sendEmail)}
            name="sendEmail"
            color="primary"
          />
        }
        label="Send Welcome Email"
      />
    </Box>
          </Grid>
          
           </Grid>
    </Form>
    </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
       
      </DialogActions>
    </Dialog>
  );
};


const RosterDialog = ({ open, onClose }) => {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [removeConfirmOpen, setRemoveConfirmOpen] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: '',
    severity: 'success', // can be 'error', 'warning', 'info', or 'success'
  });

  const handleCloseAddMemberModal = () => setAddMemberModalOpen(false);
  const [selectedMemberForEdit, setSelectedMemberForEdit] = useState(null);

  const openSnackbar = (message, severity) => {
    setSnackbarInfo({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbarInfo({ ...snackbarInfo, open: false });
  };

  // Function to open the modal for adding a new member
  const handleOpenAddMemberModal = () => {
    setSelectedMemberForEdit(null); // Ensure no member data is pre-filled for adding a new member
    setAddMemberModalOpen(true);
  };

  const handleOpenEditMemberModal = () => {
    if (selectedMembers.length === 1) {
      const memberIdToEdit = selectedMembers[0];
      const memberDataToEdit = members.find(member => member.id === memberIdToEdit);
      setSelectedMemberForEdit(memberDataToEdit);
      setAddMemberModalOpen(true);
    }
  };

  // Function to handle form submission (either add or update)
  const handleAddOrUpdateMember = async (memberData) => {
    if (selectedMemberForEdit) {
      try {
        await db.collection('members').doc(selectedMemberForEdit.id).update(memberData);
        openSnackbar('Member updated successfully', 'warning');
      } catch (error) {
        console.error('Error updating member: ', error);
        openSnackbar('Error updating member', 'error');
      }
    } else {
      try {
        await db.collection('members').add(memberData);
        openSnackbar('Member added successfully', 'success');
      } catch (error) {
        console.error('Error adding member: ', error);
        openSnackbar('Error adding member', 'error');
      }
    }
    setAddMemberModalOpen(false);
    setSelectedMemberForEdit(null);
  };
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          setIsAdminUser(!!idTokenResult.claims.admin);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = db.collection('members').onSnapshot((snapshot) => {
      const fetchedMembers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(fetchedMembers);
    });
    return () => unsubscribe();
  }, []);

  

  const handleMemberSelect = (memberId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberId)
        ? prevSelected.filter((id) => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.firstName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      member.lastName.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const handleRemoveSelectedMembers = async () => {
  try {
    const batch = db.batch();
    selectedMembers.forEach((memberId) => {
      const memberRef = db.collection('members').doc(memberId);
      batch.delete(memberRef);
    });
    await batch.commit();
    openSnackbar(`${selectedMembers.length} member(s) removed successfully`, 'error');
    setSelectedMembers([]);
  } catch (error) {
    console.error('Error removing selected members: ', error);
    openSnackbar('Error removing selected members', 'error');
  }
};

 


 return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <CenteredDialogTitle>Member Roster</CenteredDialogTitle>
      <DialogContent>
        {isAdminUser && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Button color="primary" onClick={handleOpenAddMemberModal}>Add Member</Button>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>

            <Button
          color="primary"
          onClick={handleOpenEditMemberModal}
          disabled={selectedMembers.length !== 1}
          style={{
            marginTop: '0px',
            color: selectedMembers.length > 0 ? 'green' : undefined, // Apply red color when members are selected
          }}
          >
          Update Selected Member
          </Button>


            <Button
  color="secondary"
  onClick={() => setRemoveConfirmOpen(true)}
  disabled={selectedMembers.length === 0}
  style={{
    marginTop: '0px',
    color: selectedMembers.length > 0 ? 'red' : undefined, // Apply red color when members are selected
  }}
>
  Remove Selected Member(s)
</Button>
        </div>         
         </div>
                   

        )}
        <div style={{ textAlign: 'center', marginTop:'20px', marginBottom: '20px' }}>
  <TextField
      label="Search Members"
      variant="outlined"
      
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />      </div>
      <MemberListContainer>
  <Grid container spacing={2}>
    {filteredMembers.map((member) => (
      <Grid item xs={4} key={member.id} style={{ padding: '8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={selectedMembers.includes(member.id)}
            onChange={() => handleMemberSelect(member.id)}
          />
          <BoldText>{member.lastName}, {member.firstName}</BoldText>

        </div>
        <div style={{ marginLeft: '50px', marginTop: '-5px' }}> {/* Indent the additional info */}
          <div>{member.phone}</div>
          <div>{member.email}</div>
          <div>{member.address}</div>
          <div>{member.city}, {member.state} {member.zip}</div> 
          <div>Membership Type: {member.membershipType === 'life' ? 'Life Member' : 'Regular Member'}</div>
          {member.hasBoat === 'yes' && <div>Boat Name: {member.boatName}</div>}
          <div>{member.role}</div> {/* Display notes here */}
          <div>{member.notes}</div> {/* Display notes here */}

        </div>
      </Grid>
    ))}
  </Grid>
</MemberListContainer>
    
    </DialogContent>
    <Dialog
  open={removeConfirmOpen}
  onClose={() => setRemoveConfirmOpen(false)}
>
  <DialogTitle>Confirm Removal</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to remove the selected member(s)?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setRemoveConfirmOpen(false)}>Cancel</Button>

  
    <Button
    
      onClick={() => {
        handleRemoveSelectedMembers();
        setRemoveConfirmOpen(false);
      }}
      color="secondary"
       style={{
    color: selectedMembers.length > 0 ? 'red' : undefined, // Apply red color when members are selected
  }}
    >
      Remove
    </Button>
  </DialogActions>
</Dialog>
<MemberAdditionModal
  open={addMemberModalOpen}
  onClose={handleCloseAddMemberModal}
  onSubmit={handleAddOrUpdateMember}
  memberData={selectedMemberForEdit}
  openSnackbar={openSnackbar} // Pass this function as a prop
/>


<Snackbar
  open={snackbarInfo.open}
  autoHideDuration={6000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
  <Alert onClose={handleCloseSnackbar} severity={snackbarInfo.severity} sx={{ width: '100%' }}>
    {snackbarInfo.message}
  </Alert>
</Snackbar>
    </Dialog>
  );
};

export default RosterDialog;

