import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import styled from 'styled-components';
import { Menu, Button, MenuItem, SwipeableDrawer, List, ListItem, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';



const CenteredDialogTitle = styled(DialogTitle)`
  text-align: center;
`;

const Results = styled.div`
  width: 80%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
const StyledList = styled(List)`
  padding-top: 0px;
`;

const RaceResultsDialog = ({ open, onClose, scroll }) => {

    const [selectedFile, setSelectedFile] = useState("/assets/RaceResults/2023/Wed/Wednesday 6-14-23.pdf");
    const [anchor, setAnchor] = useState('Past Results');
    const [state, setState] = useState({
        bottom: false
    });

    const [open2023, setOpen2023] = useState(false);
    const [open2022, setOpen2022] = useState(false);
    const [openArchives, setOpenArchives] = useState(false);
    const [openWednesday, setOpenWednesday] = useState(false);
    const [openSaturday, setOpenSaturday] = useState(false);




    const handleClick2023 = () => {
        setOpen2023(!open2023);
    };

    const handleClick2022 = () => {
        setOpen2022(!open2022);
    };

    const handleClickArchives = () => {
        setOpenArchives(!openArchives);
    };

    // add new handlers for Wednesday and Saturday
    const handleClickWednesday = () => {
        setOpenWednesday(!openWednesday);
    };

    const handleClickSaturday = () => {
        setOpenSaturday(!openSaturday);
    };

    const [drawerOpen, setDrawerOpen] = useState(false);


    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    const [openResults, setOpenResults] = useState(false);

    const handleClickResults = () => {
        setOpenResults(!openResults);
    };

    const list = anchor => (
        <StyledList>
            <ListItem button onClick={handleClick2023}>
                <ListItemText primary="2023" primaryTypographyProps={{ style: { fontSize: '24px' } }} />
                {open2023 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open2023} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button onClick={handleClickWednesday}>
                        <ListItemText primary="Wednesday" primaryTypographyProps={{ style: { fontSize: '20px' } }} />
                        {openWednesday ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openWednesday} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>




                            <ListItem button onClick={() => setSelectedFile("/assets/RaceResults/2023/Wed/Wednesday 6-14-23.pdf")}>
                                <ListItemText primary="6-7-23" primaryTypographyProps={{ style: { fontSize: '16px' } }} />
                            </ListItem>
                            <ListItem button onClick={() => setSelectedFile("/assets/RaceResults/2023/Wed/Wednesday 6-7-23.pdf")}>
                                <ListItemText primary="6-7-23" primaryTypographyProps={{ style: { fontSize: '16px' } }} />
                            </ListItem>





                        </List>
                    </Collapse>

                    <ListItem button onClick={handleClickSaturday}>
                        <ListItemText primary="Saturday" primaryTypographyProps={{ style: { fontSize: '20px' } }} />
                        {openSaturday ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openSaturday} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>







                            <ListItem button onClick={() => setSelectedFile("/assets/RaceResults/2023/Sat/Saturday 6-10-23 corrected.pdf")}>
                                <ListItemText primary="6-10-23" primaryTypographyProps={{ style: { fontSize: '16px' } }} />
                            </ListItem>
                            <ListItem button onClick={() => setSelectedFile("/assets/RaceResults/2023/Sat/Saturday 6-3-23.pdf")}>
                                <ListItemText primary="6-3-23" primaryTypographyProps={{ style: { fontSize: '16px' } }} />
                            </ListItem>








                        </List>
                    </Collapse>
                </List>
            </Collapse>

            <ListItem button onClick={handleClick2022}>
                <ListItemText primary="2022" primaryTypographyProps={{ style: { fontSize: '24px' } }} />
                {open2022 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open2022} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>







                    <ListItem button onClick={() => toggleDrawer(false)}>
                        <ListItemText primary="File 3" />
                    </ListItem>
                    <ListItem button onClick={() => toggleDrawer(false)}>
                        <ListItemText primary="File 4" />
                    </ListItem>






                </List>
            </Collapse>

            <ListItem button onClick={handleClickArchives}>
                <ListItemText primary="Archives" primaryTypographyProps={{ style: { fontSize: '20px' } }} />
                {openArchives ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openArchives} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>





                    <ListItem button onClick={() => toggleDrawer(false)}>
                        <ListItemText primary="File 5" />
                    </ListItem>
                    <ListItem button onClick={() => toggleDrawer(false)}>
                        <ListItemText primary="File 6" />
                    </ListItem>





                </List>
            </Collapse>
        </StyledList>
    );





    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth={true} // Makes the dialog responsive
            maxWidth={"md"} // Defines the maximum width the dialog can take
        >
            <CenteredDialogTitle id="scroll-dialog-title">Race Results</CenteredDialogTitle>
            <DialogContent dividers={scroll === 'paper'}>

                <StyledList>
                    <ListItem button onClick={handleClick2023}>
                        <ListItemText primary="2023" primaryTypographyProps={{ style: { fontSize: '24px' } }} />
                        {open2023 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open2023} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button onClick={handleClickWednesday}>
                                <ListItemText primary="Wednesday" primaryTypographyProps={{ style: { fontSize: '20px' } }} />
                                {openWednesday ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openWednesday} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>




                                    <ListItem button onClick={() => setSelectedFile("/assets/RaceResults/2023/Wed/Wednesday 6-14-23.pdf")}>
                                        <ListItemText primary="6-7-23" primaryTypographyProps={{ style: { fontSize: '16px' } }} />
                                    </ListItem>
                                    <ListItem button onClick={() => setSelectedFile("/assets/RaceResults/2023/Wed/Wednesday 6-7-23.pdf")}>
                                        <ListItemText primary="6-7-23" primaryTypographyProps={{ style: { fontSize: '16px' } }} />
                                    </ListItem>





                                </List>
                            </Collapse>

                            <ListItem button onClick={handleClickSaturday}>
                                <ListItemText primary="Saturday" primaryTypographyProps={{ style: { fontSize: '20px' } }} />
                                {openSaturday ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openSaturday} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>







                                    <ListItem button onClick={() => setSelectedFile("/assets/RaceResults/2023/Sat/Saturday 6-10-23 corrected.pdf")}>
                                        <ListItemText primary="6-10-23" primaryTypographyProps={{ style: { fontSize: '16px' } }} />
                                    </ListItem>
                                    <ListItem button onClick={() => setSelectedFile("/assets/RaceResults/2023/Sat/Saturday 6-3-23.pdf")}>
                                        <ListItemText primary="6-3-23" primaryTypographyProps={{ style: { fontSize: '16px' } }} />
                                    </ListItem>








                                </List>
                            </Collapse>
                        </List>
                    </Collapse>

                    <ListItem button onClick={handleClick2022}>
                        <ListItemText primary="2022" primaryTypographyProps={{ style: { fontSize: '24px' } }} />
                        {open2022 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open2022} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>







                            <ListItem button onClick={() => toggleDrawer(false)}>
                                <ListItemText primary="File 3" />
                            </ListItem>
                            <ListItem button onClick={() => toggleDrawer(false)}>
                                <ListItemText primary="File 4" />
                            </ListItem>






                        </List>
                    </Collapse>

                    <ListItem button onClick={handleClickArchives}>
                        <ListItemText primary="Archives" primaryTypographyProps={{ style: { fontSize: '20px' } }} />
                        {openArchives ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openArchives} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>





                            <ListItem button onClick={() => toggleDrawer(false)}>
                                <ListItemText primary="File 5" />
                            </ListItem>
                            <ListItem button onClick={() => toggleDrawer(false)}>
                                <ListItemText primary="File 6" />
                            </ListItem>





                        </List>
                    </Collapse>
                </StyledList>
                <Results>

                    <embed src={selectedFile} width="100%" height="600" type="application/pdf" />
                </Results>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RaceResultsDialog;
