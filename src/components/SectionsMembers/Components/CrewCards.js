import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { firestore as db } from '../../../../firebase';

export default function CrewCards() {
    const [crewMembers, setCrewMembers] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('crew').onSnapshot(snapshot => {
            const fetchedMembers = [];
            snapshot.forEach(doc => {
                fetchedMembers.push({ id: doc.id, ...doc.data() });
            });
            setCrewMembers(fetchedMembers);
        });
        return () => unsubscribe();
    }, []);

    const handleDelete = (id) => {
        db.collection('crew').doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {crewMembers.map(member => (
                <div key={member.id} style={{ width: '16vw', margin: '8px' }}> {/* Fixed width of 16% of viewport */}
                    <Card style={{ marginBottom: '10px', position: 'relative', width: '100%' }}>
                        <IconButton onClick={() => handleDelete(member.id)} style={{ position: 'absolute', top: 0, right: 0 }}>
                            <CloseIcon />
                        </IconButton>
                        <CardContent>
                            <Typography variant="h6">{member.name}</Typography>
                            <Typography variant="body2">Age: {member.age}</Typography>
                            <Typography variant="body2">Phone: {member.phone}</Typography>
                            <Typography variant="body2">Email: {member.email}</Typography>
                            <Typography variant="body2">Experience: {member.experience}</Typography>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    );
}
