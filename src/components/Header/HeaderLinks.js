/*eslint-disable*/
import React from "react";
import { useContext, useState } from "react";
import { Link } from 'react-scroll';


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import Slide from "@material-ui/core/Slide";
import style from 'src/styles/Home.module.scss'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import AirIcon from '@mui/icons-material/Air';

// core components
import CustomDropdown from "src/components/CustomDropdown/CustomDropdown";
import Button from "src/components/CustomButtons/Button";
import SmallButton from "src/components/CustomButtons/SmallButton.js"
import styles from "src/styles/jss/nextjs-material-kit/components/headerLinksStyle";
import Nextlink from 'next/link';

import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Goerli } from '@usedapp/core'
//react dom 

//Member Modal
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import { useRouter } from 'next/router';

import axios from 'axios';

import SignUp from "../SignUp";
import Register from "../Users/Register";
import Login from "../Users/Login";



const useStyles = makeStyles(styles);



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";



function HeaderLinks() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleLoginOpen = () => {
    setOpenLogin(true);
  };

  const handleLoginClose = () => {
    setOpenLogin(false);
  };




  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    try {
      const response = await axios.post('/api/auth', { username, password });

      if (response.status === 200) {
        setIsAuthenticated(true);
        setOpen(false);
        router.push('/members');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      alert('Invalid username or password');
    }
  };



  return (
    <div>

      <List className={classes.list}>



        <ListItem className={classes.listItem}>
          <SmallButton
            size={isSmallScreen ? "lg" : "sm"}  // larger size on small screens
            color="transparent"
            className={isSmallScreen ? classes.smallScreenButton : null}  // custom class for small screens
          >
            <Link activeClass="active" to="sectionHome" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Home
            </Link>
          </SmallButton>

        </ListItem>


        <ListItem className={classes.listItem}>
          <SmallButton
            size={isSmallScreen ? "lg" : "sm"}  // larger size on small screens
            color="transparent"
            className={isSmallScreen ? classes.smallScreenButton : null}  // custom class for small screens
          >
            <Link activeClass="active" to="section1" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Services
            </Link>
          </SmallButton>
        </ListItem>


        <ListItem className={classes.listItem}>
          <SmallButton
            size={isSmallScreen ? "lg" : "sm"}  // larger size on small screens
            color="transparent"
            className={isSmallScreen ? classes.smallScreenButton : null}  // custom class for small screens
          >
            <Link activeClass="active" to="section6" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Events
            </Link>
          </SmallButton>

        </ListItem>


        <ListItem className={classes.listItem}>
          <SmallButton
            size={isSmallScreen ? "lg" : "sm"}  // larger size on small screens
            color="transparent"
            className={isSmallScreen ? classes.smallScreenButton : null}  // custom class for small screens
          >
            <Link activeClass="active" to="section5" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Weather
            </Link>
          </SmallButton>

        </ListItem>

        <ListItem className={classes.listItem}>
          <SmallButton
            size={isSmallScreen ? "lg" : "sm"}  // larger size on small screens
            color="transparent"
            className={isSmallScreen ? classes.smallScreenButton : null}  // custom class for small screens
          >
            <Link activeClass="active" to="section3" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Contact
            </Link>
          </SmallButton>

        </ListItem>




        {/** 
        <ListItem className={classes.listItem}>
          <SmallButton
            size={isSmallScreen ? "lg" : "sm"}  // larger size on small screens
            color="transparent"
            className={isSmallScreen ? classes.smallScreenButton : null}  // custom class for small screens
          >
            <Link onClick={() => setOpenRegister(true)} spy={false} smooth={true} duration={1000} className={style.headerLinkMember}>
              Register
            </Link>
          </SmallButton>
        </ListItem>

*/}

        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            onClick={handleLoginOpen}
          >
            Login
          </Button>
          <Login open={openLogin} onClose={handleLoginClose} />
        </ListItem>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Username"
                type="text"
                fullWidth
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <SmallButton size="sm" color="transparent" onClick={() => setOpen(false)}>
                Cancel
              </SmallButton>
              <SmallButton size="sm" type="submit" color="success">
                Log in
              </SmallButton>
              {/** <SmallButton size="sm" type="button" color="success" onClick={handleSubmitNextAuth}>
                NextAuth Login
              </SmallButton>   */}
            </DialogActions>
          </form>
        </Dialog>
        <Register open={openRegister} onClose={() => setOpenRegister(false)} />

      </List>
    </div>

  );
}

export default HeaderLinks;