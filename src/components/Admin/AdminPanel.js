import React, { useState, useEffect } from 'react';
import { functions, firestore as db } from '../../../firebase';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, Button, Grid, Snackbar, MenuItem } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';



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
