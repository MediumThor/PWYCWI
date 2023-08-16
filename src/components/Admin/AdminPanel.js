import React, { useState, useEffect } from 'react';
import { functions, firestore as db } from '../../../firebase';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, Button, Grid, Snackbar, MenuItem } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { storage } from '../../../firebase';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default function AdminPanel({ open, onClose }) {
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [userId, setUserId] = useState('');
    const [memberNumber, setMemberNumber] = useState('');
    {/** CREATE NEW USER  */ }
    const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserFirstName, setNewUserFirstName] = useState('');
    const [newUserLastName, setNewUserLastName] = useState('');
    const [newUserMemberNumber, setNewUserMemberNumber] = useState('');
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);


    const predefinedRoles = ['Member', 'Cruising', 'Spinnaker', 'Commodore', 'Vice Commodore', 'Rear Commodore', 'Race Director', 'Secretary', 'Treasurer', 'Fleet Captain', 'Porthole', 'Bar Manager'];



    {/** UPDATE EVENTS SECTION */ }


    const [events, setEvents] = useState([]);
    const [editEventDialogOpen, setEditEventDialogOpen] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventImage, setEventImage] = useState('');
    const [editingEventId, setEditingEventId] = useState(null); // Used to determine if editing an existing event
    const [eventPdf, setEventPdf] = useState('');


    useEffect(() => {
        const ref = db.collection('events');
        const unsubscribe = ref.onSnapshot(snapshot => {
            const fetchedEvents = [];
            snapshot.forEach(doc => {
                fetchedEvents.push({ id: doc.id, ...doc.data() });
            });
            setEvents(fetchedEvents);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    // Function to open the edit event dialog with an existing event
    const handleEditEvent = (event) => {
        setEditingEventId(event.id);
        setEventTitle(event.title);
        setEventDate(event.date);
        setEventTime(event.time);
        setEventDescription(event.description);
        setEventImage(event.image);
        setEditEventDialogOpen(true);
    };

    // Function to open the edit event dialog for creating a new event
    const handleCreateEvent = () => {
        setEditingEventId(null);
        setEventTitle('');
        setEventDate('');
        setEventTime('');
        setEventDescription('');
        setEventImage('');
        setEditEventDialogOpen(true);
    };

    // Function to save the event to Firestore (either creating or updating)
    const saveEvent = () => {
        const eventData = {
            title: eventTitle,
            date: eventDate,
            time: eventTime,
            description: eventDescription,
            image: eventImage,
            pdf: eventPdf // Include the PDF URL
        };
        if (editingEventId) {
            // Update existing event
            db.collection('events').doc(editingEventId).update(eventData);
        } else {
            // Create new event
            db.collection('events').add(eventData);
        }
        setEditEventDialogOpen(false);
    };

    // Function to delete an event from Firestore
    const deleteEvent = (eventId) => {
        db.collection('events').doc(eventId).delete();
    };

    const handlePdfUpload = (e) => {
        const file = e.target.files[0];
        const storageRef = storage.ref(); // Make sure you import storage from firebase
        const fileRef = storageRef.child('events/' + file.name);
        fileRef.put(file).then(() => {
            fileRef.getDownloadURL().then((url) => {
                setEventPdf(url); // Save the URL in the state
            });
        });
    };

    {/** ^^UPDATE EVENTS SECTION ^^*/ }




    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = await db.collection('users').get();
            setUsers(usersCollection.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            }));
        }
        fetchUsers();
    }, []);




    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };



    const makeUserAdmin = () => {
        functions.httpsCallable('addAdminRole')({ email })
            .then((result) => {
                setSnackbarMessage(result.data.message);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            })
            .catch((error) => {
                setSnackbarMessage(error.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };

    const removeUserAdmin = () => {
        functions.httpsCallable('removeAdminRole')({ email })
            .then((result) => {
                setSnackbarMessage(result.data.message);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            })
            .catch((error) => {
                setSnackbarMessage(error.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };




    const makeUserOfficer = () => {
        functions.httpsCallable('addOfficerRole')({ email })
            .then((result) => {
                setSnackbarMessage(result.data.message);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            })
            .catch((error) => {
                setSnackbarMessage(error.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };
    const removeUserOfficer = () => {
        functions.httpsCallable('removeOfficerRole')({ email })
            .then((result) => {
                setSnackbarMessage(result.data.message);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            })
            .catch((error) => {
                setSnackbarMessage(error.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };





    const makeUserCaptain = () => {
        functions.httpsCallable('addCaptainRole')({ email })
            .then((result) => {
                setSnackbarMessage(result.data.message);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            })
            .catch((error) => {
                setSnackbarMessage(error.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };

    const removeUserCaptain = () => {
        functions.httpsCallable('removeCaptainRole')({ email })
            .then((result) => {
                setSnackbarMessage(result.data.message);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            })
            .catch((error) => {
                setSnackbarMessage(error.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };



    const removeAllClaims = () => {
        functions.httpsCallable('removeAllClaims')({ email })
            .then((result) => {
                setSnackbarMessage(result.data.message);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            })
            .catch((error) => {
                setSnackbarMessage(error.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };


    const updateRoles = () => {
        const docRef = db.collection('users').doc(userId);

        docRef.get().then((docSnapshot) => {
            if (docSnapshot.exists) {
                docRef.update({
                    roles: roles // 'roles' is an array of strings
                })
                    .then(() => {
                        setSnackbarMessage(`Successfully updated roles of ${email}`);
                        setSnackbarSeverity('success');
                        setSnackbarOpen(true);
                    })
                    .catch((error) => {
                        setSnackbarMessage(`Failed to update roles: ${error.message}`);
                        setSnackbarSeverity('error');
                        setSnackbarOpen(true);
                    });
            } else {
                docRef.set({
                    roles: roles
                })
                    .then(() => {
                        setSnackbarMessage(`Successfully set roles of ${email}`);
                        setSnackbarSeverity('success');
                        setSnackbarOpen(true);
                    })
                    .catch((error) => {
                        setSnackbarMessage(`Failed to set roles: ${error.message}`);
                        setSnackbarSeverity('error');
                        setSnackbarOpen(true);
                    });
            }
        });
    };

    const removeRoles = () => {
        const docRef = db.collection('users').doc(userId);

        docRef.get().then((docSnapshot) => {
            if (docSnapshot.exists) {
                docRef.update({
                    roles: [] // Empty array
                })
                    .then(() => {
                        setSnackbarMessage(`Successfully removed roles of ${email}`);
                        setSnackbarSeverity('success');
                        setSnackbarOpen(true);
                    })
                    .catch((error) => {
                        setSnackbarMessage(`Failed to remove roles: ${error.message}`);
                        setSnackbarSeverity('error');
                        setSnackbarOpen(true);
                    });
            } else {
                docRef.set({
                    roles: []
                })
                    .then(() => {
                        setSnackbarMessage(`Successfully set roles of ${email}`);
                        setSnackbarSeverity('success');
                        setSnackbarOpen(true);
                    })
                    .catch((error) => {
                        setSnackbarMessage(`Failed to set roles: ${error.message}`);
                        setSnackbarSeverity('error');
                        setSnackbarOpen(true);
                    });
            }
        });
    };


    const updateMemberNumber = () => {
        if (userId) {
            const docRef = db.collection('users').doc(userId);

            docRef.update({
                memberNumber: memberNumber
            })
                .then(() => {
                    setSnackbarMessage(`Successfully updated member number of ${email}`);
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                })
                .catch((error) => {
                    setSnackbarMessage(`Failed to update member number: ${error.message}`);
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                });
        } else {
            setSnackbarMessage('No user selected');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };



    {/** CREATE NEW USER  */ }



    const createUser = async () => {
        try {
            // Create the new user
            const result = await functions.httpsCallable('createUser')({
                email: newUserEmail,
                firstName: newUserFirstName,
                lastName: newUserLastName,
                memberNumber: newUserMemberNumber
            });

            // Check for a result
            if (result.data.message) {
                // Set the success message
                setSnackbarMessage(result.data.message);
            } else {
                // Set a default success message
                setSnackbarMessage('User created successfully!');
            }

            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            // Close the dialog
            setCreateUserDialogOpen(false);
            setConfirmDialogOpen(false);

            // Reset form values
            setNewUserEmail('');
            setNewUserFirstName('');
            setNewUserLastName('');
            setNewUserMemberNumber('');
        } catch (error) {
            setSnackbarMessage(error.message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };










    return (
        <Dialog open={open} onClose={onClose}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DialogTitle>Admin Panel</DialogTitle>
            </div>

            <DialogContent>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button style={{ backgroundColor: "#add5ab", width: 160, marginBottom: "20px" }} onClick={() => setCreateUserDialogOpen(true)}>Create New User</Button>
                </div>


                <Autocomplete
                    id="combo-box-demo"
                    options={users}
                    getOptionLabel={(option) => option.email ? option.email.toLowerCase() : ''}
                    style={{ backgroundColor: "#fef5ec", width: 300, marginBottom: "40px" }}
                    renderInput={(params) => <TextField {...params} label="Email" variant="outlined" />}
                    onChange={(event, newValue) => {
                        setEmail(newValue.email);
                        setUserId(newValue.id); // Store the user ID
                        setRoles(newValue.roles || []); // Set the roles state to the user's current roles
                        setMemberNumber(newValue.memberNumber || ''); // Set the member number state to the user's current member number
                    }}
                />

                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={predefinedRoles}
                    getOptionLabel={(option) => option}
                    value={roles}
                    filterSelectedOptions
                    style={{ backgroundColor: "#fef5ec", marginBottom: "20px" }}
                    onChange={(event, newValue) => {
                        setRoles(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Roles"
                            placeholder="Roles"

                        />
                    )}
                />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={updateRoles} style={{ backgroundColor: "#add5ab", marginBottom: "30px", marginRight: "40px" }}>Update Roles</Button>
                    <Button onClick={removeRoles} style={{ backgroundColor: "#f46e6e", marginBottom: "30px" }}>Remove All Roles</Button>
                </div>



                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        variant="outlined"
                        label="Member Number"
                        value={memberNumber}
                        style={{ marginBottom: "10px" }}
                        onChange={(event) => {
                            const value = event.target.value;
                            if (value.length <= 6 && /^\d*$/.test(value)) {
                                setMemberNumber(value);
                            }
                        }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Button onClick={updateMemberNumber} style={{ backgroundColor: "#add5ab", marginBottom: "40px" }}>Update Member Number</Button>
                </div>


                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Button style={{ backgroundColor: "#abcdef", marginBottom: "20px" }} variant="contained" onClick={makeUserAdmin}>Make User Admin</Button>
                        <Button style={{ backgroundColor: "#fedcba", marginBottom: "20px" }} variant="contained" onClick={removeUserAdmin}>Remove User Admin</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button style={{ backgroundColor: "#abcdef", marginBottom: "20px" }} variant="contained" onClick={makeUserOfficer}>Make User Officer</Button>
                        <Button style={{ backgroundColor: "#fedcba", marginBottom: "20px" }} variant="contained" onClick={removeUserOfficer}>Remove User Officer</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button style={{ backgroundColor: "#abcdef", marginBottom: "20px" }} variant="contained" onClick={makeUserCaptain}>Make User Captain</Button>
                        <Button style={{ backgroundColor: "#fedcba", marginBottom: "20px" }} variant="contained" onClick={removeUserCaptain}>Remove User Captain</Button>
                    </Grid>
                    <Grid item xs={12}>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <Button style={{ backgroundColor: "#f46e6e", marginBottom: "20px" }} variant="contained" onClick={removeAllClaims}>Revoke All Claims</Button>
                        </div>

                    </Grid>
                </Grid>


                {/** UPDATE EVENTS  */}




                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DialogTitle>Manage Events</DialogTitle>
                </div>
                <DialogContent>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button onClick={handleCreateEvent} style={{ backgroundColor: "#add5ab", marginBottom: "10px" }}>Add New Event</Button>
                    </div>
                    <List>
                        {events.map((event) => (
                            <ListItem key={event.id}>
                                <ListItemText primary={event.title} secondary={event.date} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => handleEditEvent(event)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => deleteEvent(event.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>

                {/* Edit Event Dialog */}
                <Dialog open={editEventDialogOpen} onClose={() => setEditEventDialogOpen(false)}>
                    <DialogTitle>{editingEventId ? 'Edit Event' : 'Create Event'}</DialogTitle>
                    <DialogContent>
                        <TextField label="Title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                        <TextField label="Date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                        <TextField label="Time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
                        <TextField label="Description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
                        <TextField label="Image URL" value={eventImage} onChange={(e) => setEventImage(e.target.value)} />

                        <input
                            type="file"
                            accept="application/pdf" // Accept only PDF files
                            onChange={handlePdfUpload}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={saveEvent} color="primary">{editingEventId ? 'Update' : 'Create'}</Button>
                    </DialogActions>
                </Dialog>
            </DialogContent>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>


            {/** CREATE NEW USER  */}

            <Dialog
                open={createUserDialogOpen}
                onClose={() => {
                    setCreateUserDialogOpen(false);
                    // clear all fields
                    setNewUserEmail('');
                    setNewUserFirstName('');
                    setNewUserLastName('');
                    setNewUserMemberNumber('');
                }}
            >                <DialogTitle>Create User</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField required label="Email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} />
                        </Grid>
                        <Grid item>
                            <TextField required label="First Name" value={newUserFirstName} onChange={e => setNewUserFirstName(e.target.value)} />
                        </Grid>
                        <Grid item>
                            <TextField required label="Last Name" value={newUserLastName} onChange={e => setNewUserLastName(e.target.value)} />
                        </Grid>
                        <Grid item>
                            <TextField required label="Member Number" value={newUserMemberNumber} onChange={e => setNewUserMemberNumber(e.target.value)} />
                        </Grid>
                    </Grid>
                    <Button color="primary" onClick={() => {
                        if (newUserEmail && newUserFirstName && newUserLastName && newUserMemberNumber && newUserMemberNumber.length === 6) {
                            setConfirmDialogOpen(true);
                        } else {
                            // Set an error message to indicate the input is not valid
                            setSnackbarMessage('Please fill all the fields correctly. Member Number should be 6 digits.');
                            setSnackbarSeverity('error');
                            setSnackbarOpen(true);
                        }
                    }}>Create</Button>

                </DialogContent>
            </Dialog>

            <Dialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm User Creation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Email: {newUserEmail}
                        <br />
                        First Name: {newUserFirstName}
                        <br />
                        Last Name: {newUserLastName}
                        <br />
                        Member Number: {newUserMemberNumber}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createUser} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>



        </Dialog>
    );
}
