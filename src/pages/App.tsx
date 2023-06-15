import Image from 'next/image'
import Header from "../components/Header/Header";
import HeaderLinks from '../components/Header/HeaderLinks';
import Services from "../components/Sections/Services"
import Events from "../components/Sections/Events"
import Contact from "../components/Sections/Contact"
import Porthole from "../components/Sections/Porthole"
import Weather from '../components/Sections/Weather'
import SectionHome from "../components/Sections/SectionHome"
import styles from '../styles/Home.module.scss'
import styled from 'styled-components'
import React, { useEffect, useState } from "react";
import "../styles/Home.module.scss";
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { makeStyles } from '@material-ui/core/styles';
import Cam from '../components/Sections/Cam';
import SectionWithVideo from '../components/Sections/VideoSection';
import ParallaxImage from '../components/ParallaxSection1';
import ParallaxImage2 from '../components/ParallaxSection2';
import ParallaxImage3 from '../components/ParallaxSection3';
import ParallaxImage4 from '../components/ParallaxSection4';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExploreIcon from '@mui/icons-material/Explore';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Alert, AlertTitle } from '@mui/material';
import MembershipModal from '../components/Modals/MembershipModal';



import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '4%',
    right: '4%',
    backgroundColor: 'rgb(232,227,212, 0.4)',
    borderRadius: '5px',
    opacity: 0,
    transition: 'opacity 0.5s',

    '&:hover': {
      backgroundColor: 'rgb(232,227,212, 0.6)', // make button lighter when hovered over
    },
  },
  visible: {
    opacity: 1,
  },
}));





function ScrollToTop() {

  const [isVisible, setIsVisible] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };



  // Event to listen to the scroll
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <IconButton
      onClick={handleClick}
      className={`${classes.root} ${isVisible ? classes.visible : ''}`}
    >
      <ArrowUpwardIcon />
    </IconButton>
  );
}

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState([false, false, false]);




  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    console.log(`Setting drawer open state to ${open}`);
    setDrawerOpen(open);
    const drawerButton = document.getElementById('drawer-button');
    if (drawerButton) {
      if (open) {
        drawerButton.style.transform = 'translateX(170px)';
      } else {
        drawerButton.style.transform = 'translateX(0)';
      }
    }
  };


  const useListItemStyles = makeStyles({
    root: {
      paddingLeft: "40px",
      padding: "20px",
      paddingTop: "20px",  // Adjust the spacing as needed
    },
  });

  //...

  const listItemClasses = useListItemStyles();


  const useDrawerButtonStyles = makeStyles((theme) => ({
    button: {
      position: 'fixed',
      top: '20%', // Adjust as needed
      left: '0',
      width: '50px', // Adjust as needed
      height: '75px', // Adjust as needed
      backgroundImage: `url('/assets/carbon fibre.jpeg')`,
      backgroundSize: '180%', // Adjust as needed
      boxShadow: '7px 14px 10px #00000050',
      borderRadius: '0 13px 13px 0',
      border: '4px solid black',
      overflow: 'hidden',
      color: '#d6d0c2', // Make the icon color white
      paddingTop: '12px', // Add padding at the top
      transition: 'all 0.2s ease',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
  }));

  const drawerButtonClasses = useDrawerButtonStyles();




  const handleClickDrawer = (i) => {
    setDropdownOpen(dropdownOpen.map((open, index) => index === i ? !open : false));
  };

  const drawerTheme = createMuiTheme({
    palette: {
      primary: {
        main: 'rgba(25, 25, 112, 0.8)', // dark blue with .8 opacity
      },
      text: {
        primary: '#2e2d2a', // front color
      },
    },
  });

  const useDrawerStyles = makeStyles({
    paper: {
      marginTop: "100px",
      display: "flex",
      width: "170px",
      height: "600px",
      border: "0",
      borderRadius: "0px",
      padding: "0.625rem 0",
      marginBottom: "20px",
      color: "#d6d3c2",
      backgroundColor: " RGB(0,0,0, 0.80)",
      boxShadow:
        "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
      transition: "width 4.6s ease", // Transition the width property
      flexFlow: "row nowrap",
      justifyContent: "flex-start",
    },
  });

  const drawerClasses = useDrawerStyles();


  const notifyWind = () => toast(
    <div>
      <iframe
        src="https://widgets.sailflow.com/widgets/web/conditions?spot_id=12074&units_wind=mph&units_temp=F&width=300&height=400&color=0A2946&name=Port Washington&activity=Sail&app=sailflow"
        width="300"
        height="400"
        scrolling="no"
        title="Sailflow Widget"
      ></iframe>
    </div>,
    {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );

  const toastStyle = {
    width: "660px", // Adjust to a suitable size
    padding: '0px',
  };

  const windStats = () => toast(
    <div>
      <iframe
        src="https://widgets.sailflow.com/widgets/web/windStats?spot_id=12074&units_wind=mph&color=0A2946&name=Port Washington&activity=Sail&app=sailflow"
        width="650"
        height="400"
        scrolling="no"
        title="Sailflow Widget"
      ></iframe>
    </div>,
    {
      position: "bottom-left",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: toastStyle, // Apply the custom style
    }
  );

  const toastStyle2 = {
    width: "660px", // Adjust to a suitable size
    padding: '0px',
  };

  const membership = () => toast(
    <div>

    </div>,
    {
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: toastStyle, // Apply the custom style
    }
  );

  const StyledMembershipModal = styled(MembershipModal)`
  z-index: 999999; // adjust as needed
`;

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  const drawer = (
    <div role="presentation">
      <List>
        {['Tools', 'Links', 'Join'].map((text, index) => (
          <div key={text}>
            <ListItem button onClick={() => handleClickDrawer(index)} className={listItemClasses.root}>
              <ListItemText primary={text} />
              {dropdownOpen[index] ? <ExpandMoreIcon /> : <ExpandMoreIcon rotate={180} />}
            </ListItem>
            <Collapse in={dropdownOpen[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {text === "Tools" && (
                  <>
                    <ListItem>
                      <Button onClick={notifyWind} style={{ color: '#8F9DFA' }}>Live Wind</Button>
                    </ListItem>
                    <ListItem>
                      <Button onClick={windStats} style={{ color: '#87CEFA' }}>Wind Stats</Button>
                    </ListItem>
                  </>
                )}
              </List>
              <List component="div" disablePadding>
                {text === "Links" && (
                  <>
                    <ListItem>
                      <Button href="https://sailingmagazine.net/" target="_blank" rel="noopener noreferrer" style={{ color: '#8F9DFA' }}>Sailing Magizine</Button>
                    </ListItem>
                    <ListItem>
                      <Button href="https://www.portwashingtonwi.gov/departments/marina/" target="_blank" rel="noopener noreferrer" style={{ color: '#5e9caf' }}>Marina</Button>
                    </ListItem>
                  </>
                )}
              </List>
              <List component="div" disablePadding>
                {text === "Join" && (
                  <>

                    <ListItem>
                      <Button onClick={handleClickOpen('paper')} style={{ color: '#87faa8' }}>Membersip Application</Button>
                    </ListItem>

                    <Dialog
                      open={open}
                      onClose={handleClose}
                      scroll={scroll}
                      aria-labelledby="scroll-dialog-title"
                      aria-describedby="scroll-dialog-description"
                    >
                      <DialogTitle id="scroll-dialog-title">Apply for Membership to PWYC</DialogTitle>
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
                        <Button onClick={handleClose}>Close</Button>
                      </DialogActions>
                    </Dialog>

                  </>
                )}
              </List>
            </Collapse>

          </div>
        ))}
      </List>
    </div>
  );






  return (

    <div className={styles['fade-in']}>

      <div >
        <Header
          brand="Port Washington Yacht Club"
          rightLinks={<HeaderLinks />}
          fixed
          color="dark"
          changeColorOnScroll={{
            height: 20,
            color: "dark",
          }} />
        <div>
          <ToastContainer />

          <SectionHome />
          <ParallaxImage />
          <SectionWithVideo />
          <ParallaxImage3 />
          <Services />
          <ParallaxImage2 />
          <Events />
          {/**<Porthole />**/}
          <ParallaxImage4 />
          <Weather />
          <Cam />
          <Contact />
        </div>
        <ThemeProvider theme={drawerTheme}>
          <div className={drawerButtonClasses.button} id="drawer-button">
            <Button onClick={toggleDrawer(true)}>
              <ListItemIcon style={{ paddingRight: '30px', width: '20px' }}>
                <ExploreIcon style={{ color: '#FFF', fontSize: '30px' }} />
              </ListItemIcon>

            </Button>
          </div>

          <Drawer
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            classes={{ paper: drawerClasses.paper }}
          >
            {drawer}
          </Drawer>
          {/* rest of your code */}
        </ThemeProvider>



        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
          <div>
            <div style={{ marginTop: "15vh" }} />
            <ScrollToTop />
          </div>
        </footer>
      </div>
    </div>


  )
}

const StyledText = styled.p`
  text-align: center;
    color: black;

`;

const StyledTextBody = styled.p`
  text-align: center;
    color: black;
    margin-bottom: 20%;

`;

const StyledLink = styled.a`
  color: #0000EE;
  text-decoration: underline;
`;


const TitleWrapper = styled.div`
margin-top: 350px;
color: black;
font-size: 40px;
&:hover,
&:focus-within {
  color: #22C984;
}
@media only screen and  

(max-width: 768px) { 

}

@media only screen and (max-width: 1375px) and (min-width: 769px) { 


  }
`

const BackgroundBox = styled.div`
margin-top: 400px;
width: 90%;
font-size: 40px;
&:hover,
&:focus-within {
  color: #22C984;
}
@media only screen and  

(max-width: 768px) { 

}

@media only screen and (max-width: 1375px) and (min-width: 769px) { 
 

  }
`

const Main = styled.div`

font-size: 40px;
justify-content: center;
&:hover,
&:focus-within {
  color: #22C984;
}
@media only screen and  

(max-width: 768px) { 
}

@media only screen and (max-width: 1375px) and (min-width: 769px) { 
 
  }
`
