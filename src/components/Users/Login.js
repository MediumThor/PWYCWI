import React, { useState } from 'react';
import { auth, firestore } from '../../../firebase';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, InputAdornment, IconButton, DialogActions } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';


export default function Login({ open, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const login = async () => {
        try {
            // Check if entered username and password are the special ones
            if (email === 'YachtMember' && password === 'Boating23') {
                Cookies.set('specialUser', 'true');
                router.push('/members'); // redirect to /members page
                return;
            }

            await auth.signInWithEmailAndPassword(email, password);
            router.push('/members'); // redirect to /members page
        } catch (error) {
            setErrorMessage(error.message);
            setOpenErrorDialog(true);
        }
    };

    const handleDialogClose = () => {
        setEmail('');
        setPassword('');
        setShowPassword(false);
        onClose();
    };

    const handleErrorDialogClose = () => {
        setOpenErrorDialog(false);
    };

    const handlePasswordReset = async () => {
        if (!email) {
            setErrorMessage("Please enter your email address before attempting to reset your password.");
            setOpenErrorDialog(true);
            return;
        }

        try {
            await auth.sendPasswordResetEmail(email);
            setErrorMessage("Password reset email has been sent.");
            setOpenErrorDialog(true);
        } catch (error) {
            setErrorMessage(error.message);
            setOpenErrorDialog(true);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" mb={5}>
                        <TextField
                            label="Email (Username)"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{ marginBottom: "2em" }}
                        />

                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
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
                                ),
                            }}
                        />
                    </Box>
                    <Button color="primary" onClick={login}>Login</Button>
                    <Button color="secondary" onClick={handlePasswordReset}>Forgot password?</Button>
                </DialogContent>
            </Dialog>
            <Dialog open={openErrorDialog} onClose={handleErrorDialogClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    {errorMessage}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleErrorDialogClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
