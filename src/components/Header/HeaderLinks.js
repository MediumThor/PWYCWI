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
import DeleteIcon from "@material-ui/icons/Delete";
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import SailingIcon from '@mui/icons-material/Sailing';

import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
import GridItem from "src/components/Grid/GridItem";

// core components
import CustomDropdown from "src/components/CustomDropdown/CustomDropdown";
import Button from "src/components/CustomButtons/Button";
import SmallButton from "src/components/CustomButtons/SmallButton.js"

import styles from "src/styles/jss/nextjs-material-kit/components/headerLinksStyle";

import LoginPage from "src/components/Login.js"


import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Goerli } from '@usedapp/core'


//react dom 



const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";



export default function HeaderLinks(props) {

  const { account, activateBrowserWallet, deactivate, chainId } = useEthers()
  const userBalance = useEtherBalance(account)
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);

  return (

    <List className={classes.list}>

      <ListItem className={classes.listItem}>


      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText="Links"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[

            <Links href="https://testnet.snowtrace.io/token/0x892511db1be112d7aad0acc1460442d8ac4c495e">
              <a className={classes.dropdownLink}>TestLink</a>
            </Links>,

            <a
              href="    "
              target="_blank"
              className={classes.dropdownLink}
            >
              TokenA
            </a>


          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText="Products"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={AirIcon}
          dropdownList={[

            <a
              href="https://thebulletin.org/"
              target="_blank"
              className={classes.dropdownLink}
            >
              Forecast
            </a>,


            <a
              href=" BRoKeN LInK rEPLaCE"
              target="_blank"
              className={classes.dropdownLink}
            >
              Placeholder
            </a>,

          ]}
        />
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
        <SmallButton size="sm"
          color="transparent">
          <Link activeClass="active" to="sectionHome" spy={false} smooth={true} duration={1000} className={style.headerLink3}>
            Home
          </Link>
        </SmallButton>

      </ListItem>

      {/*<ListItem className={classes.listItem}>
        <Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>

      </ListItem>*/}

    </List>




  );




}



// WORKING LOGIN BUTTON
//      <Button color="warning" round
//href="/loginNew">
//LOGIN                   </Button>

