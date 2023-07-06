/*eslint-disable*/
import React from "react";
import Links from "next/link";
import { Link } from 'react-scroll';


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import Slide from "@material-ui/core/Slide";
import style from 'src/styles/Home.module.scss'

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







const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";



function HeaderLinks() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const router = useRouter(); // Initialize hook

  const handleLogout = () => {
    router.push("/App");
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    if (username === 'member' && password === 'password') {
      alert('Successfully logged in');
      setOpen(false);
      router.push('/members');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>

      <List className={classes.list}>

        <ListItem className={classes.listItem}>
          <SmallButton size="sm"
            color="transparent">
            <Link activeClass="active" to="sectionHome" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Home
            </Link>
          </SmallButton>

        </ListItem>


        <ListItem className={classes.listItem}>
          <SmallButton size="sm"
            color="transparent">
            <Link activeClass="active" to="section1" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Services
            </Link>
          </SmallButton>
        </ListItem>


        <ListItem className={classes.listItem}>
          <SmallButton size="sm"
            color="transparent">
            <Link activeClass="active" to="section2" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Events
            </Link>
          </SmallButton>

        </ListItem>




        <ListItem className={classes.listItem}>
          <SmallButton size="sm"
            color="transparent">
            <Link activeClass="active" to="section4" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Porthole
            </Link>
          </SmallButton>

        </ListItem>
        <ListItem className={classes.listItem}>
          <SmallButton size="sm"
            color="transparent">
            <Link activeClass="active" to="section5" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Weather
            </Link>
          </SmallButton>

        </ListItem>

        <ListItem className={classes.listItem}>
          <SmallButton size="sm"
            color="transparent">
            <Link activeClass="active" to="section3" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
              Contact
            </Link>
          </SmallButton>

        </ListItem>

        <ListItem className={classes.listItem}>
          <SmallButton size="sm" color="transparent">
            <Link
              spy={false}
              smooth={true}
              duration={1000}
              className={style.headerLinkMember}
              onClick={handleLogout} // Moved the onClick event to the Link component
            >
              Log Out
            </Link>
          </SmallButton>
        </ListItem>

      </List>
    </div>

  );
}

export default HeaderLinks;