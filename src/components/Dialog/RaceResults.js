import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import styled from 'styled-components';
import { Button, List, ListItem, ListItemText, Collapse, Box } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { firestore } from '../../../firebase'; // Replace with your firebase import

const CenteredDialogTitle = styled(DialogTitle)`
  text-align: center;
`;

const Results = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const SideMenu = styled.div`
  max-width: 300px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  overflow: auto;

  @media (max-width: 600px) {
    display: none;
  }
`;

const MobileFooter = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: block;
    text-align: center;
    font-size: 0.8rem;
    color: gray;
  }
`;

const RaceResultsDialog = ({ open, onClose, scroll }) => {

    const [selectedFile, setSelectedFile] = useState("");
    const [raceResults, setRaceResults] = useState({});
    const [openYears, setOpenYears] = useState({});
    const [openDays, setOpenDays] = useState({});
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [dialogHeight, setDialogHeight] = useState('60vh');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsFullScreen(window.innerWidth <= 600);
            setDialogHeight(window.innerWidth <= 600 ? '100vh' : '60vh');
        }
    }, []);

    useEffect(() => {
        const ref = firestore.collection('race-results');
        ref.orderBy('year', 'desc').orderBy('day').orderBy('date', 'desc')
            .get()
            .then(querySnapshot => {
                const results = {};
                let mostRecentFile = "";  // Declare a variable to store the most recent file URL
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    if (!results[data.year]) {
                        results[data.year] = { Wednesday: [], Saturday: [] };
                    }
                    results[data.year][data.day].push({ url: data.url, date: data.date });

                    // If the mostRecentFile is empty, set it to the current doc's URL
                    // This works because the query results are ordered by date in descending order,
                    // so the first doc is the most recent one
                    if (!mostRecentFile) {
                        mostRecentFile = data.url;
                    }
                });
                setRaceResults(results);
                setSelectedFile(mostRecentFile);  // Set the selectedFile state to the most recent file URL
            })
            .catch(error => console.error("Error getting race results: ", error));
    }, []);

    const handleYearClick = (year) => {
        setOpenYears({ ...openYears, [year]: !openYears[year] });
    };

    const handleDayClick = (year, day) => {
        const key = `${year}-${day}`;
        setOpenDays({ ...openDays, [key]: !openDays[key] });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth={true}
            fullScreen={isFullScreen}
            maxWidth={"md"}
        >
            <CenteredDialogTitle id="scroll-dialog-title">Race Results</CenteredDialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <Box display="flex" height={dialogHeight}>
                    <SideMenu>
                        <List>
                            {Object.keys(raceResults).map(year => (
                                <React.Fragment key={year}>
                                    <ListItem button onClick={() => handleYearClick(year)}>
                                        <ListItemText primary={year} />
                                        {openYears[year] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={openYears[year]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {Object.keys(raceResults[year]).map(day => (
                                                <React.Fragment key={day}>
                                                    <ListItem button onClick={() => handleDayClick(year, day)}>
                                                        <ListItemText primary={day} />
                                                        {openDays[`${year}-${day}`] ? <ExpandLess /> : <ExpandMore />}
                                                    </ListItem>
                                                    <Collapse in={openDays[`${year}-${day}`]} timeout="auto" unmountOnExit>
                                                        <List component="div" disablePadding>
                                                            {raceResults[year][day].map((result, index) => (
                                                                <ListItem button onClick={() => setSelectedFile(result.url)} key={index}>
                                                                    <ListItemText primary={result.date} />
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    </Collapse>
                                                </React.Fragment>
                                            ))}
                                        </List>
                                    </Collapse>
                                </React.Fragment>
                            ))}
                        </List>
                    </SideMenu>
                    <Results>
                        <embed src={selectedFile}
                            width="100%"
                            type="application/pdf"
                        />
                    </Results>
                </Box>
            </DialogContent>
            <MobileFooter>
                To see archived results, please visit the desktop site.
            </MobileFooter>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RaceResultsDialog;
