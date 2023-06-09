import React, { useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    submitButton: {
        alignSelf: 'flex-start',
        marginTop: '10px',
    },
}));

const RaceScorer = () => {
    const classes = useStyles();

    const [boatName, setBoatName] = useState('');
    const [boatClass, setBoatClass] = useState('');
    const [elapsedTime, setElapsedTime] = useState('');
    const [boatAhead, setBoatAhead] = useState('');
    const [boatBehind, setBoatBehind] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Perform scoring calculations based on the submitted data
        // Here, you can implement the logic to calculate the scores

        // Reset the form fields
        setBoatName('');
        setBoatClass('');
        setElapsedTime('');
        setBoatAhead('');
        setBoatBehind('');
    };

    return (
        <div>
            <Typography variant="h2">Race Scorer</Typography>
            <form onSubmit={handleFormSubmit} className={classes.form}>
                <TextField
                    label="Boat Name"
                    value={boatName}
                    onChange={(e) => setBoatName(e.target.value)}
                />
                <TextField
                    label="Boat Class"
                    value={boatClass}
                    onChange={(e) => setBoatClass(e.target.value)}
                />
                <TextField
                    label="Elapsed Race Time"
                    value={elapsedTime}
                    onChange={(e) => setElapsedTime(e.target.value)}
                />
                <TextField
                    label="Boat Ahead"
                    value={boatAhead}
                    onChange={(e) => setBoatAhead(e.target.value)}
                />
                <TextField
                    label="Boat Behind"
                    value={boatBehind}
                    onChange={(e) => setBoatBehind(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default RaceScorer;
