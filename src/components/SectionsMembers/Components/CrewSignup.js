import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Typography } from '@material-ui/core';
import { firestore as db } from '../../../../firebase';

export default function CrewSignup({ open, onClose }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [experience, setExperience] = useState('');

    const clearForm = () => {
        setName('');
        setAge('');
        setPhone('');
        setEmail('');
        setExperience('');
    };

    const handleSubmit = () => {
        if (name && age && phone && email && experience) {
            db.collection('crew').add({
                name,
                age,
                phone,
                email,
                experience,
            }).then(() => {
                alert('You have successfully submitted your information to the PWYC Racing fleet!');
                onClose();
                clearForm();
            }).catch(error => {
                alert('An error occurred while submitting your information. Please try again.');
                console.error("Error submitting form: ", error);
            });
        } else {
            alert('Please fill in all the required fields.');
        }
    };

    const handleClose = () => {
        clearForm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Crew Signup</DialogTitle>
            <DialogContent>
                <TextField required label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth />
                <TextField required label="Age" value={age} onChange={e => setAge(e.target.value)} fullWidth />
                <TextField required label="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} fullWidth />
                <TextField required label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
                <TextField required label="Sailing Experience" value={experience} onChange={e => setExperience(e.target.value)} fullWidth />
                <div style={{ marginTop: '20px' }}> {/* Added vertical space */}
                    <Button onClick={handleSubmit} color="primary">Submit</Button>
                </div>
                <Typography variant="body2" style={{ textAlign: 'center', marginTop: '20px' }}> {/* Added disclaimer */}
                    This form is only to submit interest in becoming a crewmember. A captain will reach out if there is any space in the fleet.
                </Typography>
            </DialogContent>
        </Dialog>
    );
}
