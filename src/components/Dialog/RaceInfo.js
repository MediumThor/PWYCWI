import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';


const StyledText = styled.p`
  text-align: center;
    color: black;

`;
const StyledLink = styled.a`
  color: #0000EE;
  text-decoration: underline;
`;

const StyledTextBody = styled.p`
  text-align: center;
    color: black;
    margin-bottom: 20%;

`;

const CenteredDialogTitle = styled(DialogTitle)`
  text-align: center;
`;

const TabBox = styled.div`
  margin-top: 0px;
  text-align: center;
  color: black;
  top: calc(1%);
  z-index: 1;
`;


const RaceInfoDialog = ({ open, onClose, scroll }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel({ children, value, index }) {
        return <div hidden={value !== index}>{value === index && children}</div>;
    }


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
            <CenteredDialogTitle id="scroll-dialog-title">Race Info</CenteredDialogTitle>

            <DialogContent
                dividers={scroll === 'paper'}
                style={{ minHeight: '70vh' }} // 70% of the viewport height
            >                <TabBox>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="NOR" />
                            <Tab label="SI" />
                            <Tab label="Course" />
                            <Tab label="Registration" />

                        </Tabs>
                    </Box>
                </TabBox>

                <TabPanel value={value} index={0}>
                    <embed
                        src="/assets/SailingInfo/PWYC NOR 2023.pdf"
                        width="100%"
                        height="100%"
                        type="application/pdf"
                        style={{ minHeight: '60vh' }}  // 60% of the viewport height
                    />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <embed
                        src="/assets/SailingInfo/PWYC SI 2023.pdf"
                        width="100%"
                        height="100%"
                        type="application/pdf"
                        style={{ minHeight: '60vh' }}  // 60% of the viewport height
                    />
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <embed
                        src="/assets/SailingInfo/PWYC COURSE 2023.pdf"
                        width="100%"
                        height="100%"
                        type="application/pdf"
                        style={{ minHeight: '60vh' }}  // 60% of the viewport height
                    />
                </TabPanel>

                <TabPanel value={value} index={3}>
                    <embed
                        src="/assets/SailingInfo/PWYC Registration 2023.pdf"
                        width="100%"
                        height="100%"
                        type="application/pdf"
                        style={{ minHeight: '60vh' }}  // 60% of the viewport height
                    />
                </TabPanel>



            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RaceInfoDialog;
