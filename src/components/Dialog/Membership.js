import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';



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

const MembershipDialog = ({ open, onClose, scroll }) => {
    const [openForm, setOpenForm] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <CenteredDialogTitle id="scroll-dialog-title">Apply for Membership to PWYC</CenteredDialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <StyledText>
                    Requirements for membership are: <br /><br />
                    Interest in boating (boat ownership is not required) <br />
                    A completed application including signatures of two current PWYC members <br />
                    $25 check (non-refundable application fee)
                </StyledText>
                <p>Once you submit your application, it will be displayed on the Club bulletin board for a period of 30 days. During this time, the membership will have the opportunity to review your application. After the 30-day period, your application will be presented to the Board of Directors for their evaluation and approval.

                    Upon successful approval, you will receive notification of your acceptance as a member. This notification will be provided by the Fleet Captain and/or through an announcement in the upcoming edition of the Porthole, the Club's newsletter.</p>

                <p>After approval, the Club Treasurer will contact you to inform you about the applicable fees that need to be paid. These fees include a one-time building assessment charge of $250 and prorated dues based on the current annual dues of $300.

                    As a member, you will enjoy the rights, privileges, and responsibilities outlined in the Club By-Laws. We strongly encourage active participation in Club activities. To proceed,<br /><br />

                    <StyledLink href="/images/PWYC Membership Form.pdf" target="_blank"> please click here</StyledLink> <br /><br />to access and complete the Member Information form, which can be printed out for your convenience.
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open Membership Form
            </Button>
            <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Membership Application</DialogTitle>
                <DialogContent>
                    {/* Applicant Information */}
                    <TextField margin="dense" label="Applicant Name" fullWidth />
                    <TextField margin="dense" label="Address" fullWidth />
                    <TextField margin="dense" label="City" fullWidth />
                    <TextField margin="dense" label="State" fullWidth />
                    <TextField margin="dense" label="Zip" fullWidth />
                    <TextField margin="dense" label="Phone" fullWidth />
                    <TextField margin="dense" label="Email" fullWidth />
                    {/* Additional fields here... */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Dialog>
    );
};

export default MembershipDialog;
