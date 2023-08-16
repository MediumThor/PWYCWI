import React, { useState, useEffect } from 'react';
import { functions, firestore as db } from '../../../firebase';
import { storage } from '../../../firebase';

import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, Button, Grid, Snackbar, MenuItem, Select } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default function OfficerPanel({ open, onClose, roles: officerRoles }) {
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

    {/**    RACE RESULTS    */ }


    const [file, setFile] = useState(null);
    const [raceDate, setRaceDate] = useState('');
    const [day, setDay] = React.useState('');
    const [year, setYear] = useState('');

    const yearOptions = ['2022', '2023', '2024', '2025'];



    const handleChange = (event) => {
        setDay(event.target.value);
    };


    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = (day) => {
        if (!file || !year || !day || !raceDate) {
            setSnackbarMessage('Please fill all the fields before uploading.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const dateStr = new Date(raceDate).toISOString().split('T')[0];
        console.log(`Uploading to race-results/${year}/${day}/${dateStr}.pdf`);  // Log the upload path

        const uploadTask = storage.ref(`race-results/${year}/${day}/${dateStr}.pdf`).put(file);

        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
                setSnackbarMessage(`Failed to upload file: ${error.message}`);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    console.log(`Uploaded successfully, URL: ${url}`);  // Log the download URL
                    db.collection(`race-results`).add({
                        url: url,
                        date: raceDate,
                        year: year,
                        day: day
                    }).then(() => {
                        setSnackbarMessage('File uploaded successfully');
                        setSnackbarSeverity('success');
                        setSnackbarOpen(true);
                    }).catch((error) => {
                        setSnackbarMessage(`Failed to save file info to the database: ${error.message}`);
                        setSnackbarSeverity('error');
                        setSnackbarOpen(true);
                    });
                }).catch((error) => {
                    console.log(`Failed to get download URL: ${error.message}`);  // Log the error
                });
            }
        );
    };




    {/**    RACE RESULTS    */ }


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
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={true}
            maxWidth={"md"}
        >

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DialogTitle>Officers Panel</DialogTitle>
            </div>
            <DialogContent>




                {/** 
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button style={{ backgroundColor: "#add5ab", width: 160, marginBottom: "20px" }} onClick={() => setCreateUserDialogOpen(true)}>Create New User</Button>
                </div>
*/}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

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
                </div>


                {officerRoles?.includes('') && (
                    <>

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


                        {/**
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

                         */}
                    </>

                )}






                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Button style={{ width: '120px', height: '80px', backgroundColor: "#abcdef", marginBottom: "20px", marginRight: '40px' }} variant="contained" onClick={makeUserCaptain}>Make User Captain</Button>

                    <Button style={{ width: '120px', height: '80px', backgroundColor: "#fedcba", marginBottom: "20px" }} variant="contained" onClick={removeUserCaptain}>Remove User Captain</Button>

                </div>


                {/** UPDATE PORTHOLE */}


                {officerRoles?.includes('Porthole') && (
                    <div>


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
                    </div>

                )}



                {/** UPDATE PORTHOLE^^^ */}



                {/**    RACE RESULTS    */}



                {officerRoles?.includes('Race Director') && (


                    <div style={{ marginBottom: '60px', borderRadius: '2px', border: '2px solid black' }}>


                        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <DialogTitle>Upload race results</DialogTitle>
                        </div>


                        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <input type="file" onChange={handleFileChange} />
                        </div>

                        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <TextField
                                id="date"
                                label="Race Date"
                                type="date"
                                defaultValue="2023-05-24"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => setRaceDate(e.target.value)}
                            />

                        </div>
                        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <Select
                                value={day}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="" disabled>
                                    Select day
                                </MenuItem>
                                <MenuItem value={'Wednesday'}>Wednesday</MenuItem>
                                <MenuItem value={'Saturday'}>Saturday</MenuItem>
                            </Select>
                        </div>

                        {/* Dropdown for year selection */}
                        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <Select
                                value={year}
                                onChange={e => setYear(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="" disabled>
                                    Select year
                                </MenuItem>
                                {yearOptions.map((option, index) => (
                                    <MenuItem value={option} key={index}>{option}</MenuItem>
                                ))}
                            </Select>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button style={{ backgroundColor: "#add5ab", width: 160, marginBottom: "20px" }} onClick={() => handleUpload(day)}>Upload</Button>
                        </div>

                    </div>

                )}


                {/**    RACE RESULTS    */}


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



        </Dialog >
    );
}
