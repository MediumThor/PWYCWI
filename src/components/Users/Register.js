import { useState } from 'react';
import { auth, firestore } from '../../../firebase';
import { Button, TextField, Dialog, DialogTitle, DialogContent, Snackbar, FormHelperText, Box, DialogActions } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';



export default function Register({ open, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownConfirmPassword = (event) => event.preventDefault();

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);


    const register = async () => {
        if (email === '' || password === '' || firstName === '' || lastName === '' || confirmPassword === '') {
            setErrorMessage("All fields must be filled.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            // After registration, create a new document for this user in 'users' collection
            await firestore.collection('users').doc(user.uid).set({
                firstName,
                lastName,
                email,
                roles: ['Member']
            });
            setOpenSnackbar(true);
            setOpenSuccessDialog(true);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    return (
        <>

            <Dialog open={open} onClose={onClose}>
                <Box display="flex" flexDirection="column" mb={5}>

                    <DialogTitle>Register</DialogTitle>
                    <DialogContent>
                        <TextField label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                        <FormHelperText error={firstName === ''}>{firstName === '' ? 'First Name is required' : ' '}</FormHelperText>
                        <TextField label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                        <FormHelperText error={lastName === ''}>{lastName === '' ? 'Last Name is required' : ' '}</FormHelperText>
                        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        <FormHelperText error={email === ''}>{email === '' ? 'Email is required' : ' '}</FormHelperText>
                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <FormHelperText error={password === ''}>{password === '' ? 'Password is required' : ' '}</FormHelperText>
                        <TextField
                            label="Confirm Password"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownConfirmPassword}
                                        >
                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />                <FormHelperText error={password !== confirmPassword}>{password !== confirmPassword ? 'Passwords do not match' : ' '}</FormHelperText>
                        <Button color="primary" onClick={register}>Register</Button>
                        <FormHelperText error={errorMessage !== ''}>{errorMessage}</FormHelperText>
                    </DialogContent>
                </Box>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={closeSnackbar}>
                    <MuiAlert onClose={closeSnackbar} severity="success" elevation={6} variant="filled">
                        Account created successfully!
                    </MuiAlert>
                </Snackbar>


            </Dialog>

            <Dialog open={openSuccessDialog} onClose={() => setOpenSuccessDialog(false)}>
                <DialogTitle>Registration Successful</DialogTitle>
                <DialogContent>
                    You have successfully registered! Please log in to visit the Members section.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSuccessDialog(false)}>OK</Button>
                </DialogActions>
            </Dialog>
        </>

    );
}
