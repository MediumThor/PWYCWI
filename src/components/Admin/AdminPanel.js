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



    {/** HOMEPAGE PHOTOS */ }
    // Rename galleryImages to homePageImages
    const [homePageImages, setHomePageImages] = useState([]);

    // No need for selectedGalleryPageNumber and selectedGalleryCaption
    const [uploadHomePageImageDialogOpen, setUploadHomePageImageDialogOpen] = useState(false);
    const [selectedHomePageFile, setSelectedHomePageFile] = useState(null);
    const [selectedHomePageIndex, setSelectedHomePageIndex] = useState(0); // New state to track selected home page image index
    const [deleteHomePageImagesDialogOpen, setDeleteHomePageImagesDialogOpen] = useState(false);


    useEffect(() => {
        const ref = db.collection('homePageImages');
        const unsubscribe = ref.onSnapshot(snapshot => {
            const fetchedImages = [];
            snapshot.forEach(doc => {
                fetchedImages.push({ id: doc.id, url: doc.data().url });
            });
            setHomePageImages(fetchedImages);
        });
        return () => unsubscribe();
    }, []);

    // Upload function renamed and logic adjusted for home page images
    const uploadHomePageImage = () => {
        if (selectedHomePageFile && selectedHomePageIndex >= 0 && selectedHomePageIndex < 4) {
            const filename = `image${selectedHomePageIndex}.jpg`;

            const storageRef = storage.ref();
            const fileRef = storageRef.child('homePageImages/' + filename);
            fileRef.put(selectedHomePageFile).then(() => {
                fileRef.getDownloadURL().then((url) => {
                    db.collection('homePageImages').doc(`image${selectedHomePageIndex}`).set({ url });
                    setUploadHomePageImageDialogOpen(false);
                    setUploadSnackbarMessage(`Home page image ${selectedHomePageIndex + 1} uploaded successfully!`);
                    setUploadSnackbarOpen(true);
                });
            });
        } else {
            // You might want to show a message here if no file is selected or index is out of bounds
        }
    };

    const handleHomePageFileChange = (e) => {
        setSelectedHomePageFile(e.target.files[0]);
    };

    const deleteHomePageImage = (imageId) => {
        db.collection('homePageImages').doc(imageId).delete();
    };

    {/** HOMEPAGE PHOTOS */ }



    {/** GALLERY SECTION */ }

    const [galleryImages, setGalleryImages] = useState([]);
    const [uploadGalleryImageDialogOpen, setUploadGalleryImageDialogOpen] = useState(false);
    const [selectedGalleryFile, setSelectedGalleryFile] = useState(null);
    const [selectedGalleryPageNumber, setSelectedGalleryPageNumber] = useState(0);
    const [deleteGalleryImagesDialogOpen, setDeleteGalleryImagesDialogOpen] = useState(false);
    const [selectedGalleryCaption, setSelectedGalleryCaption] = useState(''); // New state for caption
    const [uploadSnackbarOpen, setUploadSnackbarOpen] = useState(false);
    const [uploadSnackbarMessage, setUploadSnackbarMessage] = useState('');

    useEffect(() => {
        const ref = db.collection('galleryImages').orderBy('sequence');
        const unsubscribe = ref.onSnapshot(snapshot => {
            const fetchedImages = [];
            snapshot.forEach(doc => {
                fetchedImages.push({ id: doc.id, url: doc.data().url, caption: doc.data().caption }); // Include caption
            });
            setGalleryImages(fetchedImages);
        });
        return () => unsubscribe();
    }, []);

    const uploadGalleryImage = () => {
        if (selectedGalleryFile && selectedGalleryPageNumber > 0) {
            const filename = `image${selectedGalleryPageNumber}.jpg`; // Change the extension as needed

            const storageRef = storage.ref();
            const fileRef = storageRef.child('gallery/' + filename);
            fileRef.put(selectedGalleryFile).then(() => {
                fileRef.getDownloadURL().then((url) => {
                    // Add the URL, sequence number, and caption to the Firestore collection
                    db.collection('galleryImages').add({ url, sequence: selectedGalleryPageNumber, caption: selectedGalleryCaption });
                    setUploadGalleryImageDialogOpen(false);
                    setUploadSnackbarMessage('New gallery image uploaded successfully!');
                    setUploadSnackbarOpen(true);
                });
            });
        } else {
            // You might want to show a message here if no file is selected, page number is not set, or caption is missing
        }
    };

    const handleGalleryFileChange = (e) => {
        setSelectedGalleryFile(e.target.files[0]);
    };

    const deleteGalleryImage = (imageId) => {
        db.collection('galleryImages').doc(imageId).delete();
    };

    {/** GALLERY SECTION */ }






    {/** PORTHOLE SECTION */ }

    const [portholeImages, setPortholeImages] = useState([]);
    const [uploadPortholeImageDialogOpen, setUploadPortholeImageDialogOpen] = useState(false);
    const [selectedPortholeFile, setSelectedPortholeFile] = useState(null);
    const [selectedPortholePageNumber, setSelectedPortholePageNumber] = useState(0); // State to hold the selected page number
    const [deletePortholeImagesDialogOpen, setDeletePortholeImagesDialogOpen] = useState(false);



    useEffect(() => {
        const ref = db.collection('portholeImages').orderBy('sequence'); // Order by the 'sequence' field
        const unsubscribe = ref.onSnapshot(snapshot => {
            const fetchedImages = [];
            snapshot.forEach(doc => {
                fetchedImages.push({ id: doc.id, url: doc.data().url });
            });
            setPortholeImages(fetchedImages);
        });
        return () => unsubscribe();
    }, []);

    const uploadPortholeImage = () => {
        if (selectedPortholeFile && selectedPortholePageNumber > 0) {
            const filename = `image${selectedPortholePageNumber}.jpg`; // Change the extension as needed

            const storageRef = storage.ref();
            const fileRef = storageRef.child('porthole/' + filename);
            fileRef.put(selectedPortholeFile).then(() => {
                fileRef.getDownloadURL().then((url) => {
                    // Add the URL and sequence number to the Firestore collection
                    db.collection('portholeImages').add({ url, sequence: selectedPortholePageNumber });
                    setUploadPortholeImageDialogOpen(false);
                });
            });
        } else {
            // You might want to show a message here if no file is selected or page number is not set
        }
    };

    const handlePortholeFileChange = (e) => {
        setSelectedPortholeFile(e.target.files[0]);
    };

    const deletePortholeImage = (imageId) => {
        db.collection('portholeImages').doc(imageId).delete();
    };



    {/** PORTHOLE SECTION */ }






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

                {/** UPDATE PORTHOLE */}

                <div>
                    <div style={{ border: '2px solid' }}>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>

                            <DialogTitle>Manage Porthole Images</DialogTitle>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                            <Button onClick={() => setUploadPortholeImageDialogOpen(true)} style={{ backgroundColor: "#add5ab", marginBottom: "40px", marginRight: "40px" }}>Upload Porthole Image</Button>
                            <Button onClick={() => setDeletePortholeImagesDialogOpen(true)} style={{ backgroundColor: "#f46e6e", marginBottom: "40px" }}>Delete Porthole Images</Button>
                        </div>
                    </div>


                    {/* Delete Porthole Images Dialog */}
                    <Dialog open={deletePortholeImagesDialogOpen} onClose={() => setDeletePortholeImagesDialogOpen(false)}>
                        <DialogTitle>Delete Porthole Images</DialogTitle>
                        <List>
                            {portholeImages.map((image) => (
                                <ListItem key={image.id}>
                                    <ListItemText primary={image.url} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" onClick={() => deletePortholeImage(image.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Dialog>

                </div>
                {/* Upload Porthole Image Dialog */}
                <Dialog open={uploadPortholeImageDialogOpen} onClose={() => setUploadPortholeImageDialogOpen(false)}>
                    <DialogTitle>Upload Porthole Image</DialogTitle>
                    <DialogContent>
                        <TextField type="file" onChange={handlePortholeFileChange} />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25px' }}>


                            <TextField
                                label="Page Number"
                                type="number"
                                value={selectedPortholePageNumber}
                                onChange={(e) => setSelectedPortholePageNumber(parseInt(e.target.value))}
                            />
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={uploadPortholeImage} color="primary">Upload</Button>
                    </DialogActions>
                </Dialog>


                {/** UPDATE PORTHOLE^^^ */}



                {/** UPDATE HOMEPAGE PHOTOS */}
                <div>
                    <div style={{ border: '2px solid' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                            <DialogTitle>Manage Home Page Images</DialogTitle>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                            <Button onClick={() => setUploadHomePageImageDialogOpen(true)} style={{ backgroundColor: "#add5ab", marginBottom: "40px", marginRight: "40px" }}>Upload New Home Page Image</Button>
                            <Button onClick={() => setDeleteHomePageImagesDialogOpen(true)} style={{ backgroundColor: "#f46e6e", marginBottom: "40px" }}>Delete Home Page Photos</Button>

                        </div>
                    </div>
                </div>

                <Dialog open={uploadHomePageImageDialogOpen} onClose={() => setUploadHomePageImageDialogOpen(false)}>
                    <DialogTitle>Upload New Home Page Image</DialogTitle>
                    <DialogContent>
                        <TextField type="file" onChange={handleHomePageFileChange} />
                        <TextField
                            label="Image Index (0-3)"
                            type="number"
                            value={selectedHomePageIndex}
                            onChange={(e) => setSelectedHomePageIndex(parseInt(e.target.value))}
                        />
                    </DialogContent>
                    <Snackbar
                        open={uploadSnackbarOpen}
                        autoHideDuration={6000}
                        onClose={() => setUploadSnackbarOpen(false)}
                    >
                        <Alert onClose={() => setUploadSnackbarOpen(false)} severity="success">
                            {uploadSnackbarMessage}
                        </Alert>
                    </Snackbar>
                    <DialogActions>
                        <Button onClick={uploadHomePageImage} color="primary">Upload</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={deleteHomePageImagesDialogOpen} onClose={() => setDeleteHomePageImagesDialogOpen(false)}>
                    <DialogTitle>Delete Home Page Photos</DialogTitle>
                    <List>
                        {homePageImages.map((image) => (
                            <ListItem key={image.id}>
                                <ListItemText primary={image.url} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => deleteHomePageImage(image.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Dialog>
                {/** UPDATE HOMEPAGE PHOTOS */}





                {/** UPLOAD GALLERY */}

                <div>
                    <div style={{ border: '2px solid' }}>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>

                            <DialogTitle>Manage Gallery Images</DialogTitle>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                            <Button onClick={() => setUploadGalleryImageDialogOpen(true)} style={{ backgroundColor: "#add5ab", marginBottom: "40px", marginRight: "40px" }}>Upload New Gallery Image</Button>
                            <Button onClick={() => setDeleteGalleryImagesDialogOpen(true)} style={{ backgroundColor: "#f46e6e", marginBottom: "40px" }}>Delete New Gallery Images</Button>
                        </div>

                    </div>
                </div>

                <Dialog open={uploadGalleryImageDialogOpen} onClose={() => setUploadGalleryImageDialogOpen(false)}>
                    <DialogTitle>Upload New Gallery Image</DialogTitle>
                    <DialogContent>
                        <TextField type="file" onChange={handleGalleryFileChange} />
                        <TextField
                            label="Page Number"
                            type="number"
                            value={selectedGalleryPageNumber}
                            onChange={(e) => setSelectedGalleryPageNumber(parseInt(e.target.value))}
                        />
                        <TextField
                            label="Caption"
                            value={selectedGalleryCaption}
                            onChange={(e) => setSelectedGalleryCaption(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={uploadGalleryImage} color="primary">Upload</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={deleteGalleryImagesDialogOpen} onClose={() => setDeleteGalleryImagesDialogOpen(false)}>
                    <DialogTitle>Delete Gallery Images</DialogTitle>
                    <List>
                        {galleryImages.map((image) => (
                            <ListItem key={image.id}>
                                <ListItemText primary={image.url} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => deleteGalleryImage(image.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
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
                {/** UPLOAD GALLERY^^^ */}


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
