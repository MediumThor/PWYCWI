import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app'; // Import Firebase
import { auth, firestore as db } from '../../../../firebase'; // Import your Firestore instance

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



const RaceRegistrantsTable = () => {
    const [registrants, setRegistrants] = useState([]);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        const fetchUserRoleAndClaims = async () => {
            const authUser = auth.currentUser;
            if (authUser) {
                const token = await authUser.getIdTokenResult();
                if (token.claims.admin) {
                    setIsAdmin(true);
                }
            }
        };

        fetchUserRoleAndClaims();
    }, []);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        db.collection('raceRegistrations')
            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Include the document ID
                setRegistrants(data);
            });
    }, []);

    const handleDelete = (id) => {
        db.collection('raceRegistrations').doc(id).delete()
            .then(() => {
                setRegistrants(registrants.filter((reg) => reg.id !== id));
            });
    };



    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                Online Registrants
            </Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Boat Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Sail No.</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>PHRF</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Owner</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Yacht Club</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Category</TableCell>
                            {isAdmin && <TableCell>Action</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {registrants.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.boatName}</TableCell>
                                <TableCell>{row.sailNumber}</TableCell>
                                <TableCell>{row.lmphrf}</TableCell>
                                <TableCell>{row.owner}</TableCell>
                                <TableCell>{row.yachtClub}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                {isAdmin && (
                                    <TableCell>
                                        <Button color="secondary" onClick={() => handleDelete(row.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

export default RaceRegistrantsTable;
